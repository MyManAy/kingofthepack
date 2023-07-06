// import { supabase } from "../../utils/supabase";
// import CollectionLoading from "@/app/components/Collection/CollectionLoading";
// import { Suspense } from "react";
// import CollectionPage from "@/app/components/Collection/CollectionPage";

// export const dynamic = "force-dynamic";

// export async function generateStaticParams() {
//   const { data: set } = await supabase.from("set").select("id");
//   const ids = set?.map((item) => item.id)!;
//   return ids.map((id) => ({ id: id.toString() }));
// }

// export default async function App({
//   params: { id: setId },
// }: {
//   params: { id: string };
// }) {
//   const { data: set } = await supabase
//     .from("set")
//     .select(
//       `
//         name,
//         weighting (
//           rarity,
//           weighting
//         ),
//         card (
//           *
//         )
//   `
//     )
//     .eq("id", setId!)
//     .single();

//   const { card, weighting, name } = set!;
//   const totalCards = card.length;
//   const setName = name;

//   const getWeightingFromRarity = (rarity: string) =>
//     weighting.find((item) => item.rarity === rarity);
//   const sorted = card.sort(
//     (a, b) =>
//       getWeightingFromRarity(b.rarity)!.weighting -
//       getWeightingFromRarity(a.rarity)!.weighting
//   );
//   const cardProps = sorted;

//   return (
//     <Suspense
//       fallback={
//         <CollectionLoading
//           setName={setName}
//           totalCards={totalCards}
//           cardProps={cardProps}
//         />
//       }
//     >
//       <CollectionPage setId={setId} />
//     </Suspense>
//   );
// }

import CollectionCard from "@/app/components/CollectionCard/CollectionCard";
import "./page.css";
import { supabase } from "@/app/utils/supabase";
import { IAppProps } from "@/app/components/CollectionCard/CollectionCard";

export const dynamic = "force-dynamic";

export default async function App({ setId }: { setId: string }) {
  // const { data } = await supabase.auth.getUser();
  // const userEmail = data.user?.email!;
  // const email = emailMinify(userEmail);
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
