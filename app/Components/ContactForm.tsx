"use client";

import { createClient } from "@/utils/supabase/client";
import { FormEvent, useState } from "react";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface FormState {
  message: string;
  success: boolean;
  error: boolean;
  isSubmitting: boolean;
}

export default function ContactForm() {
  // Form state management
  const [formState, setFormState] = useState<FormState>({
    message: "",
    success: false,
    error: false,
    isSubmitting: false,
  });

  // Form data state
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });

  // Handle input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      const supabase = createClient();

      // Basic input sanitization (example)
      const sanitizedName = formData.name.trim();
      const sanitizedEmail = formData.email.trim();
      const sanitizedMessage = formData.message.trim();

      // Email validation (basic)
      if (!isValidEmail(sanitizedEmail)) {
        throw new Error("Invalid email format");
      }

      const { error } = await supabase.from("ContactForm").insert({
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
      });

      if (error) throw error;

      // Reset form data
      setFormData({
        name: "",
        email: "",
        message: "",
      });

      // Reset form
      (e.target as HTMLFormElement).reset();

      setFormState({
        message: "Mensaje enviado con éxito",
        success: true,
        error: false,
        isSubmitting: false,
      });
    } catch (error: any) {
      console.error(error);
      setFormState({
        message:
          error.message || "Error al enviar el mensaje. Intente nuevamente.",
        success: false,
        error: true,
        isSubmitting: false,
      });
    } finally {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  // Basic email validation function
  const isValidEmail = (email: string): boolean => {
    // A more robust email validation library is recommended for production
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="p-6 w-[60%] rounded-2xl bg-zinc-700">
      {formState.error && (
        <p className="text-red-500 mb-4">{formState.message}</p>
      )}
      {formState.success && (
        <p className="text-green-500 mb-4">{formState.message}</p>
      )}

      <form
        className="flex flex-col gap-y-2 items-center"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col w-full">
          <label htmlFor="name">Nombre:</label>
          <input
            className="border-2 border-zinc-400 rounded-md px-2 py-1"
            type="text"
            id="name"
            name="name"
            placeholder="Juan Del Pueblo"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="email">Email:</label>
          <input
            className="border-2 border-zinc-400 rounded-md px-2 py-1"
            type="email"
            id="email"
            name="email"
            placeholder="correo@electronico.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="message">Mensaje:</label>
          <textarea
            className="border-2 border-zinc-400 rounded-md px-2 py-1 w-[full]"
            id="message"
            name="message"
            placeholder="Escribe tu mensaje..."
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button
          className="mt-2 border-2 border-zinc-200 px-2 py-1 rounded-md disabled:opacity-50"
          type="submit"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
