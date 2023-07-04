import { NextResponse } from "next/server";

export async function POST(req: Request, res: any) {
  const text = await req.text();
  const json = JSON.parse(text) as any;
  const record = json.record;
  const { email, user_meta_data, id } = record;
  const username = user_meta_data.name ?? user_meta_data.username;
  console.log(email, username, id);

  return NextResponse.json({
    recieved: true,
  });
}
