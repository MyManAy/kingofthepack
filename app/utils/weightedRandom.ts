import { IAppProps, Rarity } from "../components/TradingCard/TradingCard";
import cardPropsJson from "./cardPropsFromImages.json";

export default function weightedRandom(spec: number[]) {
  let table = [] as string[];
  for (let i in spec) {
    // The constant 10 below should be computed based on the
    // weights in the spec for a correct and optimal table size.
    // E.g. the spec {0:0.999, 1:0.001} will break this impl.
    for (let j = 0; j < spec[i] * 10000; j++) {
      table.push(i);
    }
  }
  return function () {
    return table[Math.floor(Math.random() * table.length)];
  };
}

const cardProps = cardPropsJson as unknown as IAppProps[];
const rarities: Rarity[] = [
  "Common",
  "Rare",
  "Epic",
  "Golden",
  "King of the Pack",
];
const randomRarityChooser = () =>
  rarities[Number(weightedRandom([0.6, 0.3, 0.075, 0.02, 0.005])())];

export const randomCardPropsChooser = () => {
  const chosenRarity = randomRarityChooser();
  const cardsOfRarity = cardProps.filter(
    (item) => item.rarity === chosenRarity
  );
  return cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];
};
