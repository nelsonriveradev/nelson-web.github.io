import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function NavBar() {
  const { userId } = await auth();

  return (
    <div className="flex">
      <nav className="flex items-center justify-between h-14 py-4 px-6 bg-zinc-300 w-1/2 mx-auto mt-8 rounded-2xl ">
        <div className="flex items-center gap-x-2">
          <Link href={"/"} prefetch={true}>
            <Avatar className="w-18 h-18 border-4 border-zinc-400">
              <AvatarImage
                className="object-cover"
                src="/images/nelson_rivera.jpg"
                alt="Nelson Rivera"
              />
            </Avatar>
          </Link>
          <h1 className="text-lg font-bold text-zinc-800">Nelson Rivera</h1>
        </div>
        <div className="flex items-center">
          <ul className="flex items-center space-x-6">
            <li>
              <Link prefetch={true} href="/" className="text-zinc-800 text-lg">
                Reserva Cita
              </Link>
            </li>
            <li>
              <Link
                prefetch={true}
                href="/proyectos"
                className="text-zinc-800 text-lg"
              >
                Proyectos
              </Link>
            </li>
            <li>
              <Link
                prefetch={true}
                href="/contacto"
                className="text-zinc-800 text-lg"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </div>
        <div className="">
          <ClerkProvider>
            {userId ? (
              <SignedIn>
                <UserButton />
              </SignedIn>
            ) : (
              <SignUpButton className="text-zinc-200 bg-zinc-800 text-lg px-2 py-1 rounded-lg" />
            )}
          </ClerkProvider>
        </div>
      </nav>
    </div>
  );
}
