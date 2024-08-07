import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const originLink = "https://kingofthepack.vercel.app";

export async function POST(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const priceId = searchParams.get("priceId");
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const userEmail = session?.user?.email;
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
      cancel_url: `${originLink}/packs`,
      customer_email: userEmail,
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
