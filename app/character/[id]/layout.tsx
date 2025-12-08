// Server component for generateStaticParams
export function generateStaticParams() {
  // Generate first 20 characters for static export
  // The rest will be handled client-side
  return Array.from({ length: 20 }, (_, i) => ({
    id: String(i + 1),
  }));
}

export default function CharacterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

