import { redirect } from "next/navigation";
import { Database } from "../../generated/types_db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/auth/sign-up");

  return (
    <>
      <Link href="/">
        <Image
          src="/icons8-home.svg"
          alt="Home"
          height={50}
          width={50}
          style={{
            position: "absolute",
            top: "1.25rem",
            left: "1.25rem",
          }}
        />
      </Link>
      {children}
    </>
  );
}
