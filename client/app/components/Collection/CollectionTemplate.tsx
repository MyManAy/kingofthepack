import { CardProp } from "@/app/collection/[id]/page";
import CollectionCard from "../CollectionCard/CollectionCard";

export interface IAppProps {
  cardsCollected: string;
  cardPropsWithCount: (CardProp & { count: number })[];
  setName: string;
  totalCards: number;
}

export default function App({
  cardPropsWithCount,
  cardsCollected,
  setName,
  totalCards,
}: IAppProps) {
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
            cards collected: {cardsCollected}
          </div>
        </div>
      </div>
      <div className={"flex flex-row flex-wrap justify-center"}>
        {cardPropsWithCount.map((item, index) => (
          <div className={"p-5"}>
            <CollectionCard {...item} key={index} />
          </div>
        ))}
      </div>
    </>
  );
}
