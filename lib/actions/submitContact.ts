import { createClient } from "@/utils/supabase/server";
import { ContactFormData } from "@/app/Components/ContactForm";

export async function submitContact(dataForm: ContactFormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("ContactForm")
    .insert([
      {
        name: dataForm.name,
        email: dataForm.email,
        message: dataForm.message,
      },
    ])
    .select();
  if (error) {
    return { error };
  }
}
