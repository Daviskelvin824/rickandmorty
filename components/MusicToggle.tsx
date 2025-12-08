"use client";

import { useEffect, useRef, useState } from "react";
import { useMusicStore } from "@/store/useMusicStore";
import { getAudioManager } from "@/utils/audioManager";
import gsap from "gsap";

export function MusicToggle() {
  const { isPlaying, volume, setPlaying } = useMusicStore();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const audioManager = getAudioManager();
  const hasSyncedRef = useRef(false);

  useEffect(() => {
    audioManager.setVolume(volume);
  }, [volume]);

  useEffect(() => {
    if (hasSyncedRef.current) return;
    hasSyncedRef.current = true;

    const currentPlaying = audioManager.isPlaying();
    if (currentPlaying) {
      setPlaying(true);
    }
  }, [setPlaying]);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPlaying) {
      audioManager.pause();
      setPlaying(false);
    } else {
      try {
        setIsLoading(true);

        const audioElement = audioManager.getAudioElement();
        if (!audioElement) {
          throw new Error("Audio element not initialized");
        }

        await audioManager.play();
        setPlaying(true);
        setIsLoading(false);
      } catch (error: any) {
        console.error("Error playing audio:", error);
        setIsLoading(false);
        setPlaying(false);

        if (error?.name === "NotAllowedError") {
          console.warn(
            "Audio playback blocked by browser. User interaction required."
          );
        } else if (error?.name === "NotSupportedError") {
          console.warn("Audio format not supported by browser.");
        } else {
          console.warn("Unable to play audio:", error?.message || error);
        }
      }
    }
  };

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.1,
        rotation: 5,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        rotation: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      disabled={isLoading}
      className="relative p-2 rounded-full bg-white dark:bg-[#1a1f3a] border-2 border-gray-300 dark:border-[#00ff88]/30 hover:border-[#00ff88] transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,136,0.5)] group disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={isPlaying ? "Pause theme song" : "Play theme song"}
    >
      {isLoading ? (
        <svg
          className="w-5 h-5 text-[#00ff88] animate-spin"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : isPlaying ? (
        <svg
          className="w-5 h-5 text-[#00ff88] group-hover:text-[#00d4ff] transition-colors"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-[#00ff88] transition-colors"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-0.5">
            <span
              className="w-0.5 h-2 bg-[#00ff88] rounded-full animate-pulse"
              style={{ animationDelay: "0s" }}
            ></span>
            <span
              className="w-0.5 h-3 bg-[#00d4ff] rounded-full animate-pulse"
              style={{ animationDelay: "0.1s" }}
            ></span>
            <span
              className="w-0.5 h-2 bg-[#9c27b0] rounded-full animate-pulse"
              style={{ animationDelay: "0.2s" }}
            ></span>
            <span
              className="w-0.5 h-3 bg-[#00d4ff] rounded-full animate-pulse"
              style={{ animationDelay: "0.3s" }}
            ></span>
            <span
              className="w-0.5 h-2 bg-[#00ff88] rounded-full animate-pulse"
              style={{ animationDelay: "0.4s" }}
            ></span>
          </div>
        </div>
      )}
    </button>
  );
}
