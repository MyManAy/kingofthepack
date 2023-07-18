import CollectionCard from "@/app/components/CollectionCard/CollectionCard";
import "./page.css";
import { IAppProps } from "@/app/components/CollectionCard/CollectionCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/app/generated/types_db";
import emailMinify from "@/app/utils/minifyEmail";

export default async function App({ setId }: { setId: string }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getSession();
  const userEmail = data.session?.user.email;
  const email = emailMinify(userEmail!);

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

  let cardsCollected = 0;
  let cardProps: IAppProps[] = card.map((item) => ({ ...item, count: 0 }));
  if (userCardIds?.openedPack) {
    const ids = userCardIds?.openedPack.flatMap((op) =>
      op.circulationCard.flatMap((cc) => cc.card!.id)
    );
    if (ids.length > 0) {
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
      cardProps = sorted;
    }
  }

  return (
    <>
      <div className={"grid grid-cols-[1fr_4fr_1fr] w-full mb-10"}>
        <div></div>
        <div className={"text-white font-bold text-4xl text-center m-auto"}>
          {setName}
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
        {cardProps.map((item, index) => (
          <div className={"p-5"}>
            <CollectionCard {...item} key={index} />
          </div>
        ))}
      </div>
    </>
  );
}
