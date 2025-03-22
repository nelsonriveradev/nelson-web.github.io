"use client";
import Link from "next/link";
import Image from "next/image";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className=" flex flex-col items-center text-zinc-200 p-4">
      <h1>Oops! Algo salió mal.</h1>
      <Image
        src="/Illustration/bonbon-line-error-404.png"
        alt="404 illustration"
        width={200}
        height={200}
      />
      <div className="w-full p-2">
        <p>{error.message}</p>
        <pre>{error.stack}</pre>
      </div>
      <div className="flex gap-x-4">
        <button className="hover:underline" onClick={reset}>
          Reiniciar
        </button>
        <Link
          className=" p-2 rounded-lg border-2 border-zinc-200 hover:scale-105 transition-all duration-75 ease-in-out"
          href="/"
        >
          Volver a Inicio
        </Link>
      </div>
    </div>
  );
}
