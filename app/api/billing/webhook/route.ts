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

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    if (!session?.metadata?.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    await db.update(userTable)
      .set({
        plan: "pro",
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
      })
      .where(eq(userTable.id, session.metadata.userId));
  }

  if (event.type === "invoice.payment_succeeded") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    await db.update(userTable)
      .set({
        plan: "pro",
        stripeSubscriptionId: subscription.id,
      })
      .where(eq(userTable.stripeSubscriptionId, subscription.id));
  }

  return new NextResponse(null, { status: 200 });
}
