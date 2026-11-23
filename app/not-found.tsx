import { getInformationAction } from "@/actions/information";
import { Footer } from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { Lang } from "@/models/enums";
import { House } from "lucide-react";
import { cookies, headers } from "next/headers";
import Link from "next/link";

const isLang = (value: string | undefined): value is Lang =>
  !!value && (Object.values(Lang) as string[]).includes(value);

/**
 * Language of the page that was not found. Next does not pass params here, so it comes from
 * the x-lang header set by the middleware ("/es/..." -> es); paths the middleware skips, such
 * as "/something.txt", fall back to the language cookie and then to English.
 */
const notFoundLang = async (): Promise<Lang> => {
  const fromPath = (await headers()).get("x-lang") ?? undefined;
  if (isLang(fromPath)) return fromPath;
  const fromCookie = (await cookies()).get("lang")?.value;
  return isLang(fromCookie) ? fromCookie : Lang.en;
};

/** 404 page for any URL that does not exist, with the site header and footer (Next adds noindex). */
export default async function NotFound() {
  const lang = await notFoundLang();
  const data = await getInformationAction(lang);
  const dict = data.notFound;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <title>{`404 · ${dict.title} | ${data.seo.siteName}`}</title>
      <Header dict={data.nav} selectedLang={lang} page="other" />
      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pt-28 pb-20 sm:px-6">
        {/* Glow in the theme colour, like the intro section of the home page */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[480px] [mask-image:linear-gradient(to_bottom,black,transparent)] opacity-50 [background:radial-gradient(50%_60%_at_50%_0%,var(--neon),transparent_70%)] dark:opacity-20"
        />
        <div className="relative flex max-w-xl flex-col items-center text-center">
          <h1 className="flex flex-col items-center">
            <span className="not-found-code neon-text text-[clamp(6rem,22vw,11rem)] leading-none font-black tracking-tight text-primary">
              404
            </span>
            <span className="mt-4 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-5xl">
              {dict.title}
            </span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
            {dict.text}
          </p>
          <Link
            href={`/${lang}`}
            className="mt-10 inline-flex items-center gap-2.5 rounded-xl border border-primary bg-primary px-6 py-3 font-semibold text-primary-foreground transition-[opacity,transform] hover:-translate-y-0.5 hover:opacity-90"
          >
            <House aria-hidden className="h-5 w-5" />
            {dict.home}
          </Link>
        </div>
      </main>
      <Footer lang={lang} data={data} />
    </div>
  );
}
