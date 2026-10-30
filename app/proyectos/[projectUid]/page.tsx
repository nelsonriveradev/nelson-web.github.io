import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import SlideShow from "@/app/Components/SlideShow";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectUid: string }>;
}): Promise<Metadata> {
  const { projectUid } = await params;

  if (!projectUid) return { title: "Proyecto" };

  const supabase = await createClient();
  const { data } = await supabase
    .from("proyectos")
    .select("name, description")
    .eq("uid", projectUid)
    .maybeSingle();

  if (!data) return { title: "Proyecto no encontrado" };

  const description =
    (data as { description?: string | null }).description ??
    `Caso de estudio del proyecto ${(data as { name: string }).name} desarrollado por Nelson Rivera.`;

  return {
    title: (data as { name: string }).name,
    description,
    openGraph: {
      title: (data as { name: string }).name,
      description,
      type: "article",
    },
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ projectUid: string }>;
}) {
  const { projectUid } = await params;

  if (!projectUid) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <p className="rounded-2xl border border-border bg-card p-6 text-foreground">
          El identificador del proyecto no es válido.
        </p>
        <Link href="/proyectos" className="mt-6 inline-block text-primary">
          Volver a proyectos
        </Link>
      </div>
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("proyectos")
    .select()
    .eq("uid", projectUid);

  if (error) {
    console.error("Error fetching project:", error);
    return (
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <p className="rounded-2xl border border-border bg-card p-6 text-foreground">
          No pudimos cargar este proyecto. Inténtalo de nuevo más tarde.
        </p>
        <Link href="/proyectos" className="mt-6 inline-block text-primary">
          Volver a proyectos
        </Link>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32">
        <p className="rounded-2xl border border-border bg-card p-6 text-foreground">
          No encontramos este proyecto.
        </p>
        <Link href="/proyectos" className="mt-6 inline-block text-primary">
          Volver a proyectos
        </Link>
      </div>
    );
  }

  const project = data[0];

  return (
    <div className="bg-background pb-24 pt-28">
      <div className="mx-auto w-full max-w-5xl px-6">
        <Link
          href="/proyectos"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver a proyectos
        </Link>

        <header className="mt-8 flex flex-col gap-6 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Caso de estudio
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {project.name}
            </h1>
            {project.description ? (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {project.description}
              </p>
            ) : null}

            {project.toolsUse?.length ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.toolsUse.map((tool: string) => (
                  <li
                    key={tool}
                    className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[11px] text-primary"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              Visitar sitio
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          ) : null}
        </header>

        {project.screenshots?.length ? (
          <div className="mt-10 rounded-3xl border border-border bg-card p-4 sm:p-6">
            <SlideShow images={project.screenshots} link={project.link} />
          </div>
        ) : null}

        <article className="prose prose-sm mt-10 max-w-none rounded-3xl border border-border bg-card p-6 text-foreground dark:prose-invert sm:p-8 md:prose-base prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground prose-code:text-primary">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
            {project.caseContent}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  );
}
