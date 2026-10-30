import { ProjectsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";

type ProjectsCardProps = ProjectsData & {
  priority?: boolean;
  tone?: "dark" | "light";
};

export default function ProjectsCard({
  uid,
  name,
  description,
  link,
  img,
  toolsUse,
  priority = false,
  tone = "dark",
}: ProjectsCardProps) {
  const isDark = tone === "dark";

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-1 ${
        isDark
          ? "border-sage/20 bg-teal/20 hover:border-sage/60 hover:shadow-2xl hover:shadow-black/20"
          : "border-border bg-card shadow-sm hover:border-sage hover:shadow-xl hover:shadow-teal/10"
      }`}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-teal">
        {img ? (
          <Image
            src={img}
            alt={`Captura del proyecto ${name}`}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-teal to-charcoal font-mono text-4xl text-sage/40">
            {name.slice(0, 2).toUpperCase()}
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-charcoal/70 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Abrir el sitio de ${name}`}
              className="flex size-11 items-center justify-center rounded-full bg-mint text-charcoal transition-colors hover:bg-sage"
            >
              <ExternalLink className="size-5" aria-hidden="true" />
            </a>
          ) : null}
          <Link
            href={`/proyectos/${uid}`}
            aria-label={`Ver el caso de estudio de ${name}`}
            className="flex size-11 items-center justify-center rounded-full bg-sage text-charcoal transition-colors hover:bg-mint"
          >
            <ArrowUpRight className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3
          className={`text-xl font-bold transition-colors ${
            isDark
              ? "text-mint group-hover:text-sage"
              : "text-foreground group-hover:text-primary"
          }`}
        >
          {name}
        </h3>

        {description ? (
          <p
            className={`mt-2 line-clamp-3 text-sm leading-relaxed ${
              isDark ? "text-mint/65" : "text-muted-foreground"
            }`}
          >
            {description}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          {toolsUse?.map((tool) => (
            <span
              key={tool}
              className={`rounded-md border px-2.5 py-1 font-mono text-[11px] ${
                isDark
                  ? "border-sage/20 bg-sage/10 text-sage"
                  : "border-primary/15 bg-secondary/25 text-primary"
              }`}
            >
              {tool}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-4 pt-6">
          <Link
            href={`/proyectos/${uid}`}
            className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${
              isDark
                ? "text-sage hover:text-mint"
                : "text-primary hover:text-teal"
            }`}
          >
            Ver más
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs font-medium transition-colors ${
                isDark
                  ? "text-mint/50 hover:text-sage"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              Visitar sitio
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
