import CollectionCard from "./CollectionCard/CollectionCard";

export interface CardProp {
  animalName: string;
  created_at: string | null;
  id: number;
  rarity: string;
  setId: number;
  src: string;
  totalVariations: number | null;
  variation: number | null;
}
export interface IAppProps {
  setName: string;
  totalCards: number;
  cardProps: CardProp[];
}

export default function App({ setName, totalCards, cardProps }: IAppProps) {
  return (
    <>
      <div className={"grid grid-cols-[1fr_4fr_1fr] w-full mb-10"}>
        <div></div>
        <div className={"text-white font-bold text-4xl text-center m-auto"}>
          {setName}
        </div>
        <div className="flex flex-col justify-center">
          <div
            className={
              "text-white opacity-60 font-bold text-xl text-center m-auto"
            }
          >
            total cards: {totalCards}
          </div>
          <div
            className={
              "text-white opacity-60 font-bold text-xl text-center m-auto"
            }
          >
            cards collected: {"?"}
          </div>
        </div>
      </div>
      <div className={"flex flex-row flex-wrap justify-center"}>
        {cardProps.map((item, index) => (
          <div className={"p-5"}>
            <CollectionCard {...item} count={0} key={index} />
          </div>
        ))}
      </div>
    </>
  );
}
