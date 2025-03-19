import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface SkillBadgeProps {
  name: string;
  icon: string;
  description: string;
}

export default function SkillBadge({
  name,
  icon,
  description,
}: SkillBadgeProps) {
  return (
    <div className="">
      <HoverCard>
        <HoverCardTrigger>
          <Badge className="px-2 py-1 bg-zinc-200 text-zinc-800 text-md cursor-pointer max-w-fit-content transition-all ease-in-out transform hover:scale-110">
            <Image src={icon} width={50} height={50} alt={name} />
          </Badge>
        </HoverCardTrigger>
        <HoverCardContent className="bg-zinc-200 text-zinc-800">
          {description}
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}
