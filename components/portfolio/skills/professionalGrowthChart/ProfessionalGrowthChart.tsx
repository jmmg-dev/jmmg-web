import { TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ProfessionalGrowthChartProps = {
  title: string;
  data: {
    name: string;
    "2020": number;
    "2022": number;
    "2024": number;
    "2026": number;
  }[];
};

export const ProfessionalGrowthChart = ({
  title,
  data,
}: ProfessionalGrowthChartProps) => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 card-interactive">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
      </div>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 70 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
            <XAxis
              dataKey="name"
              stroke="var(--muted-foreground)"
              fontSize={11}
              angle={-45}
              textAnchor="end"
              height={80}
              interval={0}
              tick={{ fill: "var(--muted-foreground)" }}
            />
            <YAxis
              stroke="var(--muted-foreground)"
              fontSize={11}
              domain={[0, 100]}
              tick={{ fill: "var(--muted-foreground)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                color: "var(--foreground)",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => (
                <span style={{ color: "var(--foreground)", fontSize: "12px" }}>{value}</span>
              )}
            />
            <Line
              type="monotone"
              dataKey="2020"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={{ fill: "var(--chart-1)", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="2022"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={{ fill: "var(--chart-2)", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="2024"
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={{ fill: "var(--chart-3)", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="2026"
              stroke="var(--chart-4)"
              strokeWidth={2}
              dot={{ fill: "var(--chart-4)", strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
