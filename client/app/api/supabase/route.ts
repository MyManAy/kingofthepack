import { NextResponse } from "next/server";

export async function POST(req: Request, res: any) {
  const text = await req.text();
  const json = JSON.parse(text) as any;
  const record = json.record;
  const { email, raw_user_meta_data, id } = record;
  const username = raw_user_meta_data.name ?? raw_user_meta_data.username;
  console.log(email, username, id);

  return NextResponse.json({
    recieved: true,
  });
}
