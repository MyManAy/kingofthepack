"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import MagicCard from "./components/MagicCard/MagicCard";
import StripeCheckout from "./components/StripeCheckout";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default () => {
  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <div className="flex flex-col gap-10 justify-center align-middle">
      <MagicCard />
      <StripeCheckout />
    </div>
  );
};
