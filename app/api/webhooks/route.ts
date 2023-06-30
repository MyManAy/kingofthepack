import Stripe from "stripe";
import { firestore } from "../../utils/firebase";
import { addDoc, collection } from "firebase/firestore";
import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

const stripe: Stripe = new (Stripe as any)(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

const usersCollection = collection(firestore, "users");
const add = async () => {
  console.log("yes");
  addDoc(usersCollection, {
    name: "nithin",
    age: 17,
  });
};

export async function POST(req: Request, res: any) {
  const text = await req.text();
  const headersList = headers();
  const stripeSignature = headersList.get("Stripe-Signature");
  console.log(stripeSignature);

  // const payload = JSON.stringify(req.body, null, 2);

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
      await add();
      return NextResponse.redirect("https://kingofthepack.vercel.app/pack");
    }
    case "payment_intent.payment_failed": {
      const paymentIntent: any = event.data.object;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
      break;
    }
    case "charge.succeeded": {
      const charge: any = event.data.object;
      console.log(`Charge id: ${charge.id}`);
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
