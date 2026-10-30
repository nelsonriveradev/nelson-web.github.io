"use cache";

import Link from "next/link";
import { ArrowUpRight, Code2, Github, Heart, Mail } from "lucide-react";

const navigation = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Sobre mí", href: "/#sobre-mi" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Proyectos", href: "/proyectos" },
  { label: "Contacto", href: "/contacto" },
];

export default async function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-sage/20 bg-charcoal pb-8 pt-16 text-mint">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link
              href="/#inicio"
              className="inline-flex items-center gap-2 transition-colors hover:text-sage"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-sage text-charcoal">
                <Code2 className="size-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.2em]">
                Nelson<span className="text-sage">.dev</span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-sage/80">
              Construyo experiencias digitales con foco en rendimiento,
              accesibilidad y resultados reales para tu negocio.
            </p>
          </div>

          <div>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-sage">
              Navegación
            </h2>
            <ul className="space-y-2 text-sm">
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1 text-mint/80 transition-colors hover:text-sage"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-sage">
              Contacto
            </h2>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:nelsonrivera.dev@gmail.com"
                  className="inline-flex items-center gap-2 text-mint/80 transition-colors hover:text-sage"
                >
                  <Mail className="size-4" aria-hidden="true" />
                  nelsonrivera.dev@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/nelsonriveradev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-mint/80 transition-colors hover:text-sage"
                >
                  <Github className="size-4" aria-hidden="true" />
                  GitHub
                  <ArrowUpRight className="size-3" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-sage/70 md:flex-row">
          <p>
            &copy; {currentYear} Nelson Rivera. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-1">
            Hecho con <Heart className="size-3.5 fill-current text-sage" aria-hidden="true" /> y
            Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
