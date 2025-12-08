"use client";

import { useState, useEffect, useRef } from "react";
import { useCharacterStore } from "@/store/useCharacterStore";
import { debounce } from "@/utils";
import gsap from "gsap";

export function SearchBar() {
  const { filters, setFilters } = useCharacterStore();
  const [searchValue, setSearchValue] = useState(filters.name || "");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const debouncedSearch = debounce((value: string) => {
    setFilters({ name: value || undefined });
  }, 500);

  useEffect(() => {
    debouncedSearch(searchValue);
  }, [searchValue]);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      gsap.to(inputRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    } else if (inputRef.current) {
      gsap.to(inputRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  }, [isFocused]);

  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
        <svg
          className={`w-5 h-5 transition-colors duration-300 ${
            isFocused ? "text-[#00ff88]" : "text-gray-500 dark:text-gray-400"
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search characters across dimensions..."
        className="block w-full pl-12 pr-12 py-4 border-2 border-gray-300 dark:border-[#00ff88]/30 rounded-xl bg-white dark:bg-[#1a1f3a]/80 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-[#00ff88] focus:ring-2 focus:ring-[#00ff88]/50 focus:shadow-[0_0_20px_rgba(0,255,136,0.3)]"
      />
      {searchValue && (
        <button
          onClick={() => {
            setSearchValue("");
            setFilters({ name: undefined });
          }}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 dark:text-gray-400 hover:text-[#00ff88] transition-colors duration-300"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00ff88]/10 via-[#00d4ff]/10 to-[#9c27b0]/10 pointer-events-none blur-xl opacity-0"
      ></div>
    </div>
  );
}
