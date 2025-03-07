export interface ProjectsData {
  id: number;
  name: string;
  icon?: string;
  caseContent: string;
  link: string;
  img: string;
  toolsUse: string[];
}

export const projects: ProjectsData[] = [
  {
    id: 1,
    name: "Proyecto Alcance",
    caseContent: "This is a case study about Project Alpha.",
    link: "https://proyectoalcance.org",
    img: "/screenshots/alcance.png",
    toolsUse: ["Wix Studios"],
  },
  {
    id: 2,
    name: "Regreso a Casa",
    caseContent: "This is a case study about Project Beta.",
    link: "https://yoregresoacasa.org",
    img: "/screenshots/RAC.png",
    toolsUse: ["React", "Vite", "Firebase"],
  },
  {
    id: 3,
    name: "Yaya Ai",
    caseContent: "This is a case study about Project Gamma.",
    link: "https://yayaai.vercel.app/",
    img: "/screenshots/yaya.png",
    toolsUse: ["React", "NextJs", "Firebase", "TailwindCSS"],
  },
];
