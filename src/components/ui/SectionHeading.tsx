type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: "ink" | "cream";
  align?: "left" | "center";
  className?: string;
};

/**
 * Eyebrow (mono, uppercase) + serif display title. Each part carries
 * data-reveal so the parent section can stagger them into view.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "ink",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const muted = tone === "cream" ? "text-cream/60" : "text-mauve";
  const strong = tone === "cream" ? "text-cream" : "text-ink";
  const alignCls = align === "center" ? "items-center text-center" : "";

  return (
    <div className={`flex flex-col gap-5 ${alignCls} ${className}`}>
      <p data-reveal className={`text-eyebrow ${muted}`}>
        {eyebrow}
      </p>
      <h2
        data-reveal
        className={`text-display text-[clamp(2.6rem,6vw,5.5rem)] ${strong}`}
      >
        {title}
      </h2>
      {description && (
        <p
          data-reveal
          className={`max-w-[46ch] text-base leading-relaxed md:text-lg ${muted}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
