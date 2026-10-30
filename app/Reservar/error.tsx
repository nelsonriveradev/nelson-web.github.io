"use client";

import Link from "next/link";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-background px-6 pb-24 pt-28">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 text-center shadow-xl shadow-teal/5">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-muted text-primary">
          <AlertTriangle className="size-7" aria-hidden="true" />
        </div>
        <h1 className="mt-5 text-2xl font-bold text-foreground">
          No pudimos cargar la reserva
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ocurrió un problema al mostrar esta página. Inténtalo de nuevo o
          escríbeme directamente para coordinar una cita.
        </p>
        {error.digest ? (
          <p className="mt-3 font-mono text-[11px] text-muted-foreground/70">
            Código: {error.digest}
          </p>
        ) : null}

        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Reintentar
          </button>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-sage hover:bg-muted"
          >
            Ir a contacto
          </Link>
        </div>
      </div>
    </div>
  );
}
