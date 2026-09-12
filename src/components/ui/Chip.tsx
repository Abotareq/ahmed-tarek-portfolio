type ChipProps = {
  children: React.ReactNode;
  tone?: "ink" | "cream";
  className?: string;
};

export function Chip({ children, tone = "ink", className = "" }: ChipProps) {
  const toneCls =
    tone === "cream" ? "border-cream/25 text-cream hover:text-ink" : "text-ink";
  return <span className={`chip ${toneCls} ${className}`}>{children}</span>;
}
