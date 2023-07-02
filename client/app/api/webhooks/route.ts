import Stripe from "stripe";
import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase";

const originLink = "https://kingofthepack.vercel.app";

const stripe: Stripe = new (Stripe as any)(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

export async function POST(req: Request, res: any) {
  const text = await req.text();
  const headersList = headers();
  const stripeSignature = headersList.get("Stripe-Signature");

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      text,
      stripeSignature!,
      webhookSecret!
    );
  } catch (err) {
    // On error, log and return the error message.
    console.log(`❌ Error message: ${(err as any).message}`);
    res.status(400).send(`Webhook Error: ${(err as any).message}`);
    return;
  }

  // Successfully constructed event.
  console.log("✅ Success:", event.id);

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent: any = event.data.object;
      const id = paymentIntent.id;
      stripe.paymentIntents.retrieve(id, { expand: ["pa"] });
      console.log(
        `PaymentIntent success: ${JSON.stringify(paymentIntent.id, null, 4)}`
      );
      break;
    }
    case "checkout.session.completed": {
      const checkoutSession: any = event.data.object;
      const id = checkoutSession.id;
      const smth = await stripe.checkout.sessions.retrieve(id);
      console.log(`Checkout Session: ${JSON.stringify(smth, null, 4)}`);
    }
    case "payment_intent.payment_failed": {
      const paymentIntent: any = event.data.object;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
      break;
    }
    case "charge.succeeded": {
      // await supabase.from("openedPack").insert({})
      // const { data: openedPack } = await supabase
      //         .from("openedPack")
      //         .select(
      //           `pack (
      //         totalCards,
      //         set (
      //           weighting (
      //             rarity,
      //             weighting
      //           ),
      //           card (
      //             src,
      //             animalName,
      //             rarity,
      //             variation,
      //             totalVariations
      //           )
      //         )
      //       )`
      //         )
      //         .eq("id", payload.new.id)
      //         .single();
      //       console.log(openedPack);
      const { data: pack } = await supabase
        .from("pack")
        .select("id")
        .eq("name", "polygon booster pack");
      const packId = pack?.[0].id;
      console.log(packId);
      const charge: any = event.data.object;
      console.log(`Charge id: ${JSON.stringify(charge, null, 4)}`);
      break;
    }
    default: {
      console.warn(`Unhandled event type: ${event.type}`);
      break;
    }
  }
  return NextResponse.json({
    recieved: true,
  });
}
