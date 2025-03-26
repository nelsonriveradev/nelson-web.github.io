import { createClient } from "@/utils/supabase/server";
import ProjectsCard from "../Components/ProjectsCards";

export default async function Proyectos() {
  const supabase = await createClient();
  const { data } = await supabase.from("proyectos").select();
  return (
    <div className="w-[90%] mx-auto">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-bold text-center mt-10">Proyectos</h1>
        <h4 className="text-xl text-semibold">
          Listas de proyectos profesionales y personales.
        </h4>
      </div>
      <div className="flex justify-center mt-10 flex-wrap gap-4">
        {data?.map((proyecto) => (
          <ProjectsCard
            key={proyecto.uid}
            uid={proyecto.uid}
            name={proyecto.name}
            caseContent={proyecto.caseContent}
            img={proyecto.img}
            link={proyecto.link}
            toolsUse={proyecto.toolsUse}
          />
        ))}
      </div>
    </div>
  );
}
