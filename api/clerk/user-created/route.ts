import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

// ENV VARIABLES
const CLERK_WEBHOOK_SIGNING_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;

if (
  !CLERK_WEBHOOK_SIGNING_SECRET ||
  !STRIPE_SECRET_KEY ||
  !SUPABASE_URL ||
  !SUPABASE_SERVICE_ROLE_KEY
) {
  console.error("Missing required environment variables!");
}

// Stripe client
const stripe = new Stripe(STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

// Supabase admin client
const supabaseAdmin = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!, {
  auth: { persistSession: false },
});

// Webhook handler
export async function POST(request: Request) {
  if (!CLERK_WEBHOOK_SIGNING_SECRET) {
    return NextResponse.json(
      { error: "Webhook secret not configured." },
      { status: 500 }
    );
  }

  // Get Svix headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id") as string | null;
  const svix_timestamp = headerPayload.get("svix-timestamp") as string | null;
  const svix_signature = headerPayload.get("svix-signature") as string | null;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json(
      { error: "Missing required webhook headers" },
      { status: 400 }
    );
  }

  // Verify Clerk webhook
  const payload = await request.text();
  const webhookVerifier = new Webhook(CLERK_WEBHOOK_SIGNING_SECRET);

  let webhookEvent: WebhookEvent;
  try {
    webhookEvent = webhookVerifier.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error: any) {
    return NextResponse.json(
      { error: `Webhook verification failed: ${error.message}` },
      { status: 400 }
    );
  }

  // Only handle user.created event
  if (webhookEvent.type === "user.created") {
    const {
      id: userId,
      email_addresses,
      first_name,
      last_name,
      image_url,
      primary_email_address_id,
    } = webhookEvent.data;

    // Find primary email
    const primaryEmail = email_addresses?.find(
      (email) => email.id === primary_email_address_id
    )?.email_address;

    if (!primaryEmail) {
      return NextResponse.json(
        { error: "User created without a primary email address" },
        { status: 400 }
      );
    }

    try {
      // Create Stripe customer
      const stripeCustomer = await stripe.customers.create({
        email: primaryEmail,
        name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
        metadata: {
          clerk_user_id: userId,
        },
      });

      // Upsert user in Supabase
      const { data: upsertedUser, error: supabaseError } = await supabaseAdmin
        .from("users")
        .upsert(
          {
            clerk_id: userId,
            email: primaryEmail,
            stripe_customer_id: stripeCustomer.id,
            name: `${first_name} ${last_name}`,
            image_url: image_url ?? null,
          },
          { onConflict: "clerk_id" }
        )
        .select()
        .single();

      if (supabaseError) {
        return NextResponse.json(
          { error: `Supabase error: ${supabaseError.message}` },
          { status: 500 }
        );
      }

      // (Optional) Send welcome email, etc.

      return NextResponse.json(
        { received: true, user: upsertedUser },
        { status: 200 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { error: `Internal server error: ${error.message}` },
        { status: 500 }
      );
    }
  }

  // For other events, just acknowledge
  return NextResponse.json({ received: true }, { status: 200 });
}
