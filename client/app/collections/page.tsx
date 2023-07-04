import Link from "next/link";
import CollectionDisplay from "../components/CollectionDisplay/CollectionDisplay";
import ProtectedLayout from "../components/ProtectedLayout";

import "./page.css";

export default function App() {
  return (
    <ProtectedLayout>
      <div className={"text-white font-bold text-4xl mb-10"}>
        Your Collections
      </div>
      <div className={"flex flex-row flex-wrap justify-center"}>
        <div className={"p-5"}>
          <Link href={"/collection?setId=5&name=Polygon%20Collection"}>
            <CollectionDisplay />
          </Link>
        </div>
      </div>
    </ProtectedLayout>
  );
}
