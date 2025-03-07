import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavBar() {
  return (
    <div className="flex">
      <nav className="flex items-center justify-between h-14 py-4 px-6 bg-zinc-300 w-1/2 mx-auto mt-8 rounded-2xl ">
        <div className="flex items-center gap-x-2">
          <Avatar className="w-18 h-18 border-4 border-zinc-400">
            <AvatarImage
              className="object-cover"
              src="/images/nelson_rivera.jpg"
              alt="Nelson Rivera"
            />
          </Avatar>
          <h1 className="text-lg font-bold text-zinc-800">Nelson Rivera</h1>
        </div>
        <div className="flex items-center">
          <ul className="flex items-center space-x-6">
            <li>
              <a href="#about" className="text-zinc-800 text-lg">
                Sobre mi
              </a>
            </li>
            <li>
              <a href="/proyectos" className="text-zinc-800 text-lg">
                Proyectos
              </a>
            </li>
            <li>
              <a href="#contact" className="text-zinc-800 text-lg">
                Contacto
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
