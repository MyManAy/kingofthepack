import CollectionCard from "@/app/components/CollectionCard/CollectionCard";
import { supabase } from "@/app/utils/supabase";

// export async function generateStaticParams() {
//   const { data: set } = await supabase.from("set").select("id");
//   const ids = set?.map((item) => item.id)!;
//   return ids.map((id) => ({
//     id: id.toString(),
//   }));
// }

export default async function Loading({
  params: { id: setId },
}: {
  params: { id: string };
}) {
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

  const getWeightingFromRarity = (rarity: string) =>
    weighting.find((item) => item.rarity === rarity);
  const sorted = card.sort(
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
            cards collected: {"?"}
          </div>
        </div>
      </div>
      <div className={"flex flex-row flex-wrap justify-center"}>
        {cardProps.map((item, index) => (
          <div className={"p-5"}>
            <CollectionCard {...item} count={0} key={index} />
          </div>
        ))}
      </div>
    </>
  );
}
