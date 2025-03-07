import SkillBadge from "./SkillBadge";

type Skill = {
  name: string;
  icon: string;
  description: string;
};
const skills: Skill[] = [
  {
    name: "React",
    icon: "/Icons/dev/icons8-react-96.png",
    description:
      "Tengo un año de experiencia trabajando con React. Mi primer proyecto fue una pagina web de blog",
  },
  {
    name: "Next.js",
    icon: "/Icons/dev/nextjs.svg",
    description: "",
  },
  {
    name: "Firebase",
    icon: "/Icons/dev/icons8-firebase-aFirebase-96.png",
    description: "",
  },
  {
    name: "Tailwind CSS",
    icon: "/Icons/dev/icons8-tailwind-css-96.png",
    description: "",
  },
  {
    name: "JavaScript",
    icon: "/Icons/dev/icons8-javascript-96.png",
    description: "",
  },
];

export default function Skills() {
  return (
    <div className="flex items-center justify-center gap-x-4">
      {skills.map((skill) => (
        <SkillBadge
          key={skill.name}
          name={skill.name}
          icon={skill.icon}
          description={skill.description}
        />
      ))}
    </div>
  );
}
