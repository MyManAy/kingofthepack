import { supabase as publicSupabase } from "../../utils/supabase";
import CollectionLoading from "@/app/components/Collection/CollectionLoading";
import { Suspense } from "react";
import CollectionPage from "@/app/components/Collection/CollectionPage";
import ProtectedLayout from "@/app/components/Layouts/ProtectedLayout";
import PageCenterLayout from "@/app/components/Layouts/PageCenterLayout";
import { supabase } from "@/app/utils/adminSupabase";

export const dynamic = "force-dynamic";

export interface CardProp {
  animalName: string;
  created_at: string | null;
  id: number;
  rarity: string;
  setId: number;
  src: string;
  totalVariations: number | null;
  variation: number | null;
}

export async function generateStaticParams() {
  const { data: set } = await publicSupabase.from("set").select("id");
  const ids = set?.map((item) => item.id)!;
  return ids.map((id) => ({ id: id.toString() }));
}

export default async function App({
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
    <ProtectedLayout>
      <PageCenterLayout>
        <Suspense
          fallback={
            <CollectionLoading
              setName={setName}
              totalCards={totalCards}
              cardProps={cardProps}
            />
          }
        >
          <CollectionPage
            setName={setName}
            totalCards={totalCards}
            cardProps={cardProps}
            setId={setId}
          />
        </Suspense>
      </PageCenterLayout>
    </ProtectedLayout>
  );
}
