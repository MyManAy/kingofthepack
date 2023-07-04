// import { loadStripe } from "@stripe/stripe-js";
import MagicCard from "./components/MagicCard/MagicCard";
import ProtectedLayout from "./components/ProtectedLayout";
import GreenButton from "./components/GreenButton";

// loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default () => {
  return (
    <ProtectedLayout>
      <div className="flex flex-col gap-10 justify-center align-middle">
        <div className="h-[65vh] w-[calc(65vh/1.5)] text-4xl">
          <MagicCard />
        </div>
        {/* <StripeCheckout /> */}
        <div className="flex flex-col gap-5 justify-center align-middle">
          <GreenButton text="Packs" route="/packs" />
          <GreenButton text="Collections" route="/collections" />
        </div>
      </div>
    </ProtectedLayout>
  );
};
