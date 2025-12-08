"use client";

import { useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useCharacter } from "@/hooks/useCharacter";
import { useEpisodes } from "@/hooks/useEpisodes";
import { useCharacterStore } from "@/store/useCharacterStore";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorState } from "@/components/ErrorState";
import { getStatusColor, extractEpisodeId, formatDate } from "@/utils";
import gsap from "gsap";

export const runtime = "edge";

export default function CharacterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string, 10);
  const { character, loading, error } = useCharacter(id);
  const { toggleFavorite, isFavorite } = useCharacterStore();

  // All hooks must be called before any conditional returns
  const heroRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const episodesRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLButtonElement>(null);

  const episodeIds =
    character?.episode
      .map((url) => extractEpisodeId(url))
      .filter((id) => id > 0) || [];
  const { episodes } = useEpisodes(episodeIds);

  const favorite = character ? isFavorite(character.id) : false;

  // Animate hero image on load
  useEffect(() => {
    if (heroRef.current && character) {
      const nameElement = heroRef.current.querySelector("h1");
      const statusElement = heroRef.current.querySelector(
        ".flex.items-center.gap-3"
      );

      gsap.fromTo(
        heroRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1, ease: "power3.out" }
      );

      if (nameElement) {
        gsap.fromTo(
          nameElement,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
        );
      }

      if (statusElement) {
        gsap.fromTo(
          statusElement,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, delay: 0.5, ease: "power3.out" }
        );
      }
    }
  }, [character]);

  // Animate details card
  useEffect(() => {
    if (detailsRef.current && character) {
      gsap.fromTo(
        detailsRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
      );
    }
  }, [character]);

  // Animate episodes
  useEffect(() => {
    if (episodesRef.current && episodes.length > 0) {
      const episodeCards =
        episodesRef.current.querySelectorAll("[data-episode]");
      gsap.fromTo(
        episodeCards,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          delay: 0.5,
          ease: "power2.out",
        }
      );

      // Add hover animations to episode cards
      episodeCards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.05,
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }
  }, [episodes]);

  // Animate detail cards on hover
  useEffect(() => {
    if (!character) return;

    const detailCards = document.querySelectorAll("[data-detail-card]");
    const handlers: Array<{
      card: Element;
      enter: () => void;
      leave: () => void;
    }> = [];

    detailCards.forEach((card) => {
      const enterHandler = () => {
        gsap.to(card, {
          scale: 1.02,
          y: -3,
          duration: 0.3,
          ease: "power2.out",
        });
      };
      const leaveHandler = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      card.addEventListener("mouseenter", enterHandler);
      card.addEventListener("mouseleave", leaveHandler);
      handlers.push({ card, enter: enterHandler, leave: leaveHandler });
    });

    return () => {
      handlers.forEach(({ card, enter, leave }) => {
        card.removeEventListener("mouseenter", enter);
        card.removeEventListener("mouseleave", leave);
      });
    };
  }, [character]);

  // Animate back button
  useEffect(() => {
    if (backButtonRef.current) {
      gsap.fromTo(
        backButtonRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="min-h-screen relative">
        <div className="container mx-auto px-4 py-8 relative z-10">
          <ErrorState message={error || "Character not found"} />
          <div className="text-center mt-8">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#00ff88] to-[#00d4ff] text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(0,255,136,0.5)] transition-all duration-300"
            >
              ← Back to Characters
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <button
          ref={backButtonRef}
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-gray-700 dark:text-[#00ff88] hover:text-[#00ff88] dark:hover:text-white font-semibold transition-all duration-300"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Dimensions
        </button>

        <div className="max-w-6xl mx-auto">
          {/* Full-width Hero Image Section */}
          <div
            ref={heroRef}
            className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden mb-8 border-2 border-gray-200 dark:border-[#00ff88]/30 shadow-xl dark:shadow-[0_0_40px_rgba(0,255,136,0.3)]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0e27] via-transparent to-transparent z-10"></div>
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
            {/* Character name overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
                {character.name}
              </h1>
              <div className="flex items-center gap-3">
                <span
                  className={`inline-block h-4 w-4 rounded-full ${getStatusColor(
                    character.status
                  )} shadow-[0_0_15px_currentColor]`}
                />
                <span className="text-xl md:text-2xl text-white font-semibold drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {character.status} - {character.species}
                </span>
              </div>
            </div>
          </div>

          {/* Character Details Card */}
          <div
            ref={detailsRef}
            className="bg-white dark:bg-gradient-to-br dark:from-[#1a1f3a] dark:to-[#0f1425] border-2 border-gray-200 dark:border-[#00ff88]/30 rounded-2xl shadow-lg dark:shadow-[0_0_40px_rgba(0,255,136,0.3)] overflow-hidden"
          >
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => toggleFavorite(character.id)}
                      className="p-3 rounded-full hover:bg-[#00ff88]/20 transition-all duration-300 hover:scale-110"
                      aria-label={
                        favorite ? "Remove from favorites" : "Add to favorites"
                      }
                    >
                      <svg
                        className={`h-7 w-7 transition-all duration-300 ${
                          favorite
                            ? "text-[#ffd54f] fill-[#ffd54f] drop-shadow-[0_0_15px_rgba(255,213,79,0.8)]"
                            : "text-gray-400 dark:text-gray-500 hover:text-[#ffd54f]"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {favorite ? "Favorited" : "Add to favorites"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Gender */}
                {character.gender && (
                  <div
                    data-detail-card
                    className="p-4 bg-gray-50 dark:bg-[#0f1425]/50 rounded-lg border border-gray-200 dark:border-[#00d4ff]/20 hover:border-[#00d4ff] cursor-pointer"
                  >
                    <span className="text-sm font-medium text-[#00d4ff] block mb-1">
                      Gender
                    </span>
                    <span className="text-lg text-gray-900 dark:text-white font-semibold">
                      {character.gender}
                    </span>
                  </div>
                )}

                {/* Type */}
                {character.type && (
                  <div
                    data-detail-card
                    className="p-4 bg-gray-50 dark:bg-[#0f1425]/50 rounded-lg border border-gray-200 dark:border-[#9c27b0]/20 hover:border-[#9c27b0] cursor-pointer"
                  >
                    <span className="text-sm font-medium text-[#9c27b0] block mb-1">
                      Type
                    </span>
                    <span className="text-lg text-gray-900 dark:text-white font-semibold">
                      {character.type}
                    </span>
                  </div>
                )}

                {/* Origin */}
                <div
                  data-detail-card
                  className="p-4 bg-gray-50 dark:bg-[#0f1425]/50 rounded-lg border border-gray-200 dark:border-[#00ff88]/20 hover:border-[#00ff88] cursor-pointer"
                >
                  <span className="text-sm font-medium text-[#00ff88] block mb-1">
                    Origin
                  </span>
                  <span className="text-lg text-gray-900 dark:text-white font-semibold">
                    {character.origin.name}
                  </span>
                </div>

                {/* Location */}
                <div
                  data-detail-card
                  className="p-4 bg-gray-50 dark:bg-[#0f1425]/50 rounded-lg border border-gray-200 dark:border-[#00d4ff]/20 hover:border-[#00d4ff] cursor-pointer"
                >
                  <span className="text-sm font-medium text-[#00d4ff] block mb-1">
                    Location
                  </span>
                  <span className="text-lg text-gray-900 dark:text-white font-semibold">
                    {character.location.name}
                  </span>
                </div>

                {/* Created */}
                <div
                  data-detail-card
                  className="p-4 bg-gray-50 dark:bg-[#0f1425]/50 rounded-lg border border-gray-200 dark:border-[#9c27b0]/20 hover:border-[#9c27b0] cursor-pointer"
                >
                  <span className="text-sm font-medium text-[#9c27b0] block mb-1">
                    Created
                  </span>
                  <span className="text-lg text-gray-900 dark:text-white font-semibold">
                    {formatDate(character.created)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Episodes Section */}
          {episodes.length > 0 && (
            <div
              ref={episodesRef}
              className="mt-8 bg-white dark:bg-gradient-to-br dark:from-[#1a1f3a] dark:to-[#0f1425] border-2 border-gray-200 dark:border-[#00ff88]/30 rounded-2xl shadow-lg dark:shadow-[0_0_40px_rgba(0,255,136,0.2)] p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold gradient-text mb-6 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00ff88] animate-pulse"></span>
                Episodes ({episodes.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {episodes.map((episode) => (
                  <div
                    key={episode.id}
                    data-episode
                    className="p-4 bg-gray-50 dark:bg-[#0f1425] border border-gray-200 dark:border-[#00ff88]/20 rounded-lg hover:border-[#00ff88] hover:bg-[#00ff88]/10 hover:shadow-[0_0_15px_rgba(0,255,136,0.3)] transition-all duration-300 cursor-pointer"
                  >
                    <div className="font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {episode.name}
                    </div>
                    <div className="text-sm text-[#00d4ff] mb-2 font-semibold">
                      {episode.episode}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {formatDate(episode.air_date)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
