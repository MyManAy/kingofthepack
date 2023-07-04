import { NextResponse } from "next/server";

export async function POST(req: Request, res: any) {
  const record = (req.body as any).record;
  console.log(record);

  return NextResponse.json({
    recieved: true,
  });
}
