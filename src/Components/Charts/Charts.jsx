// src/components/EChart.js
import React from "react";
import ReactECharts from "echarts-for-react";

function EChart({ option, height = "350px", width = "100%", onEvents = {} }) {
  return (
    <div className="echart-container">
      <ReactECharts
        option={{ backgroundColor: "transparent", ...option }}
        style={{ height, width }}
        notMerge={true}
        lazyUpdate={true}
        opts={{
          renderer: "canvas",
          devicePixelRatio: window.devicePixelRatio,
        }}
        onEvents={onEvents} // ✅ Add this line to handle chart events
      />
    </div>
  );
}

export default EChart;
