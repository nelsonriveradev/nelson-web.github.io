import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarClock, Mail } from "lucide-react";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export const metadata: Metadata = {
  title: "Reservar cita",
  description: "Agenda una conversación con Nelson Rivera.",
};

export default function ReservarPage() {
  return (
    <div className="bg-background pb-24 pt-28">
      <div className="mx-auto w-full max-w-3xl px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-xl shadow-teal/5">
          <div className="flex items-center gap-3 border-b border-border bg-muted px-6 py-4">
            <CalendarClock className="size-5 text-primary" aria-hidden="true" />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
              Reservar cita
            </p>
          </div>

          <div className="flex flex-col items-center px-6 py-14 text-center">
            <Image
              src="/Illustration/pixeltrue-web-development.png"
              alt="Ilustración de desarrollo web en construcción"
              width={3333}
              height={2500}
              sizes="(min-width: 768px) 384px, 80vw"
              className="h-auto w-64 sm:w-80"
            />
            <h1 className="mt-8 text-2xl font-bold text-foreground md:text-3xl">
              Esta página está en desarrollo
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Estoy preparando una forma más sencilla de agendar una
              conversación. Mientras tanto, puedes escribirme directamente y
              coordinamos una cita.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:nelsonrivera.dev@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Mail className="size-4" aria-hidden="true" />
                Escribirme
              </a>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-sage hover:bg-muted"
              >
                <ArrowLeft className="size-4" aria-hidden="true" />
                Volver al inicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
