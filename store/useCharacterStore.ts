import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { CharacterFilters } from "@/types";

const safeStorage = {
  getItem: (name: string): string | null => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(name, value);
    } catch {}
  },
  removeItem: (name: string): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(name);
    } catch {}
  },
};

interface CharacterStore {
  filters: CharacterFilters;
  setFilters: (filters: Partial<CharacterFilters>) => void;
  resetFilters: () => void;

  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;

  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const defaultFilters: CharacterFilters = {
  name: "",
  status: undefined,
  species: "",
  gender: undefined,
  page: 1,
};

export const useCharacterStore = create<CharacterStore>()(
  persist(
    (set, get) => ({
      filters: defaultFilters,
      setFilters: (newFilters) =>
        set((state) => ({
          filters: { ...state.filters, ...newFilters, page: 1 },
        })),
      resetFilters: () => set({ filters: defaultFilters, currentPage: 1 }),

      favorites: [],
      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),
      isFavorite: (id) => get().favorites.includes(id),

      currentPage: 1,
      setCurrentPage: (page) => set({ currentPage: page }),
    }),
    {
      name: "rick-morty-storage",
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({
        favorites: state.favorites,
        filters: {
          name: state.filters.name,
          status: state.filters.status,
          species: state.filters.species,
          gender: state.filters.gender,
        },
      }),
    }
  )
);
