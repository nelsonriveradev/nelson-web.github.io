import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SocialsLinks() {
  return (
    <div className="flex items-center justify-center gap-x-4">
      <Link href="">
        <Avatar>
          <AvatarImage
            className="object-cover"
            src="/Icons/icons8-instagram-logo-96.png"
          />
        </Avatar>
      </Link>
      <Link href="">
        <Avatar>
          <AvatarImage
            className="object-cover"
            src="/Icons/icons8-linkedin-96.png"
          />
        </Avatar>
      </Link>
      <Link href="">
        <Avatar>
          <AvatarImage
            className="object-cover"
            src="/Icons/icons8-twitter-100.png"
          />
        </Avatar>
      </Link>
    </div>
  );
}
