import { createClient } from "@/utils/supabase/server";
import ProjectsCard from "../Components/ProjectsCards";

export default async function Proyectos() {
  const supabase = await createClient();
  const { data } = await supabase.from("proyectos").select();
  console.log("data", data);

  return (
    <div>
      <h1>Proyectos</h1>
      <ul>
        {data?.map((proyecto) => (
          <ProjectsCard
            key={proyecto.uid}
            id={proyecto.uid}
            name={proyecto.name}
            caseContent={proyecto.caseContent}
            img={proyecto.img}
            link={proyecto.link}
            toolsUse={proyecto.toolsUse}
          />
        ))}
      </ul>
    </div>
  );
}
