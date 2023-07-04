import { NextResponse } from "next/server";

export async function POST(req: Request, res: any) {
  const body = req.text();
  console.log(body);

  return NextResponse.json({
    recieved: true,
  });
}
