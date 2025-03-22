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
    <div className=" text-zinc-200 p-4">
      <h1>Oops! Algo salió mal.</h1>
      <Image
        src="/Illustration/bonbon-line-error-404.png"
        alt="404 illustration"
        width={200}
        height={200}
      />
      <p>{error.message}</p>
      <pre>{error.stack}</pre>
      <button onClick={reset}>Reniciar</button>
      <Link href="/">Volver a Inicio</Link>
    </div>
  );
}
