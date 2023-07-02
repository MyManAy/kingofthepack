"use client";

import ArrowLeft from "@mui/icons-material/ArrowBackIosNew";
import FlippingCard from "../components/FlippingCard/FlippingCard";
import "./page.css";
import { useEffect, useState } from "react";
import { IAppProps } from "../components/TradingCard/TradingCard";
import { randomCardPropsChooser, randomRarity } from "../utils/weightedRandom";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabase";

export default () => {
  const router = useRouter();
  const [arrowVisible, setArrowVisible] = useState(false);
  const [hasBeenFlipped, setHasBeenFlipped] = useState(false);
  const [pack, setPack] = useState(null as null | IAppProps[]);
  const [flipped, setFlipped] = useState(false);
  const NUMBER_OF_CARDS = 10;

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

  useEffect(() => {
    let props: IAppProps[] = [];
    for (let i = 0; i < NUMBER_OF_CARDS; i++) {
      props.push(randomCardPropsChooser());
    }
    setPack(props);

    const gen = randomRarity([
      { rarity: "Common", weighting: 0.9 },
      { rarity: "Rare", weighting: 0.1 },
    ]);
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
    console.log(gen());
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

  useEffect(() => {
    const openedPackChannel = supabase
      .channel("openedPackChannel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "openedPack" },
        async (payload) => {
          const email = payload.new.userEmail;
          if (email === "nithin.monni@gmail.com") {
            console.log("yes!!!");
          }
          supabase.removeAllChannels();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(openedPackChannel);
    };
  }, [supabase]);

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
