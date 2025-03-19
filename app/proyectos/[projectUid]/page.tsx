import { createClient } from "@/utils/supabase/server";
import SlideShow from "@/app/Components/SlideShow";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ projectUid: string }>;
}) {
  const { projectUid } = await params;

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
    <div>
      <div className="flex flex-col items-center gap-y-3 mt-10">
        <h1 className="text-4xl text-bold">{response.name}</h1>
        <p>{response.description}</p>

        <SlideShow images={response.screenshots} />
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
      <div className="prose h-[500px] overflow-y-scroll text-zinc-800 bg-zinc-200 w-[70%]  p-4 rounded-xl mx-auto mt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
          {response.caseContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}
