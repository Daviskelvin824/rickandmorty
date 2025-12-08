"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function useGSAP() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const cards = containerRef.current.querySelectorAll(
        "[data-animate-card]"
      );

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 30,
          scale: 0.9,
        },
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
  }, []);

  return containerRef;
}

export function useFadeIn(delay = 0) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
        }
      );
    }
  }, [delay]);

  return ref;
}

export function useSlideIn(
  direction: "left" | "right" | "up" | "down" = "up",
  delay = 0
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      const directions = {
        left: { x: -50 },
        right: { x: 50 },
        up: { y: 50 },
        down: { y: -50 },
      };

      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          ...directions[direction],
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
        }
      );
    }
  }, [direction, delay]);

  return ref;
}

export function useScaleIn(delay = 0) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) {
      gsap.fromTo(
        ref.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          delay,
          ease: "back.out(1.7)",
        }
      );
    }
  }, [delay]);

  return ref;
}
