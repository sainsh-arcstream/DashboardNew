import * as echarts from "echarts";
export const chartsConfig = {
  overview: {
    tooltip: { trigger: "axis" },
    legend: {
      data: ["Attendance", "Punch Accuracy", "Punctuality", "Test"],
      textStyle: { color: "#ccc" },
      bottom: 0,
    },
    grid: { left: "3%", right: "4%", bottom: "12%", containLabel: true },
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar", "Apr", "May"],
      axisLine: { lineStyle: { color: "#666" } },
      axisLabel: { color: "#aaa" },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#666" } },
      axisLabel: { color: "#aaa" },
      splitLine: { lineStyle: { color: "#222" } },
    },
    series: [
      {
        name: "Attendance",
        type: "bar",
        data: [95, 92, 96, 94, 93], // % attendance
        itemStyle: {
          borderRadius: [12, 12, 0, 0], // fully rounded bars
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#3b82f6" },
            { offset: 1, color: "#b4d0f3ff" },
          ]),
        },
      },
      {
        name: "Punch Accuracy",
        type: "bar",
        data: [89, 91, 87, 90, 92], // % punches correct
        itemStyle: {
          borderRadius: [12, 12, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#8b5cf6" },
            { offset: 1, color: "#d5b6f5ff" },
          ]),
        },
      },
      {
        name: "Punctuality",
        type: "bar",
        data: [85, 88, 84, 87, 86], // % on-time
        itemStyle: {
          borderRadius: [12, 12, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#f97316" },
            { offset: 1, color: "#f5bf94ff" },
          ]),
        },
      },
      {
        name: "Test",
        type: "bar",
        data: [72, 74, 76, 75, 73], // avg test/quiz %
        itemStyle: {
          borderRadius: [12, 12, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#22c55e" },
            { offset: 1, color: "#9ee4b7ff" },
          ]),
        },
      },
    ],
  },

  workforce: {
    tooltip: { trigger: "axis" },
    legend: {
      data: ["Developers", "Designers", "Managers"],
      textStyle: { color: "#ccc" },
      bottom: 0,
    },
    xAxis: {
      type: "category",
      data: ["Q1", "Q2", "Q3", "Q4"],
      axisLine: { lineStyle: { color: "#666" } },
      axisLabel: { color: "#aaa" },
    },
    yAxis: {
      type: "value",
      axisLine: { lineStyle: { color: "#666" } },
      axisLabel: { color: "#aaa" },
      splitLine: { lineStyle: { color: "#222" } },
    },
    series: [
      {
        name: "Developers",
        type: "line",
        data: [42, 45, 47, 50], // headcount growing slightly
        lineStyle: { color: "#22c55e", width: 3 },
        itemStyle: { color: "#22c55e" },
        smooth: true,
      },
      {
        name: "Designers",
        type: "line",
        data: [18, 20, 21, 23],
        lineStyle: { color: "#f97316", width: 3 },
        itemStyle: { color: "#f97316" },
        smooth: true,
      },
      {
        name: "Managers",
        type: "line",
        data: [8, 9, 10, 10], // smaller but stable
        lineStyle: { color: "#3b82f6", width: 3 },
        itemStyle: { color: "#3b82f6" },
        smooth: true,
      },
    ],
  },

  badges: {
    tooltip: { trigger: "item" },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: { color: "#ccc" },
    },
    series: [
      {
        name: "Badges",
        type: "pie",
        radius: "50%",
        data: [
          { value: 120, name: "Gold" },
          { value: 180, name: "Silver" },
          { value: 90, name: "Bronze" },
          { value: 40, name: "Others" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  },
};


// export const nestedChart = {
//   tooltip: { trigger: "axis" },
//   xAxis: {
//     type: "category",
//     data: chartsConfig[activeTab].xAxis.data || [],
//     axisLine: { lineStyle: { color: "#666" } },
//     axisLabel: { color: "#aaa" },
//   },
//   yAxis: {
//     type: "value",
//     axisLine: { lineStyle: { color: "#666" } },
//     axisLabel: { color: "#aaa" },
//     splitLine: { lineStyle: { color: "#222" } },
//   },
//   series: [
//     {
//       name: selectedSeries.name,
//       type: "bar",
//       data: selectedSeries.data,
//       itemStyle: {
//         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
//           { offset: 0, color: "#3b82f6" },
//           { offset: 1, color: "#b4d0f3ff" },
//         ]),
//       },
//       barBorderRadius: [10, 10, 0, 0],
//     },
//   ],
// };
