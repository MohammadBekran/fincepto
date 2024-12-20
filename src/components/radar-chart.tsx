import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart as RechartsRadar,
  ResponsiveContainer,
} from "recharts";

const RadarChart = ({ data }: { data?: { name: string; value: number }[] }) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <RechartsRadar data={data} cx="50%" cy="50%" outerRadius="60%">
        <PolarGrid />
        <PolarAngleAxis dataKey="name" style={{ fontSize: "12px" }} />
        <PolarRadiusAxis style={{ fontSize: "12px" }} />
        <Radar
          dataKey="value"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.6}
        />
      </RechartsRadar>
    </ResponsiveContainer>
  );
};

export default RadarChart;
