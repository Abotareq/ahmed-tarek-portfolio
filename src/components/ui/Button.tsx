import type { ComponentProps, ReactNode } from "react";

type Variant = "solid" | "outline";
type Tone = "ink" | "cream";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  tone?: Tone;
  icon?: ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "children">;

const shape =
  "group/btn relative inline-flex items-center rounded-full px-5 py-3 text-sm font-medium leading-none overflow-hidden transition-[color,border-color,transform] duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-0.5";

const styles: Record<Tone, Record<Variant, string>> = {
  ink: {
    solid: "bg-ink text-cream border border-ink hover:text-ink hover:border-pink",
    outline: "border border-ink/35 text-ink hover:border-pink",
  },
  cream: {
    solid: "bg-cream text-ink border border-cream hover:border-pink",
    outline: "border border-cream/35 text-cream hover:border-pink hover:text-ink",
  },
};

/**
 * Pill button. A pink fill sweeps up from the bottom on hover — the one
 * accent colour reserved for interaction across the whole site.
 */
export function Button({
  href,
  children,
  variant = "solid",
  tone = "ink",
  icon,
  className = "",
  ...rest
}: ButtonProps) {
  const isHttp = href.startsWith("http");

  return (
    <a
      href={href}
      className={`${shape} ${styles[tone][variant]} ${className}`}
      target={isHttp ? "_blank" : undefined}
      rel={isHttp ? "noopener noreferrer" : undefined}
      {...rest}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full rounded-full bg-pink transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/btn:translate-y-0"
      />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
        {icon && (
          <span className="transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
            {icon}
          </span>
        )}
      </span>
    </a>
  );
}
