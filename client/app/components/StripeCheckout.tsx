export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <form action="/api/checkout_sessions" method="POST">
      <section
        className={"bg-white flex flex-col w-[100%] rounded-md justify-between"}
      >
        <button
          className={
            "z-[3] h-9 bg-[#55d662] rounded text-white border-0 font-semibold cursor-pointer transition-all shadow-md hover:opacity-80"
          }
          type="submit"
          role="link"
        >
          Checkout
        </button>
      </section>
      <style jsx>
        {`
          section {
            background: #ffffff;
            display: flex;
            flex-direction: column;
            width: 100%;
            border-radius: 6px;
            justify-content: space-between;
          }
          button {
            z-index: 3;
            height: 36px;
            background: #55d662;
            border-radius: 4px;
            color: white;
            border: 0;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
          }
          button:hover {
            opacity: 0.8;
          }
        `}
      </style>
    </form>
  );
}
