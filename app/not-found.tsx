import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, FolderOpen, Home } from "lucide-react";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "La página que buscas no existe o cambió de lugar.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-6 pb-24 pt-28">
      <div className="w-full max-w-xl rounded-3xl border border-border bg-card p-8 text-center shadow-xl shadow-teal/5 sm:p-10">
        <Image
          src="/Illustration/bonbon-line-error-404.png"
          alt="Ilustración de página no encontrada"
          width={955}
          height={466}
          sizes="(min-width: 640px) 384px, 80vw"
          className="mx-auto h-auto w-72"
        />
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-primary">
          Error 404
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Esta página no existe
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
          El enlace puede estar roto o la página cambió de lugar. Puedes volver
          al inicio o revisar los proyectos publicados.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <Home className="size-4" aria-hidden="true" />
            Volver al inicio
          </Link>
          <Link
            href="/proyectos"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-sage hover:bg-muted"
          >
            <FolderOpen className="size-4" aria-hidden="true" />
            Ver proyectos
          </Link>
        </div>

        <Link
          href="/contacto"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-teal"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Escríbeme si necesitas ayuda
        </Link>
      </div>
    </div>
  );
}
