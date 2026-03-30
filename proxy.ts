import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth/auth";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isProtectedPage = 
    request.nextUrl.pathname.startsWith("/dashboard") || 
    request.nextUrl.pathname.startsWith("/resumes") ||
    request.nextUrl.pathname.startsWith("/profile");

  if (!session) {
    if (isProtectedPage) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  } else {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/resumes/:path*", "/profile/:path*", "/auth/:path*"],
};
