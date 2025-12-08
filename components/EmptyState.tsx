"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function EmptyState({
  message = "No characters found",
}: {
  message?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && iconRef.current && textRef.current) {
      gsap.fromTo(
        iconRef.current,
        { scale: 0, rotation: -180 },
        { scale: 1, rotation: 0, duration: 0.8, ease: "back.out(1.7)" }
      );

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
        <div className="absolute inset-0 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] rounded-full blur-2xl opacity-30 animate-pulse"></div>
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg
            className="w-full h-full text-[#00ff88]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <div ref={textRef}>
        <h3 className="text-2xl font-bold gradient-text mb-3 text-center">
          {message}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
          Try adjusting your search or filters to find characters across
          dimensions!
        </p>
      </div>
    </div>
  );
}
