import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db/dbConfig";
import { user as userTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const object = event.data.object;

  console.log(`[STRIPE_WEBHOOK] Received event: ${event.type}`);

  if (event.type === "checkout.session.completed") {
    const session = object as Stripe.Checkout.Session;
    
    if (!session.subscription) {
        console.error("[STRIPE_WEBHOOK] No subscription found in checkout session");
        return new NextResponse("Subscription is required", { status: 400 });
    }

    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      console.error("[STRIPE_WEBHOOK] User id is missing in session metadata");
      return new NextResponse("User id is required", { status: 400 });
    }

    console.log(`[STRIPE_WEBHOOK] Updating user ${session.metadata.userId} to pro plan`);

    const result = await db.update(userTable)
      .set({
        plan: "pro",
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
      })
      .where(eq(userTable.id, session.metadata.userId));
      
    console.log(`[STRIPE_WEBHOOK] Database update result:`, result);
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = object as Stripe.Invoice & { subscription?: string };
    
    if (!invoice.subscription) {
        console.log("[STRIPE_WEBHOOK] Invoice has no subscription, skipping");
        return new NextResponse(null, { status: 200 });
    }

    const subscription = await stripe.subscriptions.retrieve(
      invoice.subscription as string
    );

    console.log(`[STRIPE_WEBHOOK] Handling payment_succeeded for subscription: ${subscription.id}`);

    const result = await db.update(userTable)
      .set({
        plan: "pro",
        stripeSubscriptionId: subscription.id,
      })
      .where(eq(userTable.stripeSubscriptionId, subscription.id));
      
    console.log(`[STRIPE_WEBHOOK] Database update result:`, result);
  }

  return new NextResponse(null, { status: 200 });
}
