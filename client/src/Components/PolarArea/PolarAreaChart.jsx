import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import backgroundPlugin from "../../utils/backgroundPlugin";
import { useSelector } from "react-redux";

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
  backgroundPlugin
);

export function PolarAreaChart({ data }) {

  const mode = useSelector((state) => state.mode);
  
  return (
    <PolarArea
      data={data}
      options={{
        plugins: {
          background: {
            color: mode == 'dark' ? 'rgb(35, 35, 36)' : 'rgb(255, 255, 255)'
          },
        },
      }}
    />
  );
}
