import Stripe from "stripe";
import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase";
import { useRouter } from "next/navigation";

const originLink = "https://kingofthepack.vercel.app";

const stripe: Stripe = new (Stripe as any)(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

export async function POST(req: Request, res: any) {
  const router = useRouter();
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
      console.log(`PaymentIntent status: ${paymentIntent.status}`);
    }
    case "payment_intent.payment_failed": {
      const paymentIntent: any = event.data.object;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
      break;
    }
    case "charge.succeeded": {
      const { data: pack } = await supabase
        .from("pack")
        .select("id")
        .eq("name", "polygon booster pack");
      const packId = pack?.[0].id;

      const charge: any = event.data.object;
      console.log(`Charge id: ${charge.id}`);

      router.push("/pack");
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
