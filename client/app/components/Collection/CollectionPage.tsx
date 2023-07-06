import CollectionCard from "@/app/components/CollectionCard/CollectionCard";
import "./page.css";
import { IAppProps } from "@/app/components/CollectionCard/CollectionCard";

export default async function Component({ setId }: { setId: string }) {
  // const { data } = await supabase.auth.getUser();
  // const userEmail = data.user?.email!;
  // const email = emailMinify(userEmail);
  const res = await fetch(
    `https://kingofthepack.vercel.app/api/collection_props?setId=${setId}`
  );
  console.log(res);
  const { data } = await res.json();
  const { setName, totalCards, cardsCollected, cardProps } = data;

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
        {cardProps.map((item: IAppProps, index: number) => (
          <div className={"p-5"}>
            <CollectionCard {...item} key={index} />
          </div>
        ))}
      </div>
    </>
  );
}
