import "./Iridescent.css";
import "./Neon.css";
import "./Badge.css";

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
    bgStyle: "bg-zinc-300",
    nameStyle: "text-black opacity-80",
    rarityStyle: "text-zinc-500 opacity-80",
  },
  Rare: {
    bgStyle: "bg-indigo-600",
    nameStyle: "text-white opacity-90",
    rarityStyle: "text-zinc-300 opacity-80",
  },
  Epic: {
    bgStyle: "bg-fuchsia-400",
    nameStyle: "text-black opacity-80",
    rarityStyle: "text-zinc-800 opacity-70",
  },
  Golden: {
    bgStyle: "bg-orange-500",
    nameStyle: "text-white opacity-100",
    rarityStyle: "text-zinc-100 opacity-70",
  },
  "King of the Pack": {
    bgStyle: "bg-zinc-300",
    nameStyle: "text-black opacity-80",
    rarityStyle: "text-[#3f0719] opacity-80",
  },
};

const containers = [
  "h-[45vh] w-[calc(45vh/1.5)] grid grid-cols-[1fr_5fr_1fr] grid-rows-[1fr_4fr_1fr] rounded-md overcursor-pointer opacity-10 -z-10",
  "h-[45vh] w-[calc(45vh/1.5)] grid grid-cols-[1fr_5fr_1fr] grid-rows-[1fr_4fr_1fr] rounded-md cursor-pointer -z-10",
];

export interface IAppProps {
  rarity: string;
  animalName: string;
  src: string;
  variation: number | null;
  totalVariations?: number | null;
  count: number;
}

export default function App({
  rarity,
  animalName,
  src,
  variation = 1,
  totalVariations = 1,
  count,
}: IAppProps) {
  return (
    <div
      className={`${containers[+(count > 0)]} ${
        rarity === "King of the Pack"
          ? "iridescent2"
          : rarityStyleMapping[rarity as Rarity].bgStyle
      }`}
    >
      <div className="h-6 rounded-tl-md rounded-br-md bg-black text-white flex font-black justify-center items-center">
        {count}
      </div>
      <div
        className={`font-semibold flex justify-center items-center text-center whitespace-nowrap text-clip ${
          rarityStyleMapping[rarity as Rarity].nameStyle
        } ${rarity === "King of the Pack" ? "text-lg" : "text-xl"}`}
      >
        {animalName}
      </div>
      <div></div>
      <div></div>
      <div className="rounded justify-center items-center">
        <img className="rounded" alt={animalName} src={src} />
      </div>
      <div></div>
      <div></div>
      <div
        className={`font-medium text-sm flex justify-center items-center ${
          rarityStyleMapping[rarity as Rarity].rarityStyle
        }`}
      >
        {rarity === "King of the Pack"
          ? rarity
          : `${rarity} ${variation ?? 1}/${totalVariations ?? 1}`}
      </div>
    </div>
  );
}
