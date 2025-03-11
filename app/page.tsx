import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

import Image from "next/image";
import NavBar from "./Components/NavBar";
import SocialsLinks from "./Components/SocialsLinks";
import Skills from "./Components/Skills";
import ProjectsCard from "./Components/ProjectsCards";

//data
import { projects } from "@/lib/data";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.from("proyectos").select();
  return (
    <div className="bg-zinc-800 w-[90%] mx-auto ">
      {/* Hero */}
      <div className="grid grid-cols-2  h-auto mt-10  ">
        <div className="  flex items-center w-[95%]">
          <div className="flex flex-col justify-center h-full  text-center gap-y-2">
            <h1 className="text-zinc-300 text-6xl font-bold">
              Hola, soy Nelson Rivera
            </h1>
            <SocialsLinks />

            <p className="text-zinc-300 mt-2 w-3/5 self-center">
              Desarrollador web orientado a resultados que construye y gestiona
              páginas web y aplicaciones web para el éxito.
            </p>
          </div>
        </div>

        <div className=" flex items-center justify-center ">
          <Image
            className="border-8 border-zinc-300 rounded-4xl"
            src="/images/nelson_rivera-1.jpg"
            width={400}
            height={400}
            alt="Nelson Rivera with Laptop"
          />
        </div>
      </div>

      {/* About me */}
      <div>
        <div className="grid grid-cols-2 gap-x-6 mt-10">
          <div className="w-5/6 bg-white text-zinc-800 rounded-2xl p-4">
            <h2 className="text-zinc-800 text-4xl font-bold">Sobre mí</h2>
            <p className="text-zinc-800 text-lg mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure,
              atque laudantium! Beatae eius ea, placeat, quas, praesentium totam
              voluptas dolore repudiandae magni fuga voluptatem ducimus
              doloremque nulla dolor officia iure!
            </p>
          </div>
          <div className="flex flex-col items-start">
            <h2 className="text-3xl">Destrezas</h2>
            <Skills />
          </div>
        </div>
      </div>
      {/* Projects */}
      <div className="">
        <h2 className="text-4xl text-zinc-100 font-bold mt-12 mb-5 text-center">
          Proyectos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
          {data?.map((project) => (
            <ProjectsCard key={project.uid} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}
