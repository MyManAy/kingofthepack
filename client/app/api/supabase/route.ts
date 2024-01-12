import emailMinify from "@/app/utils/minifyEmail";
import { supabase } from "@/app/utils/adminSupabase";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: any) {
  const text = await req.text();
  const json = JSON.parse(text) as any;

  type Record = {
    email: string;
    raw_user_meta_data: {
      name?: string;
      username?: string;
    };
    id: string;
    email_confirmed_at: string;
    provider: string;
  };
  const record: Record = json.record;
  const {
    email,
    raw_user_meta_data,
    id,
    email_confirmed_at,
    provider,
  } = record;
  const username = raw_user_meta_data.name ?? raw_user_meta_data.username;
  if (email_confirmed_at || provider.toLowerCase() === "google") {
    await supabase
      .from("user")
      .insert({ email: emailMinify(email), username: username!, id })
      .select();
  }
  console.log(record);

  return NextResponse.json({
    recieved: true,
  });
}
