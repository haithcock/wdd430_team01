import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname, origin } = req.nextUrl;
    const protectedPaths = ["/sell", "/api/products"];
    const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
    const token = req.nextauth?.token;
    if (isProtected && !token) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/signin";
      url.searchParams.set("callbackUrl", origin + pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        const protectedPaths = ["/sell", "/api/products"];
        const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
        if (!isProtected) return true;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/sell", "/sell/:path*", "/api/products"],
};
