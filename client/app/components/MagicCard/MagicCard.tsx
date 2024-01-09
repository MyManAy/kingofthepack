import "./MagicCard.css";

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <div className="homeCard">
      <div className="cardGlow"></div>
      <div className="cardGradient"></div>
      <div className="neonText">King of the Pack</div>
    </div>
  );
}
