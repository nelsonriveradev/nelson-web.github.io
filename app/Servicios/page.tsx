"use client";
import Image from "next/image";
import Link from "next/link";
import { handleCheckout } from "./action";

const packages: {
  name: string;
  price: string;
  features: string[];
  plan: "essentials" | "media" | "premium";
}[] = [
  {
    name: "Web Essentials",
    price: "$350/mes",
    features: [
      "Página web profesional (hasta 5 secciones y 4 páginas)",
      "Hosting y mantenimiento mensual",
      "2 actualización de contenido al mes",
      "Soporte técnico básico",
      "Optimización móvil y SEO básico",
    ],
    plan: "essentials",
  },
  {
    name: "Web + Media",
    price: "$500/mes",
    features: [
      "Todo lo de Web Essentials",
      "2 sesión de fotografía mensual (10 fotos editadas)",
      "1 dia de video mensual (creación de 4 reels)",
      "2 piezas de diseño gráfico al mes",
      "Hasta 3 actualizaciones de contenido web al mes",
    ],
    plan: "media",
  },
  {
    name: "Web Premium Total",
    price: "$600/mes",
    features: [
      "Todo lo de Web + Media",
      "3 sesiones de fotografía al mes (20 fotos editadas)",
      "2 días videos al mes (creación de 6 reels)",

      "Gestión básica de redes sociales (Solo publicacion de contenido)",
      "Hasta 4 actualizaciones de contenido web al mes",
      "Soporte prioritario",
    ],
    plan: "premium",
  },
];

const comparativa = [
  {
    feature: "Página web profesional",
    essentials: true,
    media: true,
    premium: true,
  },
  {
    feature: "Hosting y mantenimiento",
    essentials: true,
    media: true,
    premium: true,
  },
  {
    feature: "Actualizaciones mensuales",
    essentials: "2",
    media: "3",
    premium: "4",
  },
  {
    feature: "Fotografía mensual",
    essentials: "-",
    media: "2 sesión",
    premium: "3 sesiones",
  },
  {
    feature: "Video mensual",
    essentials: "-",
    media: "1 video",
    premium: "2 videos",
  },

  {
    feature: "Gestión de redes sociales",
    essentials: "-",
    media: "-",
    premium: "✔",
  },
  {
    feature: "Soporte prioritario",
    essentials: "-",
    media: "-",
    premium: "✔",
  },
];

export default function Servicios() {
  return (
    <div className="bg-zinc-800 w-[90%] mx-auto py-10 min-h-screen">
      <h1 className="text-5xl text-zinc-100 font-bold text-center mb-8">
        Servicios de Páginas Web y creación de contenido
      </h1>
      <p className="text-zinc-300 text-center mb-10 max-w-2xl mx-auto">
        Elige el paquete que mejor se adapte a tu meta. Todos los planes son
        mensuales, incluyen soporte y están diseñados para que tu negocio se
        destaque en linea.
      </p>

      {/* Paquetes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {packages.map((pkg) => (
          <div
            key={pkg.name}
            className="bg-white rounded-2xl p-6 flex flex-col items-center shadow-lg"
          >
            <h2 className="text-2xl font-bold text-zinc-800 mb-2">
              {pkg.name}
            </h2>
            <p className="text-3xl font-bold text-orange-500 mb-4">
              {pkg.price}
            </p>
            <ul className="text-zinc-700 mb-6 space-y-2">
              {pkg.features.map((f, i) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
            <button
              onClick={() => handleCheckout(pkg.plan)}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition items-end"
            >
              Contratar
            </button>
          </div>
        ))}
      </div>

      {/* Tabla comparativa */}
      <h2 className="text-3xl text-zinc-100 font-bold text-center mb-4">
        Comparativa de Paquetes
      </h2>
      <div className="overflow-x-auto w-full">
        <table className="min-w-[600px] w-full bg-white rounded-xl overflow-hidden text-zinc-800 text-sm md:text-base">
          <thead>
            <tr>
              <th className="py-2 px-2 md:px-4 text-left"></th>
              <th className="py-2 px-2 md:px-4 text-center">Essentials</th>
              <th className="py-2 px-2 md:px-4 text-center">Web + Media</th>
              <th className="py-2 px-2 md:px-4 text-center">Premium Total</th>
            </tr>
          </thead>
          <tbody>
            {comparativa.map((row, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 px-2 md:px-4 font-semibold">
                  {row.feature}
                </td>
                <td className="py-2 px-2 md:px-4 text-center">
                  {row.essentials === true
                    ? "✔"
                    : row.essentials === "-"
                    ? "-"
                    : row.essentials}
                </td>
                <td className="py-2 px-2 md:px-4 text-center">
                  {row.media === true
                    ? "✔"
                    : row.media === "-"
                    ? "-"
                    : row.media}
                </td>
                <td className="py-2 px-2 md:px-4 text-center">
                  {row.premium === true
                    ? "✔"
                    : row.premium === "-"
                    ? "-"
                    : row.premium}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="text-xs text-zinc-400 mt-2 md:hidden text-center">
          Desliza la tabla para ver todos los paquetes &rarr;
        </p>
      </div>

      {/* Llamado a la acción */}
      <div className="text-center mt-12">
        <h3 className="text-2xl text-zinc-100 font-bold mb-2">
          ¿Listo para llevar tu gimnasio al siguiente nivel?
        </h3>
        <p className="text-zinc-300 mb-4">
          Regístrate, elige tu paquete y agenda tu primera sesión hoy mismo.
        </p>
        <Link
          href="/registro"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition"
        >
          Comenzar ahora
        </Link>
      </div>
    </div>
  );
}
