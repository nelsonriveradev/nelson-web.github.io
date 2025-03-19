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
    description:
      "Esta herramienta es la que mayor estoy utilizando actualmente ya que se integra React y es un framework completo y moderno que puedo usar mi proyecto Yaya AI se basa en Next.js",
  },
  {
    name: "Firebase",
    icon: "/Icons/dev/icons8-firebase-aFirebase-96.png",
    description:
      "Este backend es el que utilizo cuando necesito una base de datos en tiempo real o una autenticación de usuario y puedo manejar mi data de forma flexible.",
  },
  {
    name: "Tailwind CSS",
    icon: "/Icons/dev/icons8-tailwind-css-96.png",
    description:
      "Ultimamente he estado utilizando Tailwind CSS para mis proyectos ya que me permite hacer un diseño responsive y moderno de forma rápida y sencilla, y sobre todo no crear tantos archivos de estilo.",
  },
  {
    name: "JavaScript",
    icon: "/Icons/dev/icons8-javascript-96.png",
    description:
      "Aunque al principio me reusaba en aprender javascript, ahora lo utilizo en mis proyectos para hacerlos más dinámicos y atractivos. No es hasta que empecé a trabajar con React que me di cuenta de la importancia de este lenguaje. En estos momentos me encuentro aprendiendo TypeScript.",
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
