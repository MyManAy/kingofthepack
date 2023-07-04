import CollectionDisplay from "../components/CollectionDisplay/CollectionDisplay";
import ProtectedLayout from "../components/ProtectedLayout";
import "./page.css";

export default function App() {
  return (
    <ProtectedLayout>
      <div className={"text-white font-bold text-4xl mb-10"}>
        Polygon Collection
      </div>
      <div className={"flex flex-row flex-wrap justify-center"}>
        <div className={"p-5"}>
          <CollectionDisplay />
        </div>
      </div>
    </ProtectedLayout>
  );
}