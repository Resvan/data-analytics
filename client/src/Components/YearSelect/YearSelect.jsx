import { Grid, MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import { toast, Toaster } from "react-hot-toast";
import { setYear } from "../../state";

export default function YearSelect() {


    const token = useSelector((state) => state.token);
    const selectedYear = useSelector((state) => state.year);
    const [yearList, setYearList] = useState([]);
    const dispatch = useDispatch();

    async function getYearList() {
        try {
          let { data } = await axios.get(`/data/unique-years`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setYearList(data);
        } catch (error) {
          ((err) => {
            toast.error(err, {
              position: "top-center",
            });
          })(error.response.data.error);
        }
      }

    useEffect(()=>{
        getYearList();
    },[])

  return (

      <Select
        value={selectedYear}
        onChange={(e) => dispatch(
            setYear({
                year: e.target.value
            })
        )}
      >
        {
            yearList.map((year,i)=> <MenuItem key={i} value={year}>{year}</MenuItem>)
        }

      </Select>
  );
}
