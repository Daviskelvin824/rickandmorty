export function SkeletonCard() {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br dark:from-[#1a1f3a] dark:to-[#0f1425] border-2 border-gray-200 dark:border-[#00ff88]/20 shadow-md dark:shadow-[0_0_20px_rgba(0,255,136,0.1)] animate-pulse">
      <div className="aspect-square w-full bg-gray-200 dark:bg-gradient-to-br dark:from-[#0f1425] dark:via-[#1a1f3a] dark:to-[#0f1425] shimmer" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-gradient-to-r dark:from-[#0f1425] dark:via-[#1a1f3a] dark:to-[#0f1425] rounded w-3/4 shimmer" />
        <div className="h-4 bg-gray-200 dark:bg-gradient-to-r dark:from-[#0f1425] dark:via-[#1a1f3a] dark:to-[#0f1425] rounded w-1/2 shimmer" />
        <div className="h-3 bg-gray-200 dark:bg-gradient-to-r dark:from-[#0f1425] dark:via-[#1a1f3a] dark:to-[#0f1425] rounded w-1/3 shimmer" />
      </div>
    </div>
  );
}

