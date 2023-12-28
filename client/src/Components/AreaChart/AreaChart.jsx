import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import backgroundPlugin from "../../utils/backgroundPlugin";
import { useSelector } from "react-redux";



ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
    backgroundPlugin
  );
  





const AreaChart = ({data}) => {

    const mode = useSelector((state) => state.mode);

     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Line Chart',
          },
          background:{
            color: mode == 'dark' ? 'rgb(35, 35, 36)' : 'rgb(255, 255, 255)'
          }
        },
      };
    
  return <Line height={200}  options={options} data={data} />;
};

export default AreaChart;
