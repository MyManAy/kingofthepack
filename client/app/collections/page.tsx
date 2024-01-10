import Link from "next/link";
import CollectionDisplay from "../components/CollectionDisplay/CollectionDisplay";
import ProtectedLayout from "../components/Layouts/ProtectedLayout";
import { supabase } from "../utils/supabase";
import PageCenterLayout from "../components/Layouts/PageCenterLayout";

export const dynamic = "force-dynamic";

export default async function App() {
  const { data: set } = await supabase.from("set").select("id, name");
  return (
    <ProtectedLayout>
      <PageCenterLayout>
        <div className={"text-white font-bold text-4xl mb-10"}>
          Your Collections
        </div>
        <div className={"flex flex-row flex-wrap justify-center"}>
          <div className={"flex flex-col gap-3 p-5"}>
            {set?.map((item) => (
              <Link href={`/collection/${item.id}`}>
                <CollectionDisplay text={item.name} />
              </Link>
            ))}
          </div>
        </div>
      </PageCenterLayout>
    </ProtectedLayout>
  );
}
