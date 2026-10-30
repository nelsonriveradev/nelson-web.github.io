import {
  Atom,
  Braces,
  Code2,
  Database,
  Flame,
  GitBranch,
  Layers,
  Wind,
} from "lucide-react";

const skills = [
  {
    name: "React",
    icon: Atom,
    description:
      "Un año de experiencia construyendo interfaces con componentes reutilizables.",
  },
  {
    name: "Next.js",
    icon: Layers,
    description:
      "Mi framework principal para crear aplicaciones full-stack modernas con React.",
  },
  {
    name: "TypeScript",
    icon: Braces,
    description:
      "Tipado estático para escribir código más seguro y mantenible.",
  },
  {
    name: "Tailwind CSS",
    icon: Wind,
    description:
      "Diseños responsive y consistentes directamente desde las clases utilitarias.",
  },
  {
    name: "JavaScript",
    icon: Code2,
    description:
      "El lenguaje que uso a diario para dar interactividad a los proyectos.",
  },
  {
    name: "Supabase",
    icon: Database,
    description:
      "Base de datos, autenticación y storage para aplicaciones modernas.",
  },
  {
    name: "Firebase",
    icon: Flame,
    description:
      "Backend en tiempo real y autenticación para prototipos y productos.",
  },
  {
    name: "Git",
    icon: GitBranch,
    description:
      "Control de versiones y trabajo colaborativo en cada proyecto.",
  },
];

type SkillsProps = {
  className?: string;
};

export default function Skills({ className = "" }: SkillsProps) {
  return (
    <ul className={`grid grid-cols-2 gap-3 sm:grid-cols-3 ${className}`}>
      {skills.map((skill) => {
        const Icon = skill.icon;

        return (
          <li key={skill.name}>
            <div
              title={skill.description}
              className="group flex h-full items-center gap-2.5 rounded-xl border border-transparent bg-muted px-3 py-3 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 hover:border-sage/60 hover:bg-primary hover:text-primary-foreground"
            >
              <Icon
                className="size-4 shrink-0 text-primary transition-colors group-hover:text-primary-foreground"
                aria-hidden="true"
              />
              <span>{skill.name}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
