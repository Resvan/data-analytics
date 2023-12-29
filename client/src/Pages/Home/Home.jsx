import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import EmptyData from "../../Components/EmptyData/EmptyData";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import BarChart from "../../Components/VerticalBarChart/VerticalBarChart";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { toast } from "react-hot-toast";
import YearSelect from "../../Components/YearSelect/YearSelect";
import HorizontalBarChart from "../../Components/HorizontalBarChart/HorizontalBarChart";
import StackedBarChart from "../../Components/StackedBarChart/StackedBarCart";
import AreaChart from "../../Components/AreaChart/AreaChart";
import { PieChart } from "../../Components/PieChart/PieChart";
import { PolarAreaChart } from "../../Components/PolarArea/PolarAreaChart";
import TypeSelect from "../../Components/TypeSelect/TypeSelect";
import TableComponent from "../../Components/TableComponent/TableComponent";
import DataDuration from "../../Components/DataDuration/DataDuration";



export default function Home() {

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [tabletData, setTableData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const token = useSelector((state) => state.token);
  const selectedYear = useSelector((state) => state.year);
  const type = useSelector((state) => state.type);
  const selectedDuration = useSelector((state) => state.duration);
  const [allData, setAllData] = useState({});
  const [tableAll, setTableAll] = useState([]);
  const [allPie, setAllPie] = useState({});


  async function getChartData() {
    try {
      let { data } = await axios.get(`/data?year=${selectedYear}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTableData(data);

      const monthlyData = Array(12).fill({ data: { total: 0, sold: 0 } });

      await data.forEach((item) => {
        const monthIndex = item.id - 1;
        monthlyData[monthIndex] = item.data;
      });

      const updatedChartData = {
        labels,
        datasets: [
          {
            label: "Total",
            data: monthlyData.map((month) => month.total),
            borderColor: "rgba(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Sold",
            data: monthlyData.map((month) => month.sold),
            borderColor: "rgba(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      };

      const updatedpieChartData = {
        labels,
        datasets: [
          {
            label: "Sold",
            data: monthlyData.map((month) => month.sold),
            backgroundColor: [
              "rgba(255, 165, 0, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(128, 0, 0, 0.5)",
              "rgba(0, 0, 128, 0.5)",
              "rgba(255, 192, 203, 0.5)",
              "rgba(0, 128, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
              "rgba(0, 0, 255, 0.5)",
              "rgba(128, 128, 0, 0.2)",
              "rgba(255, 0, 255, 0.2)",
              "rgba(255, 255, 0, 0.2)",
              "rgba(0, 128, 128, 0.2)",
            ],
          },
        ],
      };
      setPieChartData(updatedpieChartData);
      setData(updatedChartData);
    } catch (error) {
      ((err) => {
        toast.error(err, {
          position: "top-center",
        });
      })(error.response.data.error);
    }
  }

  async function getChartDataAll(){
    try {
      let { data } = await axios.get(`/data/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

     setTableAll(data);
     const chartData = {
      labels: data.map((d)=> d.id),
      datasets:[
        {
          label: "Total",
          data: data.map((d) => d.data.total),
          borderColor: "rgba(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Sold",
          data: data.map((d) => d.data.sold),
          borderColor: "rgba(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ]
     }

     const generateRandomColor = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };

     const pieChartData = {
      labels: data.map((d)=> d.id),
      datasets: [
        {
          label: "Sold",
          data: data.map((d) => d.data.sold),
          backgroundColor: data.map(() => generateRandomColor()),
        },
      ],
    
    };
    setAllPie(pieChartData);

     setAllData(chartData);
     
    } catch (error) {
      ((err) => {
        toast.error(err, {
          position: "top-center",
        });
      })(error.response.data.error);
    }
  }

  useEffect(() => {
    getChartData();
    getChartDataAll();
  }, [selectedYear, selectedDuration]);

  return (
    <>
      {tabletData.length > 0 || tableAll.length > 0 ? (
        <Grid container spacing={2} paddingX={3} marginTop={3}>
          <Grid item xs={12} sx={{ display: "flex", justifyContent:"space-between" }}>
            <DataDuration/>
            {
              selectedDuration == "Year Wise" && 
              <YearSelect/>
            }
            <TypeSelect />
          </Grid>
          {type === "Bar Vertical" || type === "All" ? (
            <Grid item xs={12} md={6}>
              <BarChart data={selectedDuration === 'Year Wise' ? data : allData} />
            </Grid>
          ) : null}

          {type === "Bar Horizontal" || type === "All" ? (
            <Grid item xs={12} md={6}>
              <HorizontalBarChart data={selectedDuration === 'Year Wise' ? data : allData} />
            </Grid>
          ) : null}

          {type === "Bar Stacked" || type === "All" ? (
            <Grid item xs={12} md={6}>
              <StackedBarChart data={selectedDuration === 'Year Wise' ? data : allData} />
            </Grid>
          ) : null}

          {type === "Line Chart" || type === "All" ? (
            <Grid item xs={12} md={6}>
              <AreaChart data={selectedDuration === 'Year Wise' ? data : allData} />
            </Grid>
          ) : null}

          {type === "Pie Chart" || type === "All" ? (
            <Grid item xs={12} md={6}>
              <PieChart data={selectedDuration === 'Year Wise' ? pieChartData : allPie} />
            </Grid>
          ) : null}
          {type === "Polar Chart" || type === "All" ? (
            <Grid item xs={12} md={6}>
              <PolarAreaChart data={selectedDuration === 'Year Wise' ? pieChartData : allPie} />
            </Grid>
          ) : null}
          {type === "Table" || type === "All" ? (
            <Grid item xs={12} md={6}>
              <TableComponent labels={labels} data={selectedDuration === 'Year Wise' ? tabletData : tableAll} all={selectedDuration === 'Year Wise' ? false : true} />
            </Grid>
          ) : null}
        </Grid>
      ) : (
        <EmptyData />
      )}
      <Tooltip
        onClick={(e) => navigate("/add-data")}
        title="Add Data"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
    </>
  );
}
