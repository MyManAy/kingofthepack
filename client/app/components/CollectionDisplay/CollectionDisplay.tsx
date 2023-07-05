import "./CollectionDisplay.css";

export default function App({ text }: { text: string }) {
  return (
    <div className={"h-[45vh] w-[calc(45vh/1.5)] flex cursor-pointer"}>
      <div className="card">
        <div className="neonText">{text}</div>
      </div>
    </div>
  );
}
