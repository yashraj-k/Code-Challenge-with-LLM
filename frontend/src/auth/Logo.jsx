// src/components/Logo.jsx
import React from 'react';

export function Logo({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
          {/* Using CSS variables for colors is possible but this is simpler */}
          <stop offset="0%" stopColor="#818cf8" /> {/* indigo-400 */}
          <stop offset="100%" stopColor="#c084fc" /> {/* purple-400 */}
        </linearGradient>
      </defs>
      <path
        fill="url(#logo-gradient)"
        d="M17.8 1.4C16.4-.5 13.6-.5 12.2 1.4L1.7 14.3c-1.8 2.2.3 5.7 3 5.7h4.8c.4 0 .7.2.9.6L12.5 24l-2.1 3.4c-.2.4-.5.6-.9.6H4.7c-2.7 0-4.8 3.5-3 5.7l10.5 12.9c1.4 1.9 4.2 1.9 5.6 0l10.5-12.9c1.8-2.2-.3-5.7-3-5.7h-4.8c-.4 0-.7-.2-.9-.6L21.5 24l2.1-3.4c.2-.4.5-.6.9-.6h4.8c2.7 0 4.8-3.5 3-5.7L17.8 1.4zM49.2 13.3c-1-1.3-2.8-.2-2.8 1.5v8.4h-5.6c-1.2 0-2.2 1-2.2 2.2v5.6c0 1.2 1 2.2 2.2 2.2h5.6v5.6c0 1.2 1 2.2 2.2 2.2s2.2-1 2.2-2.2v-5.6h2.8c1.7 0 2.5-2.1 1.2-3.4l-3.6-3.6c-.7-.7-1.9-.7-2.6 0l-1.2 1.2c-.4.4-1 .4-1.4 0s-.4-1 0-1.4l1.2-1.2c.7-.7 1.9-.7 2.6 0l4-4c1.7-1.7.5-4.5-1.6-4.5h-2.2z"
      />
    </svg>
  );
}