import "../../components/TradingCard/Iridescent.css";
import "../../components/TradingCard/Neon.css";
import "./Card.css";
import "./Flipping.css";
import TradingCard, {
  IAppProps as TradingCardProps,
} from "../TradingCard/TradingCard";
import MagicCard from "../MagicCard/MagicCard";

interface IAppProps {
  props: TradingCardProps;
  flipped: boolean;
  transition: boolean;
}

export default function App({ props, flipped, transition }: IAppProps) {
  return (
    <div className="maincontainer">
      <div
        className={`thecard  ${flipped ? "flipped" : ""} ${
          transition ? "transition" : ""
        }`}
      >
        <div className="thefront">
          <MagicCard />
        </div>

        <div className="theback">
          <TradingCard {...props} />
        </div>
      </div>
    </div>
  );
}
