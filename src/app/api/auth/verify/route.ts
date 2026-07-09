import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = request.cookies.get("session")?.value;

    if (!session) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const payload = await decrypt(session);

    return NextResponse.json({
      success: true,
      data: {
        id: payload.id,
        username: payload.username,
        email: payload.email,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid session" },
      { status: 401 }
    );
  }
}
