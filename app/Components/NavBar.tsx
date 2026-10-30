"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Code2, Menu, X } from "lucide-react";
import { SignInButton, SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import ThemeToggle from "./ThemeToggle";

const sections = [
  { id: "inicio", label: "Inicio", hash: "#inicio", route: "/" },
  { id: "sobre-mi", label: "Sobre mí", hash: "#sobre-mi", route: "/" },
  { id: "servicios", label: "Servicios", hash: "#servicios", route: "/" },
  { id: "proyectos", label: "Proyectos", hash: "#proyectos", route: "/proyectos" },
  { id: "contacto", label: "Contacto", hash: "#contacto", route: "/contacto" },
];

export default function NavBar() {
  const pathname = usePathname();
  const { isLoaded } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");

  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;

    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const hrefFor = (section: (typeof sections)[number]) => {
    if (section.route === "/" || isHome) return section.hash;
    return section.route;
  };

  const isActive = (section: (typeof sections)[number]) => {
    if (!isHome) {
      if (section.route === "/proyectos") return pathname.startsWith("/proyectos");
      return pathname === section.route;
    }
    return activeSection === section.id;
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? "border-b border-white/10 bg-charcoal/95 py-2 shadow-lg backdrop-blur-md"
          : "bg-transparent py-4"
      }`}
    >
      <div className="relative z-50 mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6">
        <Link
          href="/#inicio"
          className="group flex items-center gap-2 text-mint transition-colors hover:text-sage"
          aria-label="Nelson Rivera, ir al inicio"
        >
          <span className="flex size-9 items-center justify-center rounded-xl bg-sage text-charcoal transition-transform duration-300 group-hover:-rotate-6">
            <Code2 className="size-5" aria-hidden="true" />
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.2em]">
            Nelson<span className="text-sage">.dev</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navegación principal">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={hrefFor(section)}
              aria-current={isActive(section) ? "page" : undefined}
              className={`relative py-2 text-sm font-medium transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:rounded-full after:bg-sage after:transition-all after:duration-300 ${
                isActive(section)
                  ? "text-sage after:w-full"
                  : "text-mint/85 after:w-0 hover:text-sage hover:after:w-full"
              }`}
            >
              {section.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          {!isLoaded ? (
            <span className="size-10 rounded-full border border-white/20" aria-hidden="true" />
          ) : (
            <>
              <SignedIn>
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    type="button"
                    className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-mint transition-colors hover:border-sage hover:bg-sage hover:text-charcoal"
                  >
                    Acceder
                  </button>
                </SignInButton>
              </SignedOut>
            </>
          )}
          <Link
            href={isHome ? "#contacto" : "/contacto"}
            className="rounded-full bg-sage px-5 py-2 text-sm font-bold text-charcoal transition-transform duration-300 hover:-translate-y-0.5 hover:bg-mint"
          >
            Hablemos
          </Link>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-mint transition-colors hover:border-sage hover:text-sage"
          >
            {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 flex flex-col justify-center bg-charcoal px-8 pt-24 transition-all duration-300 md:hidden ${
          isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-2" aria-label="Navegación móvil">
          {sections.map((section, index) => (
            <Link
              key={section.id}
              href={hrefFor(section)}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between border-b border-white/10 py-4 text-2xl font-bold transition-colors ${
                isActive(section) ? "text-sage" : "text-mint hover:text-sage"
              }`}
            >
              {section.label}
              <span className="font-mono text-xs text-sage/70">0{index + 1}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-10 flex flex-col gap-4">
          <Link
            href={isHome ? "#contacto" : "/contacto"}
            onClick={() => setIsOpen(false)}
            className="rounded-full bg-sage px-6 py-3 text-center text-sm font-bold text-charcoal"
          >
            Hablemos de tu proyecto
          </Link>
          <div className="flex items-center justify-center gap-4">
            {!isLoaded ? null : (
              <>
                <SignedIn>
                  <UserButton />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      type="button"
                      className="rounded-full border border-white/25 px-4 py-2 text-sm font-semibold text-mint"
                    >
                      Acceder
                    </button>
                  </SignInButton>
                </SignedOut>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
