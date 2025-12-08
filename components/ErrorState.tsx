"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function ErrorState({
  message = "Something went wrong",
}: {
  message?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && iconRef.current && textRef.current) {
      const shakeTimeline = gsap.timeline();
      shakeTimeline
        .to(iconRef.current, { x: -10, duration: 0.1 })
        .to(iconRef.current, { x: 10, duration: 0.1 })
        .to(iconRef.current, { x: -10, duration: 0.1 })
        .to(iconRef.current, { x: 10, duration: 0.1 })
        .to(iconRef.current, { x: 0, duration: 0.1 });

      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div ref={iconRef} className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#e91e63] to-[#9c27b0] rounded-full blur-2xl opacity-30 animate-pulse"></div>
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg
            className="w-full h-full text-[#e91e63]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <div ref={textRef}>
        <h3 className="text-2xl font-bold text-[#e91e63] mb-3">
          Dimension Error!
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
          {message}
        </p>
      </div>
    </div>
  );
}
