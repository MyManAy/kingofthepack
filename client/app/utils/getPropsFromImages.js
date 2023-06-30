var fs = require("fs");
var { firestore } = "./firebase";
var { addDoc, collection } = "firebase/firestore";

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

const cardsCollection = collection(firestore, "cards");
const add = async () => {
  obj.forEach((item) => {
    addDoc(cardsCollection, item);
  });
};

add();

const json = JSON.stringify(obj);

fs.writeFileSync("cardPropsFromImages.json", json, "utf8");
