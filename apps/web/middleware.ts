import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard"];
export default function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get('token')
  if (
    !tokenCookie &&
    protectedRoutes.includes(req?.nextUrl?.pathname)
  ) {
    const absoluteUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  return NextResponse.next();
}
