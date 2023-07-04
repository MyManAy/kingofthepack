"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import MagicCard from "./components/MagicCard/MagicCard";
import ProtectedLayout from "./components/ProtectedLayout";
import GreenButton from "./components/GreenButton";

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
    <ProtectedLayout>
      <div className="flex flex-col gap-10 justify-center align-middle">
        <div className="h-[65vh] w-[calc(65vh/1.5)] text-4xl">
          <MagicCard />
        </div>
        {/* <StripeCheckout /> */}
        <div className="flex flex-col gap-5 justify-center align-middle">
          <GreenButton text="Packs" route="/packs" />
          <GreenButton text="Collections" route="/collections" />
        </div>
      </div>
    </ProtectedLayout>
  );
};
