import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import backgroundPlugin from "../../utils/backgroundPlugin";
import { useSelector } from "react-redux";

ChartJS.register(ArcElement, Tooltip, Legend, backgroundPlugin);

export function PieChart({ data }) {
  const mode = useSelector((state) => state.mode);

  return (
    <Pie
      data={data}
      options={{
        plugins: {
          background: {
            color: mode == "dark" ? "rgb(35, 35, 36)" : "rgb(255, 255, 255)",
          },
        },
      }}
    />
  );
}
