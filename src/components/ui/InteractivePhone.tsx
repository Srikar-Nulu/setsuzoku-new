"use client";

import React, { useEffect, useRef, useState } from "react";
import { Smartphone, LucideProps } from "lucide-react";

interface InteractivePhoneProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  icon?: React.ComponentType<LucideProps>;
}

export const InteractivePhone: React.FC<InteractivePhoneProps> = ({
  className = "w-6 h-6",
  icon: IconComponent = Smartphone,
  style,
  ...props
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    // Disable animation if user prefers reduced motion
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) {
        return;
      }
    }

    const container = containerRef.current;
    if (!container) return;

    // Detect parent card or node if inside a hover group
    const parentGroup = container.closest(".group") || container.parentElement;

    const handleMouseEnter = () => {
      setIsRinging(true);
    };

    const handleMouseLeave = () => {
      setIsRinging(false);
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
    };
  }, []);

  return (
    <span
      ref={containerRef}
      className="inline-flex items-center justify-center shrink-0 cursor-pointer"
      style={style}
      {...props}
    >
      <IconComponent
        className={`${className} transition-transform duration-300 ease-out ${
          isRinging ? "animate-phone-ring" : ""
        }`}
        style={{
          willChange: "transform",
        }}
      />
    </span>
  );
};
