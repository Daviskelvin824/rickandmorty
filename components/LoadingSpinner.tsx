'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-16 w-16',
  };

  const spinnerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (spinnerRef.current && glowRef.current) {
      gsap.to(spinnerRef.current, {
        rotation: 360,
        duration: 1,
        repeat: -1,
        ease: 'linear',
      });

      gsap.to(glowRef.current, {
        scale: 1.2,
        opacity: 0.7,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
      });
    }
  }, []);

  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div
          ref={glowRef}
          className="absolute inset-0 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] rounded-full blur-xl opacity-50"
        />
        <div
          ref={spinnerRef}
          className={`${sizeClasses[size]} relative rounded-full border-4 border-[#00ff88]/20 border-t-[#00ff88] border-r-[#00d4ff]`}
        />
      </div>
    </div>
  );
}

