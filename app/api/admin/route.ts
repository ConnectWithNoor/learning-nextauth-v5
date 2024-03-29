import { auth } from "@/packages/nextauth/auth";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";

// Role based API Route for Admin
async function GET() {
  const currentSession = await auth();

  if (currentSession?.user?.role === UserRole.ADMIN) {
    return new NextResponse(null, { status: 200 });
  }

  return new NextResponse(null, { status: 403 });
}

export { GET };
