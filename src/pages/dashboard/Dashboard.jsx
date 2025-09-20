import React, { useState } from "react";
import * as echarts from "echarts";
import Charts from "../../Components/Charts/Charts";
import "./Dashboard.css";
import { AnimatePresence, motion } from "framer-motion";
import { chartsConfig } from "../../chartConfig";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedSeries, setSelectedSeries] = useState(null);

  // 🔹 KPI Card
  const KpiCard = ({ title, value, change }) => (
    <div className="card kpi-card">
      <h3 style={{ color: "#fff" }}>{title}</h3>
      <h1 style={{ color: "#fff" }}>{value}</h1>
      <p style={{ color: change >= 0 ? "#22c55e" : "#ef4444" }}>
        {change >= 0 ? "▲" : "▼"} {Math.abs(change)}%
      </p>
    </div>
  );

  // ✅ Detailed drilldown chart logic
  const detailedChartOption = selectedSeries
    ? {
        tooltip: { trigger: "axis" },
        xAxis: {
          type: "category",
          data: chartsConfig[activeTab].xAxis.data || [],
          axisLine: { lineStyle: { color: "#fff" } },
          axisLabel: { color: "#fff" },
        },
        yAxis: {
          type: "value",
          axisLine: { lineStyle: { color: "#fff" } },
          axisLabel: { color: "#fff" },
          splitLine: { lineStyle: { color: "#444" } },
        },
        series: [
          {
            name: selectedSeries.name,
            type: "bar",
            data: selectedSeries.data,
            itemStyle: {
              color: selectedSeries.color || "#3b82f6", // ✅ reuse gradient
            },
            barBorderRadius: [10, 10, 0, 0],
          },
        ],
      }
    : null;

  const onChartClick = (params) => {
    if (params.componentType === "series") {
      const seriesName = params.seriesName;
      const seriesArray = chartsConfig[activeTab]?.series || [];
      const clickedSeries = seriesArray.find((s) => s.name === seriesName);

      if (clickedSeries) {
        let color = clickedSeries.itemStyle?.color;

        // ✅ Rebuild gradient if it's a gradient object
        if (color?.type === "linear" && color?.colorStops) {
          color = new echarts.graphic.LinearGradient(
            color.x || 0,
            color.y || 0,
            color.x2 || 0,
            color.y2 || 1,
            color.colorStops
          );
        }

        setSelectedSeries({
          name: seriesName,
          data: clickedSeries.data,
          xAxis: chartsConfig[activeTab]?.xAxis?.data || [],
          color,
        });
      }
    }
  };


  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        duration: 0.6,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 20px rgba(59, 130, 246, 0.5)",
      transition: { yoyo: Infinity, duration: 0.3 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // 🔥 cascade effect
      },
    },
  };

  return (
    <motion.div
      className="dashboard"
      variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
      initial="hidden"
      animate="visible"
    >
      {/* 🔝 Top banner with tabs */}
      <motion.div className="card banner" variants={containerVariants}>
        <div className="banner-header">
          <h1 style={{ color: "#fff" }}>Bravo4All Analytics</h1>
          <p style={{ color: "#fff" }}>Employee Rewards System Dashboard</p>
        </div>

        <div className="tabs">
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              className={activeTab === "overview" ? "active" : ""}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
            <button
              className={activeTab === "workforce" ? "active" : ""}
              onClick={() => setActiveTab("workforce")}
            >
              Workforce
            </button>
            <button
              className={activeTab === "badges" ? "active" : ""}
              onClick={() => setActiveTab("badges")}
            >
              Badges
            </button>
          </div>

          {selectedSeries && (
            <div>
              <button
                className="active"
                onClick={() => setSelectedSeries(null)}
              >
                Back
              </button>
            </div>
          )}
        </div>

        {/* Main chart or drilldown */}
        <AnimatePresence mode="wait">
          {!selectedSeries ? (
            <motion.div key="main-chart" variants={containerVariants}>
              <Charts
                option={chartsConfig[activeTab]}
                height="250px"
                onEvents={{ click: onChartClick }}
              />
            </motion.div>
          ) : (
            <motion.div key="detailed-chart" variants={cardVariants}>
              <Charts option={detailedChartOption} height="250px" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 🎯 KPIs Row */}
      <motion.div className="kpi-row" variants={cardVariants}>
        <KpiCard title="Avg Points/Shift" value="75" change={5} />
        <KpiCard title="Bonus Projection" value="$1,250" change={-3} />
        <KpiCard title="Recognition Rate" value="82%" change={12} />
        <KpiCard title="Engagement Index" value="56" change={0} />
      </motion.div>

      {/* 🎰 Badge Distribution */}
      <motion.div className="card casino" variants={containerVariants}>
        <Charts
          option={{
            title: {
              text: "Badge Distribution",
              left: "center",
              textStyle: { color: "#fff" },
            },
            tooltip: {},
            xAxis: {
              type: "category",
              data: ["Platinum", "Gold", "Silver", "Bronze", "None"],
              axisLine: { lineStyle: { color: "#fff" } },
              axisLabel: { color: "#fff" },
            },
            yAxis: {
              type: "value",
              axisLine: { lineStyle: { color: "#fff" } },
              axisLabel: { color: "#fff" },
              splitLine: { lineStyle: { color: "#444" } },
            },
            series: [
              {
                data: [12, 30, 45, 20, 5],
                type: "bar",
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#3b82f6" },
                    { offset: 1, color: "#b4d0f3ff" },
                  ]),
                },
                barBorderRadius: [10, 10, 0, 0],
              },
            ],
          }}
          height="250px"
        />
      </motion.div>

      {/* 🏀 Avg Points per Shift */}
      <motion.div className="card sports" variants={containerVariants}>
        <Charts
          option={{
            title: {
              text: "Avg Points per Shift (Quarterly)",
              left: "center",
              textStyle: { color: "#fff" },
            },
            tooltip: { trigger: "axis" },
            xAxis: {
              type: "category",
              data: ["Q1", "Q2", "Q3", "Q4"],
              axisLine: { lineStyle: { color: "#fff" } },
              axisLabel: { color: "#fff" },
            },
            yAxis: {
              type: "value",
              axisLine: { lineStyle: { color: "#fff" } },
              axisLabel: { color: "#fff" },
              splitLine: { lineStyle: { color: "#444" } },
            },
            series: [
              {
                data: [75, 80, 70, 65],
                type: "line",
                smooth: true,
                lineStyle: { color: "#22c55e", width: 3 },
                itemStyle: { color: "#22c55e" },
              },
            ],
          }}
          height="250px"
        />
      </motion.div>

      {/* 🎟 Quarterly Bonus Forecast */}
      <motion.div className="card lottery" variants={containerVariants}>
        <Charts
          option={{
            title: {
              text: "Quarterly Bonus Forecast",
              left: "center",
              textStyle: { color: "#fff" },
            },
            tooltip: { trigger: "axis" },
            xAxis: {
              type: "category",
              data: ["Q1", "Q2", "Q3", "Q4"],
              axisLine: { lineStyle: { color: "#fff" } },
              axisLabel: { color: "#fff" },
            },
            yAxis: {
              type: "value",
              axisLine: { lineStyle: { color: "#fff" } },
              axisLabel: { color: "#fff" },
              splitLine: { lineStyle: { color: "#444" } },
            },
            series: [
              {
                data: [1200, 1500, 1800, 2000],
                type: "line",
                areaStyle: { opacity: 0.3, color: "#3b82f6" },
                lineStyle: { color: "#3b82f6", width: 3 },
                itemStyle: { color: "#3b82f6" },
              },
            ],
          }}
          height="250px"
        />
      </motion.div>

      {/* 🔔 Recognition Activity */}
      <motion.div className="card bingo" variants={containerVariants}>
        <Charts
          option={{
            title: {
              text: "Recognition Activity",
              left: "center",
              textStyle: { color: "#fff" },
            },
            tooltip: { trigger: "item" },
            series: [
              {
                name: "Recognition",
                type: "pie",
                radius: "50%",
                label: { color: "#fff" },
                data: [
                  { value: 120, name: "Peer" },
                  { value: 80, name: "Manager" },
                  { value: 30, name: "Customer" },
                ],
              },
            ],
          }}
          height="250px"
        />
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
