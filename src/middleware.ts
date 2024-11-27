import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

export default async function middleware(req: NextRequest) {
  const protectedRoutes = ["/user"];
  const currentRoute = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentRoute);
  if (isProtectedRoute) {
    const cookie = (await cookies()).get("session")?.value;
    const session = await decrypt(cookie!);
    console.log("Cookie:", cookie);
    console.log("Session:", session);

    if (!session?.accountId) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/user/:path*",
};
