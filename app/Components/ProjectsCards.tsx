"use client";

import { ProjectsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProjectsCard({
  name,
  caseContent,
  link,
  img,
  toolsUse,
}: ProjectsData) {
  return (
    <div className=" p-4 rounded-2xl  min-h-[320px]">
      <h3 className="text-2xl text-white">{name}</h3>
      <Image
        width={500}
        height={500}
        src={img}
        alt={name}
        className={`rounded-md hover:blur-[3px] transition-all duration-300`}
      />
      <h3 className="text-semibold text-lg mt-4">Tecnologia usadas:</h3>
      <ul className="flex gap-x-2">
        {toolsUse.map((tool, index) => (
          <li
            className="bg-zinc-300 text-zinc-800 px-2 py-1 rounded-xl text-xs"
            key={index}
          >
            {tool}
          </li>
        ))}
      </ul>

      <div className=" z-10 flex items-center justify-center gap-x-2  mx-auto w-fit">
        <Link
          target="_blank"
          prefetch={true}
          href={link}
          className="bg-zinc-800 text-zinc-200 p-2 rounded-xl "
        >
          Ir a la página
        </Link>
        <Link
          href="/projects/[id]"
          as={`/projects/${name}`}
          className="bg-zinc-800 text-zinc-200 p-2 rounded-xl "
        >
          Ver más
        </Link>
      </div>
    </div>
  );
}
