"use client";

import { useMemo, useEffect, useRef } from "react";
import { useCharacters } from "@/hooks/useCharacters";
import { useCharacterStore } from "@/store/useCharacterStore";
import { CharacterCard } from "@/components/CharacterCard";
import { SearchBar } from "@/components/SearchBar";
import { FilterPanel } from "@/components/FilterPanel";
import { Pagination } from "@/components/Pagination";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { SkeletonCard } from "@/components/SkeletonCard";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import gsap from "gsap";

export default function Home() {
  const { filters, currentPage, setCurrentPage } = useCharacterStore();

  const memoizedFilters = useMemo(
    () => ({
      ...filters,
      page: currentPage,
    }),
    [filters.name, filters.status, filters.species, filters.gender, currentPage]
  );

  const { characters, loading, error, info } = useCharacters(memoizedFilters);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchRef.current) {
      gsap.fromTo(
        searchRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (filterRef.current) {
      gsap.fromTo(
        filterRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.2, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (cardsContainerRef.current && !loading && characters.length > 0) {
      const cards = cardsContainerRef.current.querySelectorAll("[data-card]");

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    }
  }, [characters, loading]);

  useEffect(() => {
    if (resultsRef.current && !loading && !error) {
      gsap.fromTo(
        resultsRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [loading, error, characters.length]);

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="w-full" ref={searchRef}>
              <SearchBar />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1" ref={filterRef}>
              <FilterPanel />
            </div>

            <div className="lg:col-span-3">
              {!loading && !error && (
                <div
                  ref={resultsRef}
                  className="mb-6 text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
                  {info && (
                    <span>
                      Showing{" "}
                      <span className="text-[#00a855] dark:text-[#00ff88] font-bold">
                        {characters.length}
                      </span>{" "}
                      of{" "}
                      <span className="text-[#0088cc] dark:text-[#00d4ff] font-bold">
                        {info.count}
                      </span>{" "}
                      characters across dimensions
                    </span>
                  )}
                </div>
              )}

              {loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              )}

              {error && !loading && <ErrorState message={error} />}

              {!loading && !error && characters.length === 0 && (
                <EmptyState message="No characters found matching your criteria" />
              )}

              {!loading && !error && characters.length > 0 && (
                <>
                  <div
                    ref={cardsContainerRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
                  >
                    {characters.map((character) => (
                      <div key={character.id} data-card>
                        <CharacterCard character={character} />
                      </div>
                    ))}
                  </div>

                  {info && info.pages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalPages={info.pages}
                      onPageChange={setCurrentPage}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
