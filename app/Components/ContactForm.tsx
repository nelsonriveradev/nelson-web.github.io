"use client";

import { useActionState, useEffect, useRef } from "react";
import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { submitContact } from "@/lib/actions/submitContact";
import { initialContactState } from "@/lib/contact";

const inputClasses =
  "w-full rounded-xl border border-transparent bg-muted px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-sage focus:bg-card focus:outline-none focus:ring-2 focus:ring-sage/30";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialContactState,
  );

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-teal/5 sm:p-8 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Sitio web</label>
          <input
            type="text"
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="¿Cómo te llamas?"
            className={inputClasses}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-semibold text-foreground"
          >
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            maxLength={200}
            autoComplete="email"
            placeholder="tu@correo.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-semibold text-foreground"
        >
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          minLength={10}
          maxLength={5000}
          placeholder="Cuéntame sobre tu proyecto, idea o lo que necesitas..."
          className={`${inputClasses} resize-none`}
        />
      </div>

      <div aria-live="polite" className="mt-5">
        {state.status !== "idle" ? (
          <p
            role={state.status === "error" ? "alert" : "status"}
            className={`flex items-start gap-2 rounded-xl border px-4 py-3 text-sm ${
              state.status === "success"
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300"
            }`}
          >
            {state.status === "success" ? (
              <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            ) : (
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            )}
            {state.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Enviando...
          </>
        ) : (
          <>
            Enviar mensaje
            <Send className="size-4" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="mt-4 text-xs text-muted-foreground">
        Tus datos solo se usan para responder a tu mensaje.
      </p>
    </form>
  );
}
