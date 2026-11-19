import React from "react";
import { Mail } from "lucide-react";

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width="16"
        height="16"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        className="w-full h-full block"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.4 1.4 0 1 0 1.4 1.4 1.4 0 0 0-1.4-1.4Z" />
      </svg>
    </span>
  );
};

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width="16"
        height="16"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        className="w-full h-full block"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    </span>
  );
};

export const GitHubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => {
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width="16"
        height="16"
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        className="w-full h-full block"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    </span>
  );
};

export const GmailLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => {
  return (
    <svg
      width="16"
      height="16"
      style={{ maxWidth: "100%", maxHeight: "100%" }}
      className={className}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Left blue pillar */}
      <path fill="#4285F4" d="M24 23.5L7.5 11.2V37c0 1.1.9 2 2 2h4.5V23.5L24 23.5z" />
      {/* Right green pillar */}
      <path fill="#34A853" d="M24 23.5L40.5 11.2V37c0 1.1-.9 2-2 2h-4.5V23.5L24 23.5z" />
      {/* Red top V-shape */}
      <path fill="#EA4335" d="M40.5 11.2L24 23.5 7.5 11.2C6.9 10.7 6.5 10 6.5 9.2c0-1.6 1.7-2.6 3.1-1.7L24 18.2l14.4-10.7c1.4-.9 3.1.1 3.1 1.7 0 .8-.4 1.5-1 2z" />
      {/* Right yellow accent */}
      <path fill="#FBBC05" d="M40.5 11.2l-3.5 2.6v9.7l3.5 2.6V11.2z" />
      {/* Left red shadow */}
      <path fill="#C5221F" d="M7.5 11.2l3.5 2.6v9.7l-3.5 2.6V11.2z" />
    </svg>
  );
};

export const GmailHoverIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => {
  return (
    <span className={`relative inline-flex items-center justify-center shrink-0 group/gmail ${className}`}>
      {/* Default Monochrome Mail Icon */}
      <Mail className="w-full h-full block transition-all duration-300 transform group-hover/gmail:opacity-0 group-hover/gmail:scale-75 group-hover:opacity-0 group-hover:scale-75" />
      
      {/* Hover Color Gmail Logo */}
      <span className="absolute inset-0 flex items-center justify-center opacity-0 scale-75 transition-all duration-300 transform group-hover/gmail:opacity-100 group-hover/gmail:scale-100 group-hover:opacity-100 group-hover:scale-100 pointer-events-none">
        <GmailLogo className="w-full h-full block" />
      </span>
    </span>
  );
};
