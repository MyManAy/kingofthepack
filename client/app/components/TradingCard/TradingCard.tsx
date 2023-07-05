import "./Iridescent.css";
import "./Neon.css";
import Image from "next/image";

export type Rarity = "Common" | "Rare" | "Epic" | "Golden" | "King of the Pack";

type RarityStyleMapping = {
  [key in Rarity]: {
    bgStyle: string;
    nameStyle: string;
    rarityStyle: string;
  };
};
const rarityStyleMapping: RarityStyleMapping = {
  Common: {
    bgStyle:
      "bg-zinc-300 w-[100%] flex flex-col align-middle justify-center rounded-md gap-4",
    nameStyle:
      "text-black flex align-middle opacity-80 font-semibold text-4xl justify-center",
    rarityStyle:
      "text-zinc-500 flex align-middle opacity-80 font-medium text-lg justify-center",
  },
  Rare: {
    bgStyle:
      "bg-indigo-600  w-[100%] flex flex-col align-middle justify-center rounded-md gap-4",
    nameStyle:
      "text-white flex align-middle opacity-90 font-semibold text-4xl justify-center",
    rarityStyle:
      "text-zinc-300 flex align-middle opacity-80 font-medium text-lg justify-center",
  },
  Epic: {
    bgStyle:
      "bg-fuchsia-400 w-[100%] flex flex-col align-middle justify-center rounded-md gap-4",
    nameStyle:
      "text-black flex align-middle opacity-80 font-semibold text-4xl justify-center",
    rarityStyle:
      "text-zinc-800 flex align-middle opacity-70 font-medium text-lg justify-center",
  },
  Golden: {
    bgStyle:
      "bg-orange-500 w-[100%] flex flex-col align-middle justify-center rounded-md gap-4",
    nameStyle:
      "text-white flex align-middle opacity-100 font-semibold text-4xl justify-center",
    rarityStyle:
      "text-zinc-100 flex align-middle opacity-70 font-medium text-lg justify-center",
  },
  "King of the Pack": {
    bgStyle:
      "bg-zinc-300 w-[100%] flex flex-col align-middle justify-center rounded-md gap-4",
    nameStyle:
      "text-black flex align-middle opacity-80 font-semibold text-4xl justify-center",
    rarityStyle:
      "text-zinc-500 flex align-middle opacity-80 font-medium text-lg justify-center",
  },
};

export interface IAppProps {
  rarity: Rarity;
  animalName: string;
  src: string;
  variation: number | null;
  totalVariations: number | null;
}

export default function App({
  rarity,
  animalName,
  src,
  variation,
  totalVariations,
}: IAppProps) {
  return (
    <div className={`h-[65vh] w-[calc(65vh/1.5)] flex cursor-pointer`}>
      <div
        className={
          rarity === "King of the Pack"
            ? "iridescent"
            : rarityStyleMapping[rarity].bgStyle
        }
      >
        <div className={rarityStyleMapping[rarity].nameStyle}>{animalName}</div>
        <Image
          alt={animalName}
          src={src}
          className="self-center rounded h-[300px]"
        />
        <div
          className={
            rarity === "King of the Pack"
              ? "neon"
              : rarityStyleMapping[rarity].rarityStyle
          }
        >
          {rarity === "King of the Pack"
            ? rarity
            : `${rarity} ${variation ?? 1}/${totalVariations ?? 1}`}
        </div>
      </div>
    </div>
  );
}
