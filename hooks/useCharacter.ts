import { useState, useEffect } from "react";
import { characterApi } from "@/lib/api";
import type { Character } from "@/types";

interface UseCharacterReturn {
  character: Character | null;
  loading: boolean;
  error: string | null;
}

export function useCharacter(id: number): UseCharacterReturn {
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await characterApi.getCharacter(id);
        setCharacter(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch character"
        );
        setCharacter(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCharacter();
    }
  }, [id]);

  return {
    character,
    loading,
    error,
  };
}
