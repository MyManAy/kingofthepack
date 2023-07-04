import { NextResponse } from "next/server";

export async function POST(req: Request, res: any) {
  const body = await req.text();
  console.log(body);

  return NextResponse.json({
    recieved: true,
  });
}
