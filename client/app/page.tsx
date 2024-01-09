import MagicCard from "./components/MagicCard/MagicCard";
import ProtectedLayout from "./components/ProtectedLayout";
import GreenButton from "./components/GreenButton";
export default () => {
  return (
    <ProtectedLayout>
      <div className="min-h-screen flex justify-center items-center flex-col overflow-hidden">
        <div className="flex flex-col gap-10 justify-center align-middle">
          <div className="h-[65vh] w-[calc(65vh/1.5)] text-5xl flex justify-center">
            <MagicCard />
          </div>
          <div className="flex flex-col gap-5 justify-center align-middle">
            <GreenButton text="Packs" route="/packs" />
            <GreenButton text="Collections" route="/collections" />
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
};
