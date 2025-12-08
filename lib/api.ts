import axios from "axios";
import type {
  Character,
  CharacterResponse,
  Episode,
  EpisodeResponse,
  CharacterFilters,
  ApiError,
} from "@/types";

const BASE_URL = "https://rickandmortyapi.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const characterApi = {
  getCharacters: async (
    filters: CharacterFilters = {}
  ): Promise<CharacterResponse> => {
    try {
      const params = new URLSearchParams();

      if (filters.name) params.append("name", filters.name);
      if (filters.status) params.append("status", filters.status);
      if (filters.species) params.append("species", filters.species);
      if (filters.gender) params.append("gender", filters.gender);
      if (filters.page) params.append("page", filters.page.toString());

      const response = await api.get<CharacterResponse>(
        `/character?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return {
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
          },
          results: [],
        };
      }
      throw error;
    }
  },

  getCharacter: async (id: number): Promise<Character> => {
    const response = await api.get<Character>(`/character/${id}`);
    return response.data;
  },

  getCharactersByIds: async (ids: number[]): Promise<Character[]> => {
    const response = await api.get<Character | Character[]>(
      `/character/${ids.join(",")}`
    );
    return Array.isArray(response.data) ? response.data : [response.data];
  },
};

export const episodeApi = {
  getEpisodes: async (page: number = 1): Promise<EpisodeResponse> => {
    const response = await api.get<EpisodeResponse>(`/episode?page=${page}`);
    return response.data;
  },

  getEpisode: async (id: number): Promise<Episode> => {
    const response = await api.get<Episode>(`/episode/${id}`);
    return response.data;
  },

  getEpisodesByIds: async (ids: number[]): Promise<Episode[]> => {
    const response = await api.get<Episode | Episode[]>(
      `/episode/${ids.join(",")}`
    );
    return Array.isArray(response.data) ? response.data : [response.data];
  },
};

export default api;
