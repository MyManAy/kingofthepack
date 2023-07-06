import { IAppProps } from "@/app/components/CollectionCard/CollectionCard";
import { supabase } from "@/app/utils/supabase";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const setId = searchParams.get("setId");
  const email = "nithinmonni@gmail.com";

  const { data: set } = await supabase
    .from("set")
    .select(
      `
        name,
        weighting (
          rarity,
          weighting
        ),
        card (
          *
        )
  `
    )
    .eq("id", setId!)
    .single();

  const { card, weighting, name } = set!;
  const totalCards = card.length;
  const setName = name;

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

  let cardsCollected = 0;
  let propWithCount: IAppProps[] = [];
  for (const prop of card) {
    const count = ids.filter((id) => id === prop.id).length;
    if (count > 0) cardsCollected++;
    propWithCount.push({ ...prop, count: count });
  }
  const getWeightingFromRarity = (rarity: string) =>
    weighting.find((item) => item.rarity === rarity);
  const sorted = propWithCount.sort(
    (a, b) =>
      getWeightingFromRarity(b.rarity)!.weighting -
      getWeightingFromRarity(a.rarity)!.weighting
  );
  const cardProps = sorted;

  return NextResponse.json({ setName, totalCards, cardsCollected, cardProps });
  // return NextResponse.json({
  //   setName: "bla",
  //   totalCards: 10,
  //   cardsCollected: 5,
  //   cardProps: ["nothing"],
  // });
}
