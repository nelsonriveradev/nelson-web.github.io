"use client";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  ClerkProvider,
  SignUpButton,
  SignedIn,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { useState } from "react";
// interface NavBarProps {
//   user: string | null;
// }
export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex">
      {/* mobile menubar */}
      <div
        className={`fixed rounded-2xl top-2 left-[15%] w-[70%] h-fit px-1 py-4 bg-zinc-200 z-50  md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="">
          <div className="flex  flex-col items-center gap-x-2">
            <Link href={"/"} prefetch={true}>
              <h1 className="text-lg font-bold text-zinc-800 text-bold    ">
                Nelson Rivera
              </h1>
            </Link>
          </div>
          <div className="mt-4">
            <ul className="flex flex-col items-center gap-y-3 ">
              <li>
                <Link
                  prefetch={true}
                  href="/Reservar"
                  className="text-zinc-800 text-lg"
                >
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
          <div className="hover:transform hover:scale-110 transition-transform ease-in-out">
            <ClerkProvider>
              {isSignedIn ? (
                <SignedIn>
                  <div
                    className="mx-auto mt-6 text-center scale-170
                  "
                  >
                    <UserButton />
                  </div>
                </SignedIn>
              ) : (
                <div className="text-center w-[50%] mx-auto mt-4 text-zinc-200 bg-zinc-800 text-lg px-2 py-1 rounded-lg">
                  <SignUpButton />
                </div>
              )}
            </ClerkProvider>
          </div>
        </div>
      </div>
      <div className="absolute md:hidden right-4 top-4">
        <button onClick={handleOpen}>
          {isOpen ? (
            <Image
              src="/Icons/icons8-cancel-100.png"
              alt="cancel button"
              width={40}
              height={40}
            />
          ) : (
            <Image
              src="/Icons/icons8-hamburger-button-100.png"
              alt="Mobile menu bar"
              width={40}
              height={40}
            />
          )}
        </button>
      </div>
      <nav className="hidden md:flex  items-center justify-between h-14 py-4 px-6 bg-zinc-300 w-1/2 mx-auto mt-8 rounded-2xl ">
        <div className="flex items-center gap-x-2">
          <Link href={"/"} prefetch={true}>
            <Avatar className="w-18 h-18 border-4 border-zinc-400">
              <AvatarImage
                className="object-cover"
                src="https://cifrerlklfctbkammxhi.supabase.co/storage/v1/object/public/photos//nelson_1.jpg"
                alt="Nelson Rivera"
              />
              <AvatarFallback className="text-zinc-800">NR</AvatarFallback>
            </Avatar>
          </Link>
          <h1 className="text-lg font-bold text-zinc-800 text-bold    ">
            Nelson Rivera
          </h1>
        </div>
        <div className="flex items-center">
          <ul className="flex items-center space-x-6">
            <li>
              <Link
                prefetch={true}
                href="/Reservar"
                className="text-zinc-800 text-lg"
              >
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
        <div className="hover:transform hover:scale-110 transition-transform ease-in-out">
          <ClerkProvider>
            {isSignedIn ? (
              <SignedIn>
                <UserButton />
              </SignedIn>
            ) : (
              <div className="text-zinc-200 bg-zinc-800 text-lg px-2 py-1 rounded-lg">
                <SignUpButton />
              </div>
            )}
          </ClerkProvider>
        </div>
      </nav>
    </div>
  );
}
