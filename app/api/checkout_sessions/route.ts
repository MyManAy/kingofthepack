import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const errorLink = "http://localhost:3000/404";
const originLink = "http://localhost:3000";
const priceId = "price_1NN69cGNnS1hfAQ8TEoSYNG0";

export async function POST(req: Request, res: Response) {
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
      success_url: `${originLink}/?success=true`,
      cancel_url: `${originLink}/?canceled=true`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      message: (err as any).message,
      status: (err as any).statusCode || 500,
    });
  }
}
