import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export type GrowthData = {
  name: string;
  "2020": number;
  "2022": number;
  "2024": number;
  "2026": number;
}[];

const YEARS = ["2020", "2022", "2024", "2026"] as const;

/** Recharts line chart. Loaded on demand by ProfessionalGrowthChart, so Recharts is not part of the initial JavaScript. */
const GrowthLines = ({ data }: { data: GrowthData }) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart
      data={data}
      margin={{ top: 5, right: 20, left: -10, bottom: 70 }}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        stroke="var(--border)"
        opacity={0.5}
      />
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
          <span style={{ color: "var(--foreground)", fontSize: "12px" }}>
            {value}
          </span>
        )}
      />
      {YEARS.map((year, i) => (
        <Line
          key={year}
          type="monotone"
          dataKey={year}
          stroke={`var(--chart-${i + 1})`}
          strokeWidth={2}
          dot={{ fill: `var(--chart-${i + 1})`, strokeWidth: 2, r: 3 }}
          activeDot={{ r: 5 }}
        />
      ))}
    </LineChart>
  </ResponsiveContainer>
);

export default GrowthLines;
