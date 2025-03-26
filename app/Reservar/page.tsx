//import CalendarComponent from "../Components/CalendarComponent";
//import getClerkCurrentUser from "../../lib/actions/clerk/actions";
import Image from "next/image";
import Link from "next/link";
export default async function ReservarPage() {
  //const user = await getClerkCurrentUser();
  return (
    <div>
      <div className=" mt-10 flex flex-col justify-center items-center mx-auto">
        <h1 className="text-4xl text-bold text-zinc-200">
          Esta página está en desarrollo...
        </h1>
        <Image
          src="/Illustration/pixeltrue-web-development.png"
          alt="developing illustration"
          width={400}
          height={400}
        />
        <p>
          Presiona{" "}
          <span>
            <Link
              className="text-zinc-200 underline cursor-pointer transition-all duration-100 ease-in-out rounded-md hover:no-underline hover:border-2 hover:p-1 hover:text-zinc-50"
              href="/"
              prefetch={true}
            >
              aquí
            </Link>{" "}
          </span>
          para volver a Inicio.
        </p>
      </div>

      {/* <CalendarComponent user={user} /> */}
    </div>
  );
}
