"use client";

import { useEffect, useState, useRef } from "react";
import { useCharacterStore } from "@/store/useCharacterStore";
import { characterApi } from "@/lib/api";
import { CharacterCard } from "@/components/CharacterCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { EmptyState } from "@/components/EmptyState";
import type { Character } from "@/types";
import gsap from "gsap";

export default function FavoritesPage() {
  const { favorites } = useCharacterStore();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favorites.length === 0) {
        setCharacters([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await characterApi.getCharactersByIds(favorites);
        setCharacters(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Failed to fetch favorites:", error);
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Animate title
  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  // Animate cards with stagger
  useEffect(() => {
    if (cardsRef.current && characters.length > 0) {
      const cards = cardsRef.current.querySelectorAll("[data-fav-card]");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }
  }, [characters]);

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <h1
          ref={titleRef}
          className="text-3xl md:text-4xl font-bold gradient-text mb-8 flex items-center gap-3"
        >
          <svg
            className="w-8 h-8 text-[#ffd54f]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          Favorite Characters{" "}
          <span className="text-[#00ff88]">({characters.length})</span>
        </h1>

        {characters.length === 0 ? (
          <EmptyState message="You haven't favorited any characters yet" />
        ) : (
          <div
            ref={cardsRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {characters.map((character) => (
              <div key={character.id} data-fav-card>
                <CharacterCard character={character} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
