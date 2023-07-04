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
    </form>
  );
}
