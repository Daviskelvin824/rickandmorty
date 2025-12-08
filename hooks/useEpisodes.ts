import { useState, useEffect } from "react";
import { episodeApi } from "@/lib/api";
import type { Episode } from "@/types";

interface UseEpisodesReturn {
  episodes: Episode[];
  loading: boolean;
  error: string | null;
}

export function useEpisodes(episodeIds: number[]): UseEpisodesReturn {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (episodeIds.length === 0) {
        setEpisodes([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await episodeApi.getEpisodesByIds(episodeIds);
        setEpisodes(Array.isArray(data) ? data : [data]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch episodes"
        );
        setEpisodes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisodes();
  }, [episodeIds.join(",")]);

  return {
    episodes,
    loading,
    error,
  };
}
