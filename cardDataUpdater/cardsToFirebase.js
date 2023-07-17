import fs from "fs";

const folderName = "Jade Animal Drawings";
const jsonFileName = "jadeCardPropsFromImages";

// FOR UPDATING THE JSON CONTAINING CARD PROP DATA
const obj = fs
  .readdirSync(
    `C:/Users/nithi/Documents/VSCodeProjects/kingofthepack/client/public/${folderName}`
  )
  .map((file) => ({
    src: `/${folderName}/${file}`,
    animalName: file.match(/- ([A-Z ]+)/i)[1].trim(),
    rarity: file.match(/([A-Z ]+) -/i)[1],
    variation: file.match(/(\d+) of/)?.[1],
    totalVariations: file.match(/(\d+)\.png/)?.[1],
  }));
const json = JSON.stringify(obj);
fs.writeFileSync(`${jsonFileName}.json`, json, "utf8");
