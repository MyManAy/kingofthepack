"use client";

import CollectionDisplay from "../components/CollectionDisplay/CollectionDisplay";
import ProtectedLayout from "../components/ProtectedLayout";
import StripeCheckout from "../components/StripeCheckout";
import "./page.css";

export default function App() {
  return (
    <ProtectedLayout>
      <div className={"text-white font-bold text-4xl mb-10"}>
        Polygon Collection
      </div>
      <div className={"flex flex-row flex-wrap justify-center"}>
        <div className={"flex flex-col gap-3 p-5"}>
          <CollectionDisplay />
          <StripeCheckout />
        </div>
      </div>
    </ProtectedLayout>
  );
}
