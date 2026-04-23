// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { Lang, Theme } from "./models/enums";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const themeCookie = request.cookies.get("theme")?.value;
  const langCookie = request.cookies.get("lang")?.value;

  const hasLocale = pathname === "/es" || pathname === "/en";

  if (!hasLocale) {
    const targetLang = langCookie || Lang.en;
    const redirectResponse = NextResponse.redirect(
      new URL(`/${targetLang}/`, request.url),
    );

    if (!themeCookie) {
      createCookie(redirectResponse, "theme", Theme.dark);
    }
    if (!langCookie) {
      createCookie(redirectResponse, "lang", targetLang);
    }

    return redirectResponse;
  }

  const response = NextResponse.next();
  if (!themeCookie) {
    createCookie(response, "theme", Theme.dark);
  }
  if (hasLocale) {
    const lang = pathname.split("/")[1] as Lang;
    createCookie(response, "lang", lang);
  }

  return response;
}

const createCookie = (response: NextResponse, name: string, value: string) => {
  response.cookies.set(name, value, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
