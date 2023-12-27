import React from "react";
import Grid from "@mui/material/Grid";
import EmptyData from "../../Components/EmptyData/EmptyData";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={2} paddingX={3}>
        <Grid item md={6}>
          <div>hello</div>
        </Grid>
      </Grid>
      <EmptyData />
      <Tooltip
        onClick={(e) => navigate('/add-post')}
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
