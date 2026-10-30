import type { Metadata } from "next";
import ContactSection from "../Components/ContactSection";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbeme para conversar sobre tu próximo sitio web, aplicación o colaboración.",
};

export default function Contacto() {
  return (
    <div className="pt-16">
      <ContactSection headingLevel="h1" />
    </div>
  );
}
