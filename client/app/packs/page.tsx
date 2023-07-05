import CollectionDisplay from "../components/CollectionDisplay/CollectionDisplay";
import ProtectedLayout from "../components/ProtectedLayout";
import StripeCheckout from "../components/StripeCheckout";
import { supabase } from "../utils/supabase";
import "./page.css";

export default async function App() {
  const { data: data } = await supabase
    .from("pack")
    .select("name, totalCards, stripePriceId");
  return (
    <ProtectedLayout>
      <div className={"text-white font-bold text-4xl mb-10"}>Packs</div>
      <div className={"flex flex-row flex-wrap justify-center"}>
        <div className={"flex flex-col gap-3 p-5"}>
          {data?.map((item) => (
            <>
              <div className={"text-white opacity-60 text-right"}>
                cards in pack: {item.totalCards}
              </div>
              <CollectionDisplay text={item.name} />
              <StripeCheckout />
            </>
          ))}
        </div>
      </div>
    </ProtectedLayout>
  );
}
