import { createClient } from "@/utils/supabase/server";
import type { ProjectsData } from "@/lib/data";
import HeroSection from "./Components/HeroSection";
import AboutSection from "./Components/AboutSection";
import ServicesSection from "./Components/ServicesSection";
import ProjectsSection from "./Components/ProjectsSection";
import ContactSection from "./Components/ContactSection";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
export const instant = false;

export default async function Home() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("proyectos").select();

  if (error) {
    console.error("Error al cargar los proyectos:", error);
  }

  const projects = (data ?? []) as ProjectsData[];

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection projects={projects} />
      <ContactSection />
    </>
  );
}
