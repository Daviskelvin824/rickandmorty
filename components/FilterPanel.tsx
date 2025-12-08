"use client";

import { useEffect, useRef } from "react";
import { useCharacterStore } from "@/store/useCharacterStore";
import gsap from "gsap";

export function FilterPanel() {
  const { filters, setFilters, resetFilters } = useCharacterStore();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelRef.current) {
      const buttons = panelRef.current.querySelectorAll("button");
      buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out",
          });
        });
        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out",
          });
        });
      });
    }
  }, [filters]);

  const statusOptions: Array<"Alive" | "Dead" | "unknown"> = [
    "Alive",
    "Dead",
    "unknown",
  ];
  const genderOptions: Array<"Female" | "Male" | "Genderless" | "unknown"> = [
    "Female",
    "Male",
    "Genderless",
    "unknown",
  ];

  return (
    <div
      ref={panelRef}
      className="space-y-6 p-6 bg-white dark:bg-gradient-to-br dark:from-[#1a1f3a] dark:to-[#0f1425] rounded-2xl border-2 border-gray-200 dark:border-[#00ff88]/30 shadow-md dark:shadow-[0_0_30px_rgba(0,255,136,0.2)]"
    >
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-[#00ff88]/20 pb-3">
        <h3 className="text-xl font-bold gradient-text">Filters</h3>
        <button
          onClick={resetFilters}
          className="px-3 py-1 text-sm font-semibold text-[#00a855] dark:text-[#00ff88] hover:text-white hover:bg-[#00ff88]/20 rounded-lg transition-all duration-300 border border-[#00a855] dark:border-[#00ff88]/30 hover:border-[#00ff88]"
        >
          Reset
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff88]"></span>
            Status
          </label>
          <div className="flex flex-wrap gap-2">
            {statusOptions.map((status) => {
              const isActive = filters.status === status;
              return (
                <button
                  key={status}
                  onClick={() =>
                    setFilters({
                      status: filters.status === status ? undefined : status,
                    })
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-white shadow-[0_0_15px_rgba(0,255,136,0.5)] scale-105"
                      : "bg-gray-100 dark:bg-[#0f1425] text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-[#00ff88]/20 hover:border-[#00ff88] hover:text-[#00ff88] hover:bg-[#00ff88]/10"
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00d4ff]"></span>
            Gender
          </label>
          <div className="flex flex-wrap gap-2">
            {genderOptions.map((gender) => {
              const isActive = filters.gender === gender;
              return (
                <button
                  key={gender}
                  onClick={() =>
                    setFilters({
                      gender: filters.gender === gender ? undefined : gender,
                    })
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-[#00d4ff] to-[#9c27b0] text-white shadow-[0_0_15px_rgba(0,212,255,0.5)] scale-105"
                      : "bg-gray-100 dark:bg-[#0f1425] text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-[#00d4ff]/20 hover:border-[#00d4ff] hover:text-[#00d4ff] hover:bg-[#00d4ff]/10"
                  }`}
                >
                  {gender}
                </button>
              );
            })}
          </div>
        </div>

        {/* Species Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9c27b0]"></span>
            Species
          </label>
          <input
            type="text"
            value={filters.species || ""}
            onChange={(e) =>
              setFilters({ species: e.target.value || undefined })
            }
            placeholder="e.g., Human, Alien"
            className="w-full px-4 py-3 border-2 border-gray-300 dark:border-[#9c27b0]/30 rounded-lg bg-white dark:bg-[#0f1425] text-gray-900 dark:text-white placeholder-gray-500 focus:border-[#9c27b0] focus:ring-2 focus:ring-[#9c27b0]/50 focus:shadow-[0_0_15px_rgba(156,39,176,0.3)] transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
}
