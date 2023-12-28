import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import backgroundPlugin from "../../utils/backgroundPlugin";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  backgroundPlugin
);







const BarChart = ({data}) => {

  const mode = useSelector((state) => state.mode);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bar Chart Vertical",
      },
      background:{
        color: mode == 'dark' ? 'rgb(35, 35, 36)' : 'rgb(255, 255, 255)'
      }
    },
  
  };
  return <Bar height={200}  options={options} data={data} />;
};

export default BarChart;
