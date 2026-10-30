import { Github, Mail } from "lucide-react";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/nelsonriveradev",
    icon: Github,
    external: true,
  },
  {
    label: "Enviar un correo",
    href: "mailto:nelsonrivera.dev@gmail.com",
    icon: Mail,
    external: false,
  },
];

type SocialsLinksProps = {
  className?: string;
};

export default function SocialsLinks({ className = "" }: SocialsLinksProps) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {socials.map((social) => {
        const Icon = social.icon;

        return (
          <li key={social.label}>
            <a
              href={social.href}
              target={social.external ? "_blank" : undefined}
              rel={social.external ? "noopener noreferrer" : undefined}
              aria-label={social.label}
              className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-mint transition-all duration-300 hover:-translate-y-1 hover:border-sage hover:bg-sage hover:text-charcoal"
            >
              <Icon className="size-5" aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
