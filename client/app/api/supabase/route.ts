import emailMinify from "@/app/utils/minifyEmail";
import { supabase } from "@/app/utils/supabase";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: any) {
  const text = await req.text();
  const json = JSON.parse(text) as any;
  const record = json.record;
  const { email, raw_user_meta_data, id, email_confirmed_at } = record;
  const username = raw_user_meta_data.name ?? raw_user_meta_data.username;
  console.log(email, username, id);
  if (email_confirmed_at) {
    const smth = supabase
      .from("user")
      .insert({ email: emailMinify(email), username, id });
    console.log(JSON.stringify(smth, null, 4));
  }

  return NextResponse.json({
    recieved: true,
  });
}
