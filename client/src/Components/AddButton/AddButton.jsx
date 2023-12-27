import React from "react";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import { AddCircle as AddCircleIcon } from "@mui/icons-material";

export default function AddButton({size}) {
  return (
    <Link to="/add-data" underline="none">
      <IconButton color="primary" aria-label="Add Data" sx={{ fontSize: 100 }}>
        <AddCircleIcon fontSize={`${size}`} />
      </IconButton>
    </Link>
  );
}
