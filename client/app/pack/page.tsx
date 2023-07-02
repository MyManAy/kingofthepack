"use client";

import ArrowLeft from "@mui/icons-material/ArrowBackIosNew";
import FlippingCard from "../components/FlippingCard/FlippingCard";
import "./page.css";
import { useEffect, useState } from "react";
import { IAppProps } from "../components/TradingCard/TradingCard";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabase";

export default () => {
  const router = useRouter();
  const [arrowVisible, setArrowVisible] = useState(false);
  const [hasBeenFlipped, setHasBeenFlipped] = useState(false);
  const [pack, setPack] = useState(null as null | IAppProps[]);
  const [flipped, setFlipped] = useState(false);

  const onArrowClick = () => {
    if (arrowVisible) {
      setArrowVisible(false);
    }
  };

  const onCardClick = () => {
    setArrowVisible(true);
    setHasBeenFlipped(true);
    setFlipped(!flipped);
  };

  const listener = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      if (flipped) onArrowClick();
      else onCardClick();
    }
  };

  const getCardProps = async () => {
    const { data: openedPack } = await supabase
      .from("openedPack")
      .select(
        `
        card (
          src,
          animalName,
          rarity,
          variation,
          totalVariations
        )
  `
      )
      .eq("userEmail", "nithin.monni@gmail.com")
      .order("id", { ascending: false })
      .limit(1)
      .single();

    const cards = openedPack!.card as unknown as IAppProps[];
    setPack(cards);
  };

  useEffect(() => {
    getCardProps();
  }, []);

  useEffect(() => {
    if (!arrowVisible && hasBeenFlipped) {
      setTimeout(() => {
        setFlipped(false);
        setHasBeenFlipped(false);
        setPack(pack!.slice(1));
      }, 500);
    } else if (arrowVisible) {
      setHasBeenFlipped(true);
    }
  }, [arrowVisible]);

  useEffect(() => {
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, [flipped]);

  useEffect(() => {
    if (pack && pack.length === 0) router.push("/");
  }, [pack]);

  // useEffect(() => {
  //   const openedPackChannel = supabase
  //     .channel("openedPackChannel")
  //     .on(
  //       "postgres_changes",
  //       { event: "INSERT", schema: "public", table: "openedPack" },
  //       async (payload) => {
  //         const email = payload.new.userEmail;
  //         if (email === "nithin.monni@gmail.com") {
  //           console.log("yes!!!");
  //         }
  //         supabase
  //           .channel("ccChannel")
  //           .on(
  //             "postgres_changes",
  //             { event: "INSERT", schema: "public", table: "circulationCard" },
  //             async (payload) => console.log(payload)
  //           );
  //       }
  //     )
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(openedPackChannel);
  //   };
  // }, [supabase]);

  return (
    <div className="flex flex-col gap-10 justify-center align-middle">
      <div className="text-white flex absolute left-3 pt-1 justify-center align-middle text-5xl font-bold">
        {pack && pack.length}
      </div>
      <ArrowLeft
        fontSize="large"
        className={arrowVisible ? "fadein" : "fadeout"}
        style={{
          color: "white",
          position: "absolute",
          top: "47.5%",
          left: "400px",
          cursor: "pointer",
        }}
        onClick={onArrowClick}
        onKeyDown={(event) => {
          if (event.code === "ArrowLeft") {
            onArrowClick();
          }
        }}
      />
      {pack && pack.length > 0 && (
        <div
          className={!arrowVisible && hasBeenFlipped ? "disappear" : "appear"}
          onClick={onCardClick}
          onKeyDown={(event) => {
            if (event.code === "Space") {
              onCardClick();
            }
          }}
        >
          <FlippingCard
            props={pack[0]}
            flipped={flipped}
            transition={arrowVisible}
          />
        </div>
      )}
    </div>
  );
};
