"use client";

import { useSearchParams } from "next/navigation";
import CollectionCard from "@/app/components/CollectionCard/CollectionCard";
import "./page.css";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { IAppProps } from "@/app/components/CollectionCard/CollectionCard";
import emailMinify from "../utils/minifyEmail";

export default function App() {
  const searchParams = useSearchParams();
  const setId = searchParams.get("setId");
  const name = searchParams.get("name");
  const [cardProps, setCardProps] = useState(null as null | IAppProps[]);
  const [email, setEmail] = useState(null as null | string);
  const [totalCards, setTotalCards] = useState(null as null | number);
  const [cardsCollected, setCardsCollected] = useState(0 as number);

  const getCardProps = async () => {
    const { data: set } = await supabase
      .from("set")
      .select(
        `
        weighting (
          rarity,
          weighting
        ),
        card (
          *
        )
  `
      )
      .eq("id", setId)
      .single();

    const cards = set!.card;
    setTotalCards(cards.length);
    const weightings = set!.weighting;
    console.log(JSON.stringify(cards, null, 4));

    const { data: userCardIds } = await supabase
      .from("user")
      .select(
        `
      openedPack (
        circulationCard (
          card (
            id
          )
        )
      )
   `
      )
      .eq("email", email)
      .single();

    const ids = userCardIds!.openedPack.flatMap((op) =>
      op.circulationCard.flatMap((cc) => cc.card!.id)
    );
    console.log(ids);

    let propWithCount: IAppProps[] = [];
    for (const prop of cards) {
      const count = ids.filter((id) => id === prop.id).length;
      if (count > 0) setCardsCollected((cardsCol) => cardsCol + 1);
      propWithCount.push({ ...prop, count: count });
    }
    const getWeightingFromRarity = (rarity: string) =>
      weightings.find((item) => item.rarity === rarity);
    const sorted = propWithCount.sort(
      (a, b) =>
        getWeightingFromRarity(b.rarity)!.weighting -
        getWeightingFromRarity(a.rarity)!.weighting
    );
    setCardProps(sorted);
  };

  const getMinifiedEmail = async () => {
    const { data } = await supabase.auth.getUser();
    const userEmail = data.user?.email!;
    setEmail(emailMinify(userEmail));
  };

  useEffect(() => {
    getMinifiedEmail();
  }, []);

  useEffect(() => {
    if (email) getCardProps();
  }, [email]);

  return (
    <>
      <div className={"grid grid-cols-[1fr_4fr_1fr] w-full mb-10"}>
        <div></div>
        <div className={"text-white font-bold text-4xl text-center m-auto"}>
          {name}
        </div>
        <div className="flex flex-col justify-center">
          <div
            className={
              "text-white opacity-60 font-bold text-xl text-center m-auto"
            }
          >
            total cards: {totalCards}
          </div>
          <div
            className={
              "text-white opacity-60 font-bold text-xl text-center m-auto"
            }
          >
            cards collected: {cardsCollected}
          </div>
        </div>
      </div>
      <div className={"flex flex-row flex-wrap justify-center"}>
        {cardProps &&
          cardProps.map((item, index) => (
            <div className={"p-5"}>
              <CollectionCard {...item} key={index} />
            </div>
          ))}
      </div>
    </>
  );
}
