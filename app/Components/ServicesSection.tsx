import { Gauge, Globe, Palette } from "lucide-react";
import SectionHeading from "./SectionHeading";

const services = [
  {
    title: "Desarrollo web",
    description:
      "Construyo sitios y aplicaciones web rápidas, responsivas y seguras, adaptadas a las necesidades reales de tu negocio.",
    icon: Globe,
    number: "01",
  },
  {
    title: "Diseño UI/UX",
    description:
      "Diseño interfaces claras e intuitivas para que tus usuarios encuentren lo que buscan sin fricción y disfruten usándolas.",
    icon: Palette,
    number: "02",
  },
  {
    title: "Optimización de rendimiento",
    description:
      "Mejoro la velocidad, la accesibilidad y el SEO técnico de tu sitio para que cargue rápido y retenga a más usuarios.",
    icon: Gauge,
    number: "03",
  },
];

export default function ServicesSection() {
  return (
    <section id="servicios" className="bg-muted py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          eyebrow="Servicios"
          title="¿En qué puedo ayudarte?"
          description="Combino diseño y tecnología para construir aplicaciones web de alta calidad que impulsan el crecimiento de tu proyecto."
          align="center"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                className="group relative overflow-hidden rounded-3xl border border-transparent bg-card p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-sage/60 hover:shadow-xl"
              >
                <span
                  className="absolute right-6 top-6 font-mono text-xs text-muted-foreground/50"
                  aria-hidden="true"
                >
                  {service.number}
                </span>

                <div className="flex size-14 items-center justify-center rounded-2xl bg-background text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="size-7" aria-hidden="true" />
                </div>

                <h3 className="mt-6 text-xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>

                <span
                  className="mt-6 block h-0.5 w-10 rounded-full bg-primary/30 transition-all duration-300 group-hover:w-20 group-hover:bg-primary"
                  aria-hidden="true"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
