import { useState, useEffect, useCallback, useMemo } from "react";
import { characterApi } from "@/lib/api";
import type { Character, CharacterFilters, CharacterResponse } from "@/types";

interface UseCharactersReturn {
  characters: Character[];
  loading: boolean;
  error: string | null;
  info: CharacterResponse["info"] | null;
  refetch: () => void;
}

export function useCharacters(
  filters: CharacterFilters = {}
): UseCharactersReturn {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<CharacterResponse["info"] | null>(null);

  const memoizedFilters = useMemo(
    () => filters,
    [
      filters.name,
      filters.status,
      filters.species,
      filters.gender,
      filters.page,
    ]
  );

  const fetchCharacters = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await characterApi.getCharacters(memoizedFilters);
      setCharacters(data.results);
      setInfo(data.info);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch characters"
      );
      setCharacters([]);
      setInfo(null);
    } finally {
      setLoading(false);
    }
  }, [memoizedFilters]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);

  return {
    characters,
    loading,
    error,
    info,
    refetch: fetchCharacters,
  };
}
