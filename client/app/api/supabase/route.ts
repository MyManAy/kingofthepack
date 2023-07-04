import { NextResponse } from "next/server";

export async function POST(req: Request, res: any) {
  const body = req.body as any;
  console.log(body);

  return NextResponse.json({
    recieved: true,
  });
}
