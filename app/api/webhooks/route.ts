import Stripe from "stripe";
import { env } from "node:process";
import { buffer } from "micro";

const stripe: Stripe = new (Stripe as any)(env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: any, res: any) {
  const buf = await buffer(req);
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      signature,
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
      break;
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

  // Return a response to acknowledge receipt of the event.
  res.json({ received: true });
}
