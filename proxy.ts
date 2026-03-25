/**
 * Proxy - Auth Protection
 * Checks authentication status and redirects unauthenticated users to login
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Protected route patterns
  const protectedRoutes = ["/dashboard", "/accounts"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  // Redirect to auth if no token and trying to access protected route
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  // Redirect to dashboard if already authenticated and trying to access auth
  if (request.nextUrl.pathname === "/auth" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth",
    "/dashboard/:path*",
    "/transactions/:path*",
    "/accounts/:path*",
  ],
};
