import { serverAxiosInstance } from "@/app/utils/axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = await serverAxiosInstance.post(
      "/auth/refresh",
      {},
      {
        headers: {
          Cookie: req.headers.get("cookie") || "",
        },
      }
    );

    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

    // 서버에서 설정된 새로운 쿠키를 클라이언트로 전달
    const setCookieHeader = response.headers["set-cookie"];
    if (setCookieHeader) {
      setCookieHeader.forEach((cookie: string) => {
        nextResponse.headers.append("Set-Cookie", cookie);
      });
    }

    return nextResponse;
  } catch (error: any) {
    console.error("Refresh API error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: error.response?.data?.error || "Token refresh failed" },
      { status: error.response?.status || 500 }
    );
  }
}
