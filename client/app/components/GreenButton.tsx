import Link from "next/link";

export interface IAppProps {
  text: string;
  route: string;
}

export default function GreenButton({ text, route }: IAppProps) {
  return (
    <section
      className={"bg-white flex flex-col w-[100%] rounded-md justify-between"}
    >
      <Link
        className="z-[3] h-14 bg-[#55d662] rounded text-white border-0 font-semibold cursor-pointer transition-all shadow-md hover:opacity-80 flex justify-center items-center p-10"
        href={route}
      >
        <div className={"text-xl"}>{text}</div>
      </Link>
    </section>
  );
}
