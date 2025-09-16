import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log(body);
  // try {
  //   const { data, status } = await api.post("/auth/register", {
  //     email,
  //     username,
  //     password,
  //   });
  //   return NextResponse.json(data, { status });
  // } catch (error: any) {
  //   return NextResponse.json(
  //     { error: error.response?.data || "Server error" },
  //     { status: error.response?.status || 500 }
  //   );
  // }
  return NextResponse.json({ ok: true, body }, { status: 200 });
}
