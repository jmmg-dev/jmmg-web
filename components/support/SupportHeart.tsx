"use client";

import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/** Heart of the donations section: beats twice the first time it comes into view. */
export const SupportHeart = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [beat, setBeat] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBeat(true);
          observer.disconnect();
        }
      },
      { threshold: 0.8 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-beat={beat || undefined}
      className="support-heart grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-primary"
    >
      <Heart aria-hidden className="h-8 w-8 fill-current" />
    </div>
  );
};
