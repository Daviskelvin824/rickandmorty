"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCharacterStore } from "@/store/useCharacterStore";
import { getStatusColor } from "@/utils";
import type { Character } from "@/types";
import gsap from "gsap";

interface CharacterCardProps {
  character: Character;
}

export function CharacterCard({ character }: CharacterCardProps) {
  const { toggleFavorite, isFavorite } = useCharacterStore();
  const favorite = isFavorite(character.id);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.03,
        y: -8,
        duration: 0.3,
        ease: "power2.out",
      });

      if (imageRef.current) {
        gsap.to(imageRef.current.querySelector("img"), {
          scale: 1.1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      if (imageRef.current) {
        gsap.to(imageRef.current.querySelector("img"), {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#1a1f3a] dark:to-[#0f1425] border-2 border-gray-200 dark:border-[#00ff88]/30 shadow-md dark:shadow-[0_0_20px_rgba(0,255,136,0.2)] cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/0 via-[#00d4ff]/0 to-[#9c27b0]/0 group-hover:from-[#00ff88]/10 group-hover:via-[#00d4ff]/10 group-hover:to-[#9c27b0]/10 transition-all duration-500 pointer-events-none"></div>

      <Link
        href={`/character/${character.id}`}
        onClick={(e) => {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        <div
          ref={imageRef}
          className="aspect-square w-full relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0e27] via-transparent to-transparent z-10"></div>
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="p-5 relative z-10 bg-white dark:bg-transparent">
        <div className="flex items-start justify-between mb-3">
          <Link href={`/character/${character.id}`}>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 hover:text-[#00ff88] transition-colors group-hover:drop-shadow-[0_0_10px_rgba(0,255,136,0.8)]">
              {character.name}
            </h3>
          </Link>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(character.id);
            }}
            className="ml-2 shrink-0 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#00ff88]/20 transition-all duration-300 hover:scale-110"
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <svg
              className={`h-5 w-5 transition-all duration-300 ${
                favorite
                  ? "text-[#ffd54f] fill-[#ffd54f] drop-shadow-[0_0_10px_rgba(255,213,79,0.8)]"
                  : "text-gray-500 dark:text-gray-400 hover:text-[#ffd54f]"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <span
            className={`inline-block h-3 w-3 rounded-full ${getStatusColor(
              character.status
            )} shadow-[0_0_10px_currentColor]`}
          />
          <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            {character.status} - {character.species}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-1 flex items-center gap-1">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-[#00d4ff]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {character.location.name}
        </p>
      </div>
    </div>
  );
}
