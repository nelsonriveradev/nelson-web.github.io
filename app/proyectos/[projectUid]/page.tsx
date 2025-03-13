import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default async function ProjectDetail({
  params,
}: {
  params: { projectUid: Promise<string> };
}) {
  const { projectUid } = params;
  console.log("Received projectUid:", projectUid); // Debugging line

  if (!projectUid) {
    console.error("projectUid is undefined");
    return <div>Invalid project ID</div>;
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("proyectos")
    .select()
    .eq("uid", projectUid);

  if (error) {
    console.error("Error fetching project:", error);
    return <div>Error fetching project details</div>;
  }

  if (!data || data.length === 0) {
    console.error("No project found with the given UID");
    return <div>No project found</div>;
  }

  const response = data[0];
  return (
    <div className="">
      <div className="flex flex-col items-center gap-y-3 mt-10">
        <h1 className="text-4xl text-bold">{response.name}</h1>
        <p>{response.description}</p>

        <Image
          className="rounded-lg border-2 border-zinc-200 p-2 bg-zinc-200 drop-shadow-md mx-auto self-center"
          src={response.img}
          alt={response.name}
          width={600}
          height={600}
        />
        <h3 className="text-semibold text-lg mt-4">Tecnologia usadas:</h3>

        <ul className="flex gap-x-2">
          {response.toolsUse.map((tool: string, index: number) => (
            <li
              className="bg-zinc-300 text-zinc-800 px-2 py-1 rounded-xl text-xs"
              key={index}
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
      <div className="prose h-[500px] overflow-y-scroll text-zinc-800 bg-zinc-200 w-[60%] p-4 rounded-xl mx-auto mt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {response.caseContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
