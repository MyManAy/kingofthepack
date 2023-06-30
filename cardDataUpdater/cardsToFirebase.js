import fs from "fs";
import { collection } from "firebase/firestore";

console.log(collection);
const obj = fs
  .readdirSync(
    "C:/Users/nithi/Documents/VSCodeProjects/payments/public/Polygonal Animal Drawings"
  )
  .map((file) => ({
    src: `/Polygonal Animal Drawings/${file}`,
    animalName: file.match(/- ([A-Z ]+)/i)[1].trim(),
    rarity: file.match(/([A-Z ]+) -/i)[1],
    variation: file.match(/(\d+) of/)?.[1],
    totalVariations: file.match(/(\d+)\.png/)?.[1],
  }));

// DO NOT EXECUTE THE BELOW CODE IF "cards" COLLECTION ALREADY HAS THE CARDS

// const cardsCollection = collection(firestore, "cards");
// const add = async () => {
//   props.forEach((item) => {
//     addDoc(cardsCollection, item);
//   });
// };

// add();

const json = JSON.stringify(obj);

fs.writeFileSync("cardPropsFromImages.json", json, "utf8");
