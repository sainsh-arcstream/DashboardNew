import React from "react";
import ReactECharts from "echarts-for-react";

interface ShiftItem {
  period: string; // e.g. "2023_Q1", "2023_Q2", etc.
  avg_points: number; // the average points in that period
}

interface LineGraphProps {
  data: ShiftItem[];
}

const AveragePointShiftLine: React.FC<LineGraphProps> = ({ data }) => {
  // Extract x (periods) and y (avg_points)
  const periods = data.map((d) => d.period);
  const avgPoints = data.map((d) => d.avg_points);

  const option = {
    backgroundColor: "transparent",
    tooltip: {
      trigger: "axis",
      backgroundColor: "#111827",
      borderColor: "#374151",
      textStyle: { color: "#fff" },
      formatter: (params: any) => {
        const p = params[0];
        return `<b>${p.axisValue}</b><br/>Avg Points: <b>${p.data}</b>`;
      },
    },
    grid: {
      top: 40,
      bottom: 50,
      left: 60,
      right: 30,
    },
    xAxis: {
      type: "category",
      data: periods,
      axisLabel: { color: "#e5e7eb", rotate: 30 },
      axisLine: { lineStyle: { color: "#6b7280" } },
    },
    yAxis: {
      type: "value",
      axisLabel: { color: "#e5e7eb" },
      axisLine: { lineStyle: { color: "#6b7280" } },
      splitLine: { lineStyle: { color: "rgba(255,255,255,0.1)" } },
    },
    series: [
      {
        name: "Avg Points",
        type: "line",
        smooth: true, // smooth curve
        data: avgPoints,
        symbol: "circle",
        symbolSize: 8,
        lineStyle: {
          color: "#3b82f6", // blue line
          width: 3,
        },
        itemStyle: {
          color: "#60a5fa", // blue dots
          borderColor: "#1e40af",
          borderWidth: 2,
        },
        areaStyle: {
          color: "rgba(59,130,246,0.2)", // soft blue gradient fill
        },
        emphasis: {
          focus: "series",
          lineStyle: { width: 4 },
        },
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default AveragePointShiftLine;
