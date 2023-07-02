import Stripe from "stripe";
import { headers } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";
import { supabase } from "@/app/utils/supabase";
import { randomCardId, randomRarity } from "@/app/utils/weightedRandom";

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
    case "checkout.session.completed": {
      const checkoutSession: any = event.data.object;
      const sessionId = checkoutSession.id;
      const email = checkoutSession.customer_details.email;
      const expandedSession = await stripe.checkout.sessions.retrieve(
        sessionId,
        {
          expand: ["line_items"],
        }
      );
      const productId =
        expandedSession.line_items?.data[0].price?.product.toString();
      const { data: pack } = await supabase
        .from("pack")
        .select(
          `
        id, 
        totalCards, 
          set (
            weighting (
              rarity,
              weighting
            ),
            card (
              id,
              rarity
            )
          )
        `
        )
        .eq("stripeProductId", productId)
        .single();

      const { id: packId, totalCards } = pack!;
      const { weighting: weightings, card: cards } = pack!.set!;

      const gen = randomRarity(weightings);
      let randomIds: number[] = [];
      for (let i = 0; i < totalCards; i++) {
        const randomId = randomCardId(cards, gen);
        randomIds.push(randomId);
      }

      const { data: openedPack } = await supabase
        .from("openedPack")
        .insert({ packId: packId, userEmail: email })
        .select("id")
        .single();
      console.log(openedPack);

      const randomCCs = randomIds.map((id) => ({
        cardId: id,
        openedPackId: openedPack!.id,
      }));
      const { data: circulationCard } = await supabase
        .from("circulationCard")
        .insert(randomCCs)
        .select("*");
      console.log(circulationCard);
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent: any = event.data.object;
      console.log(
        `❌ Payment failed: ${paymentIntent.last_payment_error?.message}`
      );
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
