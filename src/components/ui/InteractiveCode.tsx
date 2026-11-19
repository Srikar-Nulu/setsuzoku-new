"use client";

import React, { useEffect, useRef, useState } from "react";
import { Code2, LucideProps } from "lucide-react";

const SNIPPETS = [
  'print("Hello")',   // Python
  'printf("Hello");', // C
];

interface InteractiveCodeProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  icon?: React.ComponentType<LucideProps>;
}

export const InteractiveCode: React.FC<InteractiveCodeProps> = ({
  className = "w-6 h-6",
  icon: IconComponent = Code2,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [typedText, setTypedText] = useState("");

  const stateRef = useRef({
    snippetIndex: 0,
    charIndex: 0,
    isDeleting: false,
    timeoutId: null as NodeJS.Timeout | null,
    isHovered: false,
  });

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        return;
      }
    }

    const container = containerRef.current;
    if (!container) return;

    const parentGroup = container.closest(".group") || container.parentElement;

    const clearActiveTimeout = () => {
      if (stateRef.current.timeoutId) {
        clearTimeout(stateRef.current.timeoutId);
        stateRef.current.timeoutId = null;
      }
    };

    const runTypewriterStep = () => {
      if (!stateRef.current.isHovered) return;

      const { snippetIndex, charIndex, isDeleting } = stateRef.current;
      const currentSnippet = SNIPPETS[snippetIndex];

      if (!isDeleting) {
        // Typing phase
        if (charIndex < currentSnippet.length) {
          const nextIndex = charIndex + 1;
          stateRef.current.charIndex = nextIndex;
          setTypedText(currentSnippet.substring(0, nextIndex));
          stateRef.current.timeoutId = setTimeout(runTypewriterStep, 35);
        } else {
          // Pause 500ms after finished typing before backspacing
          stateRef.current.isDeleting = true;
          stateRef.current.timeoutId = setTimeout(runTypewriterStep, 500);
        }
      } else {
        // Deleting phase (backspace)
        if (charIndex > 0) {
          const nextIndex = charIndex - 1;
          stateRef.current.charIndex = nextIndex;
          setTypedText(currentSnippet.substring(0, nextIndex));
          stateRef.current.timeoutId = setTimeout(runTypewriterStep, 22);
        } else {
          // Next programming language snippet
          stateRef.current.isDeleting = false;
          stateRef.current.snippetIndex = (snippetIndex + 1) % SNIPPETS.length;
          stateRef.current.timeoutId = setTimeout(runTypewriterStep, 150);
        }
      }
    };

    const handleMouseEnter = () => {
      clearActiveTimeout();
      stateRef.current.isHovered = true;
      stateRef.current.snippetIndex = 0;
      stateRef.current.charIndex = 0;
      stateRef.current.isDeleting = false;
      setIsHovered(true);
      setTypedText("");

      // Delay 150ms for smooth bracket separation before code typing starts
      stateRef.current.timeoutId = setTimeout(runTypewriterStep, 150);
    };

    const handleMouseLeave = () => {
      clearActiveTimeout();
      stateRef.current.isHovered = false;
      setIsHovered(false);
      setTypedText("");
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    if (parentGroup && parentGroup !== container) {
      parentGroup.addEventListener("mouseenter", handleMouseEnter);
      parentGroup.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (parentGroup && parentGroup !== container) {
        parentGroup.removeEventListener("mouseenter", handleMouseEnter);
        parentGroup.removeEventListener("mouseleave", handleMouseLeave);
      }
      clearActiveTimeout();
    };
  }, []);

  return (
    <span
      ref={containerRef}
      className={`inline-flex items-center justify-center shrink-0 cursor-pointer select-none text-current ${className}`}
      style={style}
      {...props}
    >
      {!isHovered ? (
        /* Static State: Exact Original Lucide Icon Component */
        <IconComponent className="w-full h-full shrink-0" />
      ) : (
        /* Hover State: 3 Independent Elements [LEFT SVG] [TYPED CODE] [RIGHT SVG] */
        <span className="inline-flex items-center justify-center h-full transition-all duration-300 ease-out">
          {/* 1. ORIGINAL LEFT SVG BRACKET < */}
          <span className="inline-flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 8 24"
              className="h-[1em] w-auto shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 8-4 4 4 4" />
            </svg>
          </span>

          {/* 2. INDEPENDENT TYPED CODE TEXT LAYER */}
          <span className="inline-flex items-center overflow-hidden px-1 text-[10.5px] font-mono font-bold text-current leading-none whitespace-nowrap animate-in fade-in duration-150">
            <span>{typedText}</span>
            <span className="inline-block w-[1.5px] h-[10px] bg-current animate-pulse ml-[1px] opacity-80" />
          </span>

          {/* 3. ORIGINAL RIGHT SVG BRACKET > */}
          <span className="inline-flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 8 24"
              className="h-[1em] w-auto shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m2 16 4-4-4-4" />
            </svg>
          </span>
        </span>
      )}
    </span>
  );
};
