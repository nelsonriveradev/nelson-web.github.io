import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Verify the webhook secret (VERY IMPORTANT!)
    const webhookSecret = req.headers["supabase-webhook-secret"];
    if (webhookSecret !== process.env.NEXT_PUBLIC_SUPABASE_WEBHOOK_SECRET) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    try {
      const { record } = req.body;

      // Extract data from the Supabase record
      const { name, email, message } = record;

      // Nodemailer setup
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Email content
      const mailOptions = {
        from: "nelsonrivera.dev@gmail.com",
        to: "nelsonrivera.dev@gmail.com", // Your email address
        subject: "New Contact Form Submission From my Website",
        text: `
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `,
      };

      // Send the email
      await transporter.sendMail(mailOptions);

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ error: "Error sending email" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
