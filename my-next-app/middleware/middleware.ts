import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
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
