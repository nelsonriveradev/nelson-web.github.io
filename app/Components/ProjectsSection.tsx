import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";
import type { ProjectsData } from "@/lib/data";
import ProjectsCard from "./ProjectsCards";
import SectionHeading from "./SectionHeading";

type ProjectsSectionProps = {
  projects: ProjectsData[];
};

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const featured = projects.slice(0, 4);

  return (
    <section id="proyectos" className="relative overflow-hidden bg-charcoal py-24 text-mint">
      <div
        className="pointer-events-none absolute -left-20 top-20 size-72 rounded-full bg-teal/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-sage/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Portafolio"
            title="Proyectos destacados"
            description="Una selección de proyectos profesionales y personales donde he aplicado diseño, desarrollo y resolución de problemas."
            tone="dark"
          />

          <Link
            href="/proyectos"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-sage/40 px-5 py-2.5 text-sm font-semibold text-sage transition-colors hover:bg-sage hover:text-charcoal md:self-auto"
          >
            Ver todos
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {featured.map((project, index) => (
              <ProjectsCard key={project.uid} {...project} priority={index < 2} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-sage/30 bg-white/5 px-6 py-16 text-center">
            <FolderOpen className="size-10 text-sage/70" aria-hidden="true" />
            <p className="mt-4 text-lg font-semibold text-mint">
              Estoy preparando nuevos proyectos
            </p>
            <p className="mt-2 max-w-md text-sm text-mint/60">
              Mientras tanto, puedes escribirme y conversamos sobre lo que
              necesitas construir.
            </p>
            <Link
              href="#contacto"
              className="mt-6 rounded-full bg-sage px-5 py-2.5 text-sm font-bold text-charcoal transition-colors hover:bg-mint"
            >
              Hablemos
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
