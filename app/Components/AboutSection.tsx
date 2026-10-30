import { Sparkles, Target } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Skills from "./Skills";

export default function AboutSection() {
  return (
    <section id="sobre-mi" className="relative overflow-hidden bg-background py-24">
      <div
        className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-charcoal via-teal to-sage"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 md:grid-cols-2 md:gap-16">
        <div>
          <SectionHeading
            eyebrow="Sobre mí"
            title="Creando soluciones digitales que aportan valor"
          />

          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              ¡Hola! Soy Nelson Rivera, un desarrollador web enfocado en la
              creación de sistemas que aporten valor a tu negocio o idea. Mi
              experiencia abarca tecnologías como Next.js, Tailwind CSS,
              Firebase y Supabase, lo que me permite construir soluciones web
              robustas y eficientes.
            </p>
            <p>
              Siempre estoy en busca de nuevos desafíos. Mi próxima meta es
              incursionar en el desarrollo de aplicaciones móviles, ampliando
              mis habilidades para ofrecer soluciones cada vez más completas.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-5">
              <Target className="size-6 text-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-foreground">
                Enfoque en resultados
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Soluciones pensadas para el negocio, no solo para el navegador.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5">
              <Sparkles className="size-6 text-primary" aria-hidden="true" />
              <p className="mt-3 text-sm font-semibold text-foreground">
                Próxima meta
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Desarrollo de aplicaciones móviles.
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            className="absolute -right-6 -top-6 size-24 rounded-full bg-sage/30 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative rounded-3xl border border-border bg-card p-6 shadow-xl shadow-teal/5 sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-8 w-2 rounded-full bg-primary" aria-hidden="true" />
              <h3 className="text-lg font-bold text-foreground">
                Stack y habilidades
              </h3>
            </div>

            <Skills />

            <div className="mt-7 flex items-center justify-between gap-4 border-t border-border pt-5 text-sm">
              <span className="text-muted-foreground">Tecnologías en uso</span>
              <span className="font-mono font-bold text-primary">
                8 herramientas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
