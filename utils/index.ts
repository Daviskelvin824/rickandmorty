export function extractEpisodeId(url: string): number {
  const match = url.match(/\/(\d+)$/);
  return match ? parseInt(match[1], 10) : 0;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "alive":
      return "bg-[#00ff88]";
    case "dead":
      return "bg-[#e91e63]";
    default:
      return "bg-[#9c27b0]";
  }
}
