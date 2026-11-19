import { NextRequest, NextResponse } from "next/server";

// In-memory sliding window rate limiter for abuse prevention
// Key: IP address, Value: Array of timestamps (ms)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Cleanup old rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((timestamps: number[], ip: string) => {
    const valid = timestamps.filter((t: number) => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, valid);
    }
  });
}, 5 * 60 * 1000).unref?.();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter((t: number) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    // 1. IP extraction & Rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many inquiries sent from this connection. Please try again later.",
        },
        { status: 429 }
      );
    }

    // 2. Parse request payload with safety limits
    let body: Record<string, string>;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      try {
        body = await request.json();
      } catch {
        return NextResponse.json(
          { success: false, message: "Invalid JSON payload received." },
          { status: 400 }
        );
      }
    } else {
      try {
        const formData = await request.formData();
        body = {};
        formData.forEach((value, key) => {
          if (typeof value === "string") {
            body[key] = value;
          }
        });
      } catch {
        return NextResponse.json(
          { success: false, message: "Invalid form data received." },
          { status: 400 }
        );
      }
    }

    // 3. Honeypot check (anti-bot)
    // Hidden field named 'website' or 'hp' should always be empty for legitimate users
    if (body.website || body.hp) {
      // Silently succeed for bots so they don't adapt
      return NextResponse.json({ success: true, message: "Inquiry received." });
    }

    // 4. Validate and sanitize inputs
    const name = (body.name || "").trim().slice(0, 100);
    const email = (body.email || "").trim().slice(0, 254);
    const message = (body.message || "").trim().slice(0, 5000);
    const company = (body.company || "").trim().slice(0, 120);
    const phone = (body.phone || "").trim().slice(0, 30);
    const service = (body.service || "Websites").trim().slice(0, 60);

    if (!name || name.length < 2) {
      return NextResponse.json(
        { success: false, message: "Please provide your name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!message || message.length < 5) {
      return NextResponse.json(
        { success: false, message: "Please provide a message with at least 5 characters." },
        { status: 400 }
      );
    }

    // 5. Upstream Webhook resolution
    // Server-only variable prioritized, with legacy fallback during transition
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL || process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

    if (!webhookUrl) {
      console.error("[Contact API] Server configuration error: Webhook destination URL missing.");
      return NextResponse.json(
        {
          success: false,
          message: "Contact form is temporarily unavailable. Please contact us directly at info@setsuzoku.in.",
        },
        { status: 503 }
      );
    }

    // 6. Forward to upstream Google Apps Script with timeout
    const upstreamParams = new URLSearchParams();
    upstreamParams.append("name", name);
    upstreamParams.append("company", company);
    upstreamParams.append("email", email);
    upstreamParams.append("phone", phone);
    upstreamParams.append("service", service);
    upstreamParams.append("message", message);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    try {
      const upstreamResponse = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: upstreamParams.toString(),
        redirect: "follow",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!upstreamResponse.ok) {
        throw new Error(`Upstream returned HTTP ${upstreamResponse.status}`);
      }

      const upstreamData = await upstreamResponse.json().catch(() => null);

      if (upstreamData && typeof upstreamData.success === "boolean" && !upstreamData.success) {
        throw new Error(upstreamData.message || "Upstream service reported failure");
      }

      return NextResponse.json({
        success: true,
        message: "Thank you for reaching out. We will contact you in a short time.",
      });
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId);

      const isTimeout =
        fetchError instanceof Error &&
        (fetchError.name === "AbortError" || fetchError.message.includes("aborted"));

      console.error("[Contact API] Upstream delivery failure:", isTimeout ? "Timeout" : fetchError);

      return NextResponse.json(
        {
          success: false,
          message:
            "We were unable to deliver your message due to a connection timeout. Please email us directly at info@setsuzoku.in.",
        },
        { status: 502 }
      );
    }
  } catch (error: unknown) {
    console.error("[Contact API] Internal route error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while processing your inquiry.",
      },
      { status: 500 }
    );
  }
}
