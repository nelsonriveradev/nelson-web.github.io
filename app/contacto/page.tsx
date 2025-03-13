"use client";
import ContactForm from "../Components/ContactForm";
export default function Contacto() {
  return (
    <div className="">
      <h1 className="text-4xl font-bold text-center mt-8">Contacto</h1>
      <div className="flex flex-col items-center justify-center mt-8">
        <p className="text-lg text-center">
          Si deseas contactarme, puedes hacerlo a través de mi correo
          electrónico:
        </p>
        {/* Contact Form */}

        <ContactForm />
      </div>
    </div>
  );
}
