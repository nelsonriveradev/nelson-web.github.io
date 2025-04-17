import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!;

// Puedes tener varios price_id para cada paquete
const PRICE_IDS = {
  essentials: "price_1P0abc123XYZ",
  media: "price_1P0def456XYZ",
  premium: "price_1P0ghi789XYZ",
};

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-03-31.basil",
});

export async function POST(request: Request) {
  const { packageType } = await request.json();
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });

  // Valida el paquete recibido
  const priceId = PRICE_IDS[packageType as keyof typeof PRICE_IDS];
  if (!priceId) {
    return NextResponse.json(
      { error: "Invalid package type" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "https://tudominio.com/success",
      cancel_url: "https://tudominio.com/cancel",
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
