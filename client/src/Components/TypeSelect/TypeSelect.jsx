import { MenuItem, Select } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setType } from "../../state";

export default function TypeSelect() {
  const dataVisionaltype = [
    "All",
    "Bar Horizontal",
    "Bar Vertical",
    "Bar Stacked",
    "Line Chart",
    "Pie Chart",
    "Polar Chart",
    "Table",
  ];
  const dispatch = useDispatch();
  const selctedType = useSelector((state) => state.type);

  return (
    <Select value={selctedType}  onChange={(e) => dispatch(
        setType({
            year: e.target.value
        })
    )}>
      {dataVisionaltype.map((typ, i) => (
        <MenuItem key={i} value={typ}>
          {typ}
        </MenuItem>
      ))}
    </Select>
  );
}
