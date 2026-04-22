// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { Lang } from "./models/enums";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const themeCookie = request.cookies.get("theme")?.value;
  const langCookie = request.cookies.get("lang")?.value;

  const hasLocale = pathname.startsWith("/es") || pathname.startsWith("/en");

  if (!hasLocale) {
    const targetLang = langCookie || Lang.en;
    const redirectResponse = NextResponse.redirect(
      new URL(`/${targetLang}${pathname}`, request.url),
    );

    if (!themeCookie) {
      redirectResponse.cookies.set("theme", "dark", {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    }
    if (!langCookie) {
      redirectResponse.cookies.set("lang", targetLang, {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
      });
    }

    return redirectResponse;
  }

  const response = NextResponse.next();
  if (!themeCookie) {
    response.cookies.set("theme", "dark", {
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
