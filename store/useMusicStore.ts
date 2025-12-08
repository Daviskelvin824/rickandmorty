import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MusicState {
  isPlaying: boolean;
  volume: number;
  setPlaying: (playing: boolean) => void;
  setVolume: (volume: number) => void;
  toggle: () => void;
}

export const useMusicStore = create<MusicState>()(
  persist(
    (set) => ({
      isPlaying: false,
      volume: 0.5,
      setPlaying: (playing) => set({ isPlaying: playing }),
      setVolume: (volume) => set({ volume }),
      toggle: () => set((state) => ({ isPlaying: !state.isPlaying })),
    }),
    {
      name: 'rick-morty-music-storage',
    }
  )
);

