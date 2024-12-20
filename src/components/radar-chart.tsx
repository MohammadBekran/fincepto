import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const RadarCharat = ({
  data,
}: {
  data?: { name: string; value: number }[];
}) => {
  console.log({ data });

  return (
    // <ResponsiveContainer width="100%" height={350}>
    //   <RechartsRadar data={data} cx="50%" cy="50%" outerRadius="60%">
    //     <PolarGrid />
    //     <PolarAngleAxis dataKey="name" style={{ fontSize: "12px" }} />
    //     <PolarRadiusAxis style={{ fontSize: "12px" }} />
    //     <Radar
    //       dataKey="value"
    //       stroke="#3b82f6"
    //       fill="#3b82f6"
    //       fillOpacity={0.6}
    //     />
    //   </RechartsRadar>
    // </ResponsiveContainer>
    <ResponsiveContainer width="100%" height={350}>
      <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
        <PolarGrid />
        <PolarAngleAxis style={{ fontSize: "12px" }} dataKey="name" />
        <PolarRadiusAxis style={{ fontSize: "12px" }} />
        <Radar
          dataKey="value"
          stroke="#3b82f6"
          fill="#3b82f6"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RadarCharat;
