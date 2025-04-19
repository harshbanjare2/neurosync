import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define paths that should be protected (require authentication)
  const isProtectedPath = path.startsWith("/dashboard");

  // Define public paths (no authentication required)
  const isPublicPath = path === "/login" || path === "/signup" || path === "/";

  // Check if user is authenticated by looking for the user cookie
  const hasUserCookie = request.cookies.has("user");

  // TEMPORARILY DISABLED FOR TESTING
  // If trying to access protected path without authentication, redirect to login
  // if (isProtectedPath && !hasUserCookie) {
  //   const loginUrl = new URL("/login", request.nextUrl.origin);
  //   loginUrl.searchParams.set("from", path);
  //   return NextResponse.redirect(loginUrl);
  // }

  // TEMPORARILY DISABLED FOR TESTING
  // If already authenticated and trying to access login/signup pages, redirect to dashboard
  // if (isPublicPath && path !== "/" && hasUserCookie) {
  //   return NextResponse.redirect(new URL("/dashboard", request.nextUrl.origin));
  // }

  // Add temporary console log to indicate middleware is being bypassed for testing
  console.log(`Middleware bypassed for testing: ${path}`);

  return NextResponse.next();
}

// Specify which paths the middleware should run on
export const config = {
  matcher: [
    // Match all request paths except for the ones starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
