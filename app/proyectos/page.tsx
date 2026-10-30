import type { Metadata } from "next";
import { FolderOpen } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import type { ProjectsData } from "@/lib/data";
import ProjectsCard from "../Components/ProjectsCards";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Lista de proyectos profesionales y personales desarrollados por Nelson Rivera.",
};

export default async function Proyectos() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("proyectos").select();

  if (error) {
    console.error("Error al cargar los proyectos:", error);
  }

  const projects = (data ?? []) as ProjectsData[];

  return (
    <div className="bg-background pb-24 pt-28">
      <div className="mx-auto w-full max-w-6xl px-6">
        <header className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-primary/10 bg-secondary/25 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
            Portafolio
          </span>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Proyectos
          </h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-primary" aria-hidden="true" />
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Una selección de proyectos profesionales y personales. Cada uno
            combina diseño, desarrollo y una solución concreta a un problema.
          </p>
        </header>

        {projects.length > 0 ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectsCard
                key={project.uid}
                {...project}
                tone="light"
                priority={index < 3}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card px-6 py-20 text-center">
            <FolderOpen className="size-10 text-primary/70" aria-hidden="true" />
            <p className="mt-4 text-lg font-semibold text-foreground">
              Todavía no hay proyectos publicados
            </p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Estoy trabajando en nuevos casos de estudio. Vuelve pronto o
              escríbeme para conocer más sobre mi trabajo.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
