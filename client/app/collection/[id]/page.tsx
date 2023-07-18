import { supabase as AdminSupabase } from "../../utils/supabase";
// import CollectionLoading from "@/app/components/Collection/CollectionLoading";
// import { Suspense } from "react";
import CollectionPage from "@/app/components/Collection/CollectionPage";
import ProtectedLayout from "@/app/components/ProtectedLayout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function generateStaticParams() {
  const { data: set } = await AdminSupabase.from("set").select("id");
  const ids = set?.map((item) => item.id)!;
  return ids.map((id) => ({ id: id.toString() }));
}

export default async function App({
  params: { id: setId },
}: {
  params: { id: string };
}) {
  const supabase = createServerComponentClient({ cookies });
  // const { data: set } = await supabase
  //   .from("set")
  //   .select(
  //     `
  //       name,
  //       weighting (
  //         rarity,
  //         weighting
  //       ),
  //       card (
  //         *
  //       )
  // `
  //   )
  //   .eq("id", setId!)
  //   .single();

  // const { card, weighting, name } = set!;
  // const totalCards = card.length;
  // const setName = name;

  // const getWeightingFromRarity = (rarity: string) =>
  //   weighting.find((item) => item.rarity === rarity);
  // const sorted = card.sort(
  //   (a, b) =>
  //     getWeightingFromRarity(b.rarity)!.weighting -
  //     getWeightingFromRarity(a.rarity)!.weighting
  // );
  // const cardProps = sorted;
  return (
    <ProtectedLayout>
      {/* <Suspense
        fallback={
          <CollectionLoading
            setName={setName}
            totalCards={totalCards}
            cardProps={cardProps}
          />
        }
      > */}
      <CollectionPage setId={setId} />
      {/* </Suspense> */}
    </ProtectedLayout>
  );
}
