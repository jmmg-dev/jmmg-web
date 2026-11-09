"use client";

import type { ProjectScreen } from "@/lib/projects";
import { useEffect, useRef, useState } from "react";

const INTERVAL_MS = 3800;

type ScreenCarouselProps = {
  screens: ProjectScreen[];
  host: string;
  alt: string;
  eager?: boolean;
};

/**
 * Browser window that cycles through the website's screens.
 * It only advances while visible and when the user has not asked for reduced motion.
 */
export const ScreenCarousel = ({ screens, host, alt, eager = false }: ScreenCarouselProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(media.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.35,
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reducedMotion || screens.length < 2) return;
    const id = window.setInterval(() => setActive((i) => (i + 1) % screens.length), INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [visible, reducedMotion, screens.length, active]);

  return (
    <div ref={ref} className="project-frame relative overflow-hidden">
      <div className="project-frame-bar flex items-center gap-3 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="project-frame-url flex-1 truncate px-3 py-1 text-center text-[11px]">
          {host}
          <span key={active} className="project-frame-path">
            {screens[active]?.path}
          </span>
        </span>
        <div className="hidden gap-1.5 sm:flex">
          {screens.map((screen, i) => (
            <button
              key={screen.image}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${host}${screen.path || "/"}`}
              aria-current={i === active}
              className="project-frame-dot h-1.5 rounded-full transition-all duration-300"
              style={{ width: i === active ? 18 : 6 }}
            />
          ))}
        </div>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden">
        {screens.map((screen, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={screen.image}
            src={screen.image}
            alt={i === active ? `${alt} · ${host}${screen.path || "/"}` : ""}
            aria-hidden={i !== active}
            loading={eager && i === 0 ? "eager" : "lazy"}
            decoding="async"
            className="project-screen absolute inset-0 h-full w-full object-cover object-top"
            data-active={i === active}
          />
        ))}
      </div>
    </div>
  );
};
