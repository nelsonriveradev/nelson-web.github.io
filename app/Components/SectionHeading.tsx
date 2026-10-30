type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  level?: "h1" | "h2";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  level: Heading = "h2",
  className = "",
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={`${align === "center" ? "mx-auto text-center" : "text-left"} max-w-2xl ${className}`}
    >
      <span
        className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] ${
          isDark
            ? "border-sage/20 bg-sage/10 text-sage"
            : "border-primary/10 bg-secondary/25 text-primary"
        }`}
      >
        {eyebrow}
      </span>
      <Heading
        className={`mt-4 text-3xl font-bold tracking-tight md:text-4xl ${
          isDark ? "text-mint" : "text-foreground"
        }`}
      >
        {title}
      </Heading>
      <div
        className={`mt-4 h-1 w-16 rounded-full ${align === "center" ? "mx-auto" : ""} ${
          isDark ? "bg-sage" : "bg-primary"
        }`}
        aria-hidden="true"
      />
      {description ? (
        <p
          className={`mt-5 text-base leading-relaxed md:text-lg ${
            isDark ? "text-mint/70" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
