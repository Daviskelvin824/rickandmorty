// Global audio manager to persist audio across navigation
class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();

  constructor() {
    if (typeof window !== "undefined") {
      this.audio = new Audio("/themesong.mp3");
      this.audio.loop = true;
      this.audio.volume = 0.5;
      this.audio.preload = "auto";

      // Handle audio events
      this.audio.addEventListener("play", () => {
        this.notifyListeners(true);
      });

      this.audio.addEventListener("pause", () => {
        this.notifyListeners(false);
      });

      this.audio.addEventListener("ended", () => {
        this.notifyListeners(false);
      });
    }
  }

  private notifyListeners(playing: boolean) {
    this.listeners.forEach((listener) => listener(playing));
  }

  subscribe(listener: (playing: boolean) => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  async play() {
    if (!this.audio) {
      throw new Error("Audio element not initialized");
    }

    try {
      // If audio hasn't loaded metadata yet, load it first
      if (this.audio.readyState === 0) {
        this.audio.load();
        // Wait a bit for metadata to load
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      await this.audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
      throw error;
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  setVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  getVolume(): number {
    return this.audio?.volume ?? 0.5;
  }

  isPlaying(): boolean {
    return this.audio ? !this.audio.paused : false;
  }

  getAudioElement(): HTMLAudioElement | null {
    return this.audio;
  }
}

// Singleton instance
let audioManagerInstance: AudioManager | null = null;

export function getAudioManager(): AudioManager {
  if (typeof window === "undefined") {
    // Return a mock for SSR
    return {
      subscribe: () => () => {},
      play: async () => {},
      pause: () => {},
      setVolume: () => {},
      getVolume: () => 0.5,
      isPlaying: () => false,
      getAudioElement: () => null,
    } as unknown as AudioManager;
  }

  if (!audioManagerInstance) {
    audioManagerInstance = new AudioManager();
  }
  return audioManagerInstance;
}
