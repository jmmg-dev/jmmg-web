"use client";

import { TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { GrowthData } from "./GrowthLines";

// Recharts is only needed for this chart, further down the CV: it is downloaded when the chart
// is about to scroll into view, so it does not compete with the initial load. Its box keeps
// the same height meanwhile, so nothing moves when it appears.
const GrowthLines = dynamic(() => import("./GrowthLines"), { ssr: false });

type ProfessionalGrowthChartProps = {
  title: string;
  data: GrowthData;
};

export const ProfessionalGrowthChart = ({
  title,
  data,
}: ProfessionalGrowthChartProps) => {
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-card border border-border rounded-xl p-6 card-interactive">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div ref={box} className="h-[350px]">
        {visible && <GrowthLines data={data} />}
      </div>
    </div>
  );
};
