import { ArrowUpRight, Github, Mail, MessageSquare } from "lucide-react";
import ContactForm from "./ContactForm";
import SectionHeading from "./SectionHeading";

type ContactSectionProps = {
  headingLevel?: "h1" | "h2";
};

export default function ContactSection({
  headingLevel = "h2",
}: ContactSectionProps = {}) {
  return (
    <section id="contacto" className="relative overflow-hidden bg-muted py-24">
      <div
        className="pointer-events-none absolute -right-16 top-16 size-64 rounded-full bg-sage/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-20 bottom-8 size-72 rounded-full bg-teal/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Contacto"
          title="¿Construimos algo juntos?"
          description="Cuéntame qué tienes en mente. Puedo ayudarte a convertir tu idea en una experiencia web clara, rápida y funcional."
          align="center"
          level={headingLevel}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="flex flex-col gap-6">
            <div className="rounded-3xl border-l-4 border-primary bg-card p-7 shadow-xl shadow-teal/5">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-muted text-primary">
                <MessageSquare className="size-6" aria-hidden="true" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-foreground">
                Hablemos de tu proyecto
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Estoy abierto a proyectos freelance, colaboraciones y nuevas
                ideas. Escríbeme por el formulario o directamente por correo.
              </p>

              <div className="mt-7 space-y-4">
                <a
                  href="mailto:nelsonrivera.dev@gmail.com"
                  className="group flex items-start gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-border hover:bg-muted"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-primary">
                    <Mail className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Correo
                    </span>
                    <span className="block break-all text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      nelsonrivera.dev@gmail.com
                    </span>
                  </span>
                </a>

                <a
                  href="https://github.com/nelsonriveradev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-border hover:bg-muted"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-primary">
                    <Github className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      GitHub
                    </span>
                    <span className="flex items-center gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                      nelsonriveradev
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </span>
                  </span>
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-background p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                Disponibilidad
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Abierto a nuevos proyectos y colaboraciones. Si tienes una idea,
                el primer paso es una conversación.
              </p>
            </div>
          </aside>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
