import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const originLink = "https://kingofthepack.vercel.app";
const priceId = "price_1NN46cGNnS1hfAQ8NsELjKSB";

export async function POST(req: Request, res: Response) {
  req;
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
      success_url: `${originLink}/pack`,
      cancel_url: `${originLink}?canceled=true`,
    });
    console.log("worked this is the test");
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: (err as any).message,
      status: (err as any).statusCode || 500,
    });
  }
}
