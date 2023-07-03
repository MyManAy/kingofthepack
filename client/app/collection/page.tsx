"use client";

import { useSearchParams } from "next/navigation";
import CollectionCard from "@/app/components/CollectionCard/CollectionCard";
import "./page.css";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { IAppProps } from "@/app/components/CollectionCard/CollectionCard";

export default function App() {
  const searchParams = useSearchParams();
  const [cardProps, setCardProps] = useState(null as null | IAppProps[]);
  const setId = searchParams.get("setId");
  const name = searchParams.get("name");

  const idk = async () => {
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
      .eq("email", "nithin.monni@gmail.com")
      .single();

    const ids = userCardIds!.openedPack.flatMap((op) =>
      op.circulationCard.flatMap((cc) => cc.card!.id)
    );
    console.log(ids);

    let propWithCount: IAppProps[] = [];
    for (const prop of cards) {
      const count = ids.filter((id) => id === prop.id).length;
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

  useEffect(() => {
    idk();
  }, []);
  return (
    <>
      <div className={"text-white font-bold text-4xl mb-10"}>{name}</div>
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