import { serverAxiosInstance } from "@/app/utils/axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, username, password } = await req.json();

  console.log(email, username, password);
  try {
    const { data, status } = await serverAxiosInstance.post("/auth/register", {
      email: email,
      username: username,
      password: password,
    });
    return NextResponse.json(data, { status });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data || "Server error" },
      { status: error.response?.status || 500 }
    );
  }
}
