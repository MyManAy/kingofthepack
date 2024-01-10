import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/app/generated/types_db";
import { CardProp } from "@/app/collection/[id]/page";
import GreenButton from "../GreenButton";
import CollectionTemplate from "./CollectionTemplate";

export interface IAppProps {
  setId: string;
  setName: string;
  cardProps: CardProp[];
  totalCards: number;
}

export default async function App({
  setName,
  cardProps,
  setId,
  totalCards,
}: IAppProps) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: userCardIds } = await supabase
    .from("circulationCard")
    .select(
      `
      card!inner (
            setId,
            id
          )
      `
    )
    .eq("card.setId", Number(setId));

  type SupabaseResponse = typeof userCardIds;

  let cardsCollected = 0;
  const calculateCounts = (userCardIds: SupabaseResponse) => {
    const ids = userCardIds!.map((item) => item!.card!.id);
    let counts: { [index: number]: number } = {};
    for (const id of ids) {
      if (counts[id]) counts[id]++;
      else counts[id] = 1;
    }
    const propsWithCount = cardProps.map((item) => ({
      ...item,
      count: counts[item.id] ?? 0,
    }));
    cardsCollected = Object.keys(counts).length;
    return propsWithCount;
  };

  return (
    <>
      {userCardIds ? (
        <CollectionTemplate
          cardPropsWithCount={calculateCounts(userCardIds)}
          cardsCollected={cardsCollected.toString()}
          setName={setName}
          totalCards={totalCards}
        />
      ) : (
        <>
          <div
            className={"text-white font-bold text-4xl mb-10"}
          >{`You haven't opened any ${setName} packs yet!`}</div>
          <div className={"flex flex-row flex-wrap justify-center"}>
            <div className="flex flex-col gap-5 justify-center align-middle">
              <GreenButton text="Get packs here!" route="/packs" />
            </div>
          </div>
        </>
      )}
    </>
  );
}
