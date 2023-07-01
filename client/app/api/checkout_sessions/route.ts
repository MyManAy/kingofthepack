import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const errorLink = "https://kingofthepack.vercel.app/404";
const originLink = "https://kingofthepack.vercel.app";
const priceId = "price_1NN46cGNnS1hfAQ8NsELjKSB";

export async function POST(req: Request, res: Response) {
  // const { data: pack } = await supabase
  //   .from("pack")
  //   .select("id")
  //   .eq("name", "polygon booster pack");
  // const packId = pack?.[0].id;

  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${originLink}?succeded=true}`,
      cancel_url: `${originLink}?canceled=true`,
    });
    console.log("worked this is the test");
    return NextResponse.json({ recieved: true });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: (err as any).message,
      status: (err as any).statusCode || 500,
    });
  }
}
