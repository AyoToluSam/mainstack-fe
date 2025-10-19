import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface RevenueChartProps {
  data: Array<{ date: string; amount: number }>;
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  const customTick = (props: {
    x: number;
    y: number;
    payload: { value: string; index: number };
  }) => {
    const { x, y, payload } = props;
    const isFirstOrLast =
      payload.index === 0 || payload.index === data.length - 1;

    if (!isFirstOrLast) return <g />;

    return (
      <g>
        <circle cx={x} cy={y - 8} r={3} fill="#e5e7eb" />
        <text
          x={x}
          y={y + 16}
          fill="#888"
          fontSize={12}
          textAnchor={payload.index === 0 ? "start" : "end"}
        >
          {payload.value}
        </text>
      </g>
    );
  };

  return (
    <div className="h-[256px] w-full -ml-[80px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 40, left: 80, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF5403" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#FF5403" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            axisLine={{ stroke: "#e5e7eb", strokeWidth: 1 }}
            tickLine={false}
            tick={customTick}
          />
          <YAxis hide />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#FF5403"
            strokeWidth={1}
            fill="none"
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
