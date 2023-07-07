import Link from "next/link";
import CollectionDisplay from "../components/CollectionDisplay/CollectionDisplay";
import "./page.css";
import { supabase } from "../utils/supabase";

export default async function App() {
  const { data: set } = await supabase.from("set").select("id, name");
  return (
    <>
      {/* <ProtectedLayout> */}
      <div className={"text-white font-bold text-4xl mb-10"}>
        Your Collections
      </div>
      <div className={"flex flex-row flex-wrap justify-center"}>
        <div className={"p-5"}>
          {set?.map((item) => (
            <Link href={`/collection/${item.id}`}>
              <CollectionDisplay text={item.name} />
            </Link>
          ))}
        </div>
      </div>
      {/* </ProtectedLayout> */}
    </>
  );
}
