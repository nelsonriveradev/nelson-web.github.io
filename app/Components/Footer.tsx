// app/Components/Footer.jsx

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-300 py-8 mt-16 rounded-t-2xl shadow-inner">
      <div className="w-[90%] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Izquierda: Logo o nombre */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-orange-400">
            Nelson Rivera
          </span>
          <span className="hidden md:inline text-zinc-400">
            | Vitamin C Productions
          </span>
        </div>

        {/* Centro: Email y contacto */}
        <div className="text-center">
          <span>
            Contacto:{" "}
            <a
              href="mailto:admin@nelsonrivera.me"
              className="text-orange-400 underline hover:text-orange-500"
            >
              admin@nelsonrivera.me
            </a>
          </span>
        </div>

        {/* Derecha: Redes sociales */}
        <div className="flex gap-4">
          <Link
            href="https://www.instagram.com/nelsonrivera.me"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:text-orange-400 transition"
          >
            <svg
              width={24}
              height={24}
              fill="currentColor"
              className="inline"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.425 3.678 1.406 2.697 2.387 2.403 3.499 2.344 4.78.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.059 1.281.353 2.393 1.334 3.374.981.981 2.093 1.275 3.374 1.334C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.353 3.374-1.334.981-.981 1.275-2.093 1.334-3.374.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.059-1.281-.353-2.393-1.334-3.374-.981-.981-2.093-1.275-3.374-1.334C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </Link>
          <Link
            href="https://www.linkedin.com/in/nelsonrivera-me"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-orange-400 transition"
          >
            <svg
              width={24}
              height={24}
              fill="currentColor"
              className="inline"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.043 0 3.604 2.004 3.604 4.609v5.587z" />
            </svg>
          </Link>
          {/* Agrega más redes si quieres */}
        </div>
      </div>
      <div className="w-[90%] mx-auto mt-4 text-center text-zinc-500 text-sm">
        &copy; {new Date().getFullYear()} Nelson Rivera. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
