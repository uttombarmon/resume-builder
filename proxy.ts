import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const sessionResponse = await fetch(`${request.nextUrl.origin}/api/auth/get-session`, {
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  const session = sessionResponse.ok ? await sessionResponse.json() : null;

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth");
  const isProtectedPage = request.nextUrl.pathname.startsWith("/dashboard") || 
                         request.nextUrl.pathname.startsWith("/resumes");

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
  matcher: ["/dashboard/:path*", "/resumes/:path*", "/auth/:path*"],
};
