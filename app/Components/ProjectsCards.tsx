"use client";

import { ProjectsData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ProjectsCard({
  uid,
  name,
  caseContent,
  link,
  img,
  toolsUse,
}: ProjectsData) {
  return (
    <div className=" p-4 rounded-2xl  min-h-[320px]">
      <h3 className="text-2xl text-white">{name}</h3>
      <Link href={link} prefetch={true} target="_blank">
        <Image
          width={500}
          height={500}
          src={img}
          alt={name}
          className={`rounded-md hover:scale-105 hover:translate-y-0.5 transition duration-300 delay-100 ease-in-out`}
        />
      </Link>

      <div className="flex  items-center justify-between gap-x-6 w-full  ">
        <div className="flex justify-between w-[90%] ">
          <div className="flex flex-col gap-y-2">
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
          </div>
          <div className="flex items-center">
            <Link
              href="/proyectos/[id]"
              as={`/proyectos/${uid}`}
              className="bg-zinc-800 text-zinc-200 text-md w-fit px-2 py-1 rounded-xl border-2 border-zinc-200 hover:bg-zinc-200 hover:text-zinc-800 transition-all duration-200 "
            >
              Ver más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
