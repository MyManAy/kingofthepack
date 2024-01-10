export default async function PageCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "min-h-screen flex justify-center items-center flex-col py-8 overflow-y-hidden"
      }
    >
      {children}
    </div>
  );
}
