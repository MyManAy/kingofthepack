import { CardProp } from "@/app/collection/[id]/page";
import CollectionTemplate from "./CollectionTemplate";

export interface IAppProps {
  setName: string;
  totalCards: number;
  cardProps: CardProp[];
}

export default function App({ setName, totalCards, cardProps }: IAppProps) {
  return (
    <CollectionTemplate
      setName={setName}
      totalCards={totalCards}
      cardsCollected="?"
      cardPropsWithCount={cardProps.map((item) => ({ ...item, count: 0 }))}
    />
  );
}
