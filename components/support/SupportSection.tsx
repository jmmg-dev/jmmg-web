import { SUPPORT_ID, SUPPORT_METHODS } from "@/lib/constants";
import type { SupportDict } from "@/models/types";
import { SupportHeart } from "./SupportHeart";

/** Donations: why support my projects and a button for each way to do it, right above the footer. */
export const SupportSection = ({ dict }: { dict: SupportDict }) => {
  return (
    <section
      id={SUPPORT_ID}
      aria-labelledby="support-title"
      className="relative scroll-mt-16 overflow-hidden py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[360px] opacity-40 [background:radial-gradient(50%_60%_at_50%_100%,var(--neon),transparent_70%)] [mask-image:linear-gradient(to_top,black,transparent)] dark:opacity-15"
      />
      <div className="reveal relative mx-auto flex max-w-2xl flex-col items-center px-4 text-center sm:px-6">
        <SupportHeart />
        <h2 id="support-title" className="mt-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {dict.title}
        </h2>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-pretty text-muted-foreground">
          {dict.text}
        </p>
        <p className="mt-3 text-lg font-medium text-foreground">{dict.thanks}</p>

        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          {SUPPORT_METHODS.map(({ id, url, icon: Icon }, index) => (
            <li key={id}>
              <a
                href={url}
                target="_blank"
                rel="noopener"
                className={`inline-flex items-center gap-2.5 rounded-xl border px-6 py-3 font-semibold transition-[opacity,transform,color,border-color] hover:-translate-y-0.5 ${
                  index === 0
                    ? "border-primary bg-primary text-primary-foreground hover:opacity-90"
                    : "border-border text-foreground hover:border-primary hover:text-primary"
                }`}
              >
                <Icon aria-hidden className="h-5 w-5" />
                {dict.methods[id]}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
