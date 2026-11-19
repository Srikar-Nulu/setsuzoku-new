"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "Websites",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [honeypot, setHoneypot] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === "submitting") return;
    setErrorMessage("");

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    const company = formData.company.trim();
    const phone = formData.phone.trim();
    const service = formData.service;

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (Name, Email, and Message).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          company,
          email,
          phone,
          service,
          message,
          website: honeypot,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || `Submission failed (status ${response.status})`);
      }

      setStatus("success");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        service: "Websites",
        message: "",
      });
      setHoneypot("");
    } catch (err: unknown) {
      setStatus("error");
      const errText =
        err instanceof Error
          ? err.message
          : "There was an issue sending your message. Please try again or contact us directly.";
      setErrorMessage(errText);
    }
  };

  const inputClasses =
    "w-full px-4 py-3 rounded-lg bg-white dark:bg-[#080C14] border border-slate-300 dark:border-slate-700 text-[#0B1220] dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue dark:focus:ring-blue-500 focus:border-transparent disabled:opacity-60 disabled:cursor-not-allowed transition-colors";

  return (
    <div className="lg:col-span-7 bg-white dark:bg-[#0E1422] p-6 sm:p-10 rounded-2xl border border-slate-200/90 dark:border-slate-800">
      {status === "success" ? (
        <div className="py-12 text-center space-y-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-brand-green dark:text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <div className="space-y-3" role="status" aria-live="polite">
            <h3 className="font-display text-2xl font-bold text-[#0B1220] dark:text-white">
              Message Received!
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-base max-w-md mx-auto leading-relaxed">
              Message Received! Thank you for reaching out to Setsuzoku LLP we will contact you in a short time{" "}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => {
              setStatus("idle");
              setErrorMessage("");
            }}
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-slate-200/80 dark:border-slate-800 pb-4">
            <h3 className="font-display text-xl font-extrabold text-[#0B1220] dark:text-white">
              Project Details
            </h3>
          </div>

          {status === "error" && (
            <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-xl text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider"
              >
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                disabled={status === "submitting"}
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Alex Smith"
                className={inputClasses}
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label
                htmlFor="company"
                className="block text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider"
              >
                Company / Organization
              </label>
              <input
                type="text"
                id="company"
                name="company"
                disabled={status === "submitting"}
                value={formData.company}
                onChange={handleChange}
                placeholder="e.g. Acme Corp"
                className={inputClasses}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                disabled={status === "submitting"}
                value={formData.email}
                onChange={handleChange}
                placeholder="alex@company.com"
                className={inputClasses}
              />
            </div>

            {/* Phone / WhatsApp */}
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                disabled={status === "submitting"}
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 90149 35073"
                className={inputClasses}
              />
            </div>
          </div>

          {/* Service Requirement */}
          <div className="space-y-2">
            <label
              htmlFor="service"
              className="block text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider"
            >
              Primary Service Requirement
            </label>
            <select
              id="service"
              name="service"
              disabled={status === "submitting"}
              value={formData.service}
              onChange={handleChange}
              className={inputClasses}
            >
              <option value="Websites">Websites (Corporate, Portals, Web Platforms)</option>
              <option value="Applications">Applications (Web Apps, Mobile &amp; Cloud Systems)</option>
              <option value="UI/UX">UI/UX (Interface Design, Design Systems, UX Audit)</option>
              <option value="Branding">Branding (Identity, Brand Guidelines, Visual Systems)</option>
              <option value="Design">Design (Graphic, Product &amp; Marketing Assets)</option>
              <option value="Digital Solutions">Digital Solutions (Automation, Alt Tech &amp; Software)</option>
            </select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider"
            >
              Message / Details <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              disabled={status === "submitting"}
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us about your project requirements, timeline, or inquiries..."
              className={inputClasses}
            />
          </div>

          {/* Anti-spam honeypot field */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Privacy Notice */}
          <div className="flex items-start gap-2.5 pt-1 pb-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-brand-green dark:text-emerald-400 shrink-0 mt-0.5" />
            <span>
              By submitting this inquiry, you acknowledge our{" "}
              <Link href="/privacy" className="text-brand-blue dark:text-blue-400 font-semibold hover:underline">
                Privacy Policy
              </Link>{" "}
              and agree to our{" "}
              <Link href="/terms" className="text-brand-blue dark:text-blue-400 font-semibold hover:underline">
                Terms and Conditions
              </Link>
              . Your details are used strictly to review requirements and respond to your inquiry.
            </span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            disabled={status === "submitting"}
            icon={
              status === "submitting" ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )
            }
          >
            {status === "submitting" ? "Sending Inquiry..." : "Start a Conversation"}
          </Button>
        </form>
      )}
    </div>
  );
}
