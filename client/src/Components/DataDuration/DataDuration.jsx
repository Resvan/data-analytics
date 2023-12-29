import { MenuItem, Select } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDuration } from "../../state";

export default function DataDuration() {

  const dispatch = useDispatch();
  const selectedDuration = useSelector((state) => state.duration);

  const data = [
    "All",
    "Year Wise"
  ];

  return (
    <Select value={selectedDuration}  onChange={(e) => dispatch(
        setDuration({
            duration: e.target.value
        })
    )}>
      {data.map((typ, i) => (
        <MenuItem key={i} value={typ}>
          {typ}
        </MenuItem>
      ))}
    </Select>
  );
}
