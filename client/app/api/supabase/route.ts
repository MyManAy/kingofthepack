import { NextResponse } from "next/server";

export async function POST(req: Request, res: any) {
  const body = req;
  console.log(body);

  return NextResponse.json({
    recieved: true,
  });
}
