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




const HorizontalBarChart = ({data}) => {

    const mode = useSelector((state) => state.mode);

    const options = {
        indexAxis: 'y',
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Horizontal Bar Chart',
          },
          background:{
            color: mode == 'dark' ? 'rgb(35, 35, 36)' : 'rgb(255, 255, 255)'
          }
        },
      };


  return <Bar height={200}  options={options} data={data} />;
};

export default HorizontalBarChart;
