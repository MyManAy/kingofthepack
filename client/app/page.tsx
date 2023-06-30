"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import MagicCard from "./components/MagicCard/MagicCard";
import StripeCheckout from "./components/StripeCheckout";
import { getAllCards } from "./utils/weightedRandom";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default () => {
  React.useEffect(() => {
    getAllCards();
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
      {/* <TradingCard rarity="Common" src={Chicken} animalName="Chicken" />
      <TradingCard rarity="Common" src={Rabbit} animalName="Rabbit" />
      <TradingCard rarity="Common" src={Rat} animalName="Rat" />
      <TradingCard
        rarity="Common"
        src={Horse1}
        animalName="Horse"
        variation={1}
        totalVariations={2}
      />
      <TradingCard rarity="Common" src={Goat} animalName="Goat" />
      <TradingCard
        rarity="Common"
        src={Horse2}
        animalName="Horse"
        variation={2}
        totalVariations={2}
      />
      <TradingCard rarity="Rare" src={Deer} animalName="Deer" />
      <TradingCard
        rarity="Rare"
        src={Cat1}
        animalName="Cat"
        variation={1}
        totalVariations={2}
      />
      <TradingCard
        rarity="Rare"
        src={Cat2}
        animalName="Cat"
        variation={2}
        totalVariations={2}
      />
      <TradingCard rarity="Rare" src={Cow} animalName="Cow" />
      <TradingCard
        rarity="Rare"
        src={Dog1}
        animalName="Dog"
        variation={1}
        totalVariations={2}
      />
      <TradingCard
        rarity="Rare"
        src={Dog2}
        animalName="Dog"
        variation={2}
        totalVariations={2}
      />
      <TradingCard rarity="Epic" src={Tiger} animalName="Tiger" />
      <TradingCard rarity="Epic" src={Elephant} animalName="Elephant" />
      <TradingCard
        rarity="Epic"
        src={Dolphin1}
        animalName="Dolphin"
        variation={1}
        totalVariations={2}
      />
      <TradingCard
        rarity="Epic"
        src={Dolphin2}
        animalName="Dolphin"
        variation={2}
        totalVariations={2}
      />
      <TradingCard rarity="Golden" src={Lion} animalName="Lion" />
      <TradingCard
        rarity="Golden"
        src={Eagle1}
        animalName="Eagle"
        variation={1}
        totalVariations={2}
      />
      <TradingCard
        rarity="Golden"
        src={Eagle2}
        animalName="Eagle"
        variation={2}
        totalVariations={2}
      />
      <TradingCard
        rarity="King of the Pack"
        src={ScarletMacaw}
        animalName="Scarlet Macaw"
      /> */}
    </div>
  );
};
