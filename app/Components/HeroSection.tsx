"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import SocialsLinks from "./SocialsLinks";

const roles = ["Desarrollador Web", "Diseñador UI", "Solucionador de problemas"];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden bg-charcoal pb-24 pt-32 text-mint md:pt-36"
    >
      <div
        className="pointer-events-none absolute -right-24 top-24 size-80 rounded-full bg-teal opacity-40 blur-3xl animate-float"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-24 bottom-12 size-96 rounded-full bg-sage/10 blur-3xl animate-float-delayed"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-[14%] top-[28%] size-12 rounded-full border-4 border-teal opacity-60 animate-float"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-[22%] right-[16%] size-16 rotate-45 border-4 border-sage/40 opacity-50 animate-float-delayed"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-12 top-[18%] size-3 rounded-full bg-sage opacity-60 animate-pulse"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
        <div className="animate-fade-in-up text-center md:text-left">
          <p className="mb-3 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-sage md:justify-start">
            <span className="h-px w-8 bg-sage/60" aria-hidden="true" />
            Hola, soy
          </p>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-mint sm:text-6xl lg:text-7xl">
            Nelson{" "}
            <span className="block text-sage">Rivera</span>
          </h1>

          <div className="mt-5 flex h-11 items-center justify-center gap-2 text-xl text-mint/80 md:justify-start md:text-2xl">
            <span>Soy</span>
            <span
              key={roles[roleIndex]}
              className="animate-fade-in-up font-semibold text-sage"
            >
              {roles[roleIndex]}
            </span>
          </div>

          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-mint/70 md:mx-0 md:text-lg">
            Construyo y gestiono sitios y aplicaciones web orientadas a
            resultados. Mi enfoque está en crear interfaces claras, rápidas y
            accesibles que ayuden a tu negocio o idea a crecer.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start">
            <Link
              href="#proyectos"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage px-7 py-3 text-sm font-bold text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-mint sm:w-auto"
            >
              Ver mis proyectos
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="#contacto"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-sage/70 px-7 py-3 text-sm font-bold text-sage transition-all duration-300 hover:bg-sage hover:text-charcoal sm:w-auto"
            >
              Hablemos
            </Link>
          </div>

          <SocialsLinks className="mt-8 justify-center md:justify-start" />
        </div>

        <div className="relative flex justify-center md:justify-end">
          <div className="relative size-72 sm:size-80 lg:size-96">
            <div
              className="absolute inset-0 rounded-full border border-dashed border-sage/40 animate-spin-slow"
              aria-hidden="true"
            />
            <div
              className="absolute inset-5 rounded-full border-2 border-teal/70 animate-spin-reverse"
              aria-hidden="true"
            />
            <div
              className="absolute inset-10 rounded-full border border-sage/30"
              aria-hidden="true"
            />
            <div className="absolute inset-8 overflow-hidden rounded-full border-4 border-mint/90 shadow-2xl">
              <Image
                src="/images/nelson_rivera-1.jpg"
                alt="Retrato de Nelson Rivera"
                width={1638}
                height={2048}
                priority
                sizes="(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 18rem"
                className="size-full object-cover object-top"
              />
            </div>

            <div className="absolute -bottom-2 right-0 flex items-center gap-2 rounded-2xl border border-sage/20 bg-charcoal/90 px-4 py-3 text-xs font-medium text-mint shadow-xl backdrop-blur md:-right-4">
              <Sparkles className="size-4 text-sage" aria-hidden="true" />
              Next.js · React · Supabase
            </div>
          </div>
        </div>
      </div>

      <Link
        href="#sobre-mi"
        aria-label="Bajar a la sección Sobre mí"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-sage/80 transition-colors hover:text-sage sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
          Explora
        </span>
        <span className="flex h-10 w-6 justify-center rounded-full border border-sage/60 pt-2">
          <ArrowDown className="size-3 animate-bounce" aria-hidden="true" />
        </span>
      </Link>
    </section>
  );
}
