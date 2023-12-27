import { Container, Grid, TextField, Button } from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  date: Yup.date().required("Date is required"),
  totalProductsCount: Yup.number()
    .required("Total Products Count is required")
    .integer("Must be an integer"),
  soldCount: Yup.number()
    .required("Sold Count is required")
    .integer("Must be an integer"),
});

export default function AddData() {

  const token = useSelector((state) => state.token);

  const formik = useFormik({
    initialValues: {
      date: null,
      totalProductsCount: "",
      soldCount: "",
    },
    validationSchema,
    onSubmit:async (values) => {
      try {
        let {data} = await axios.post('/add-data', values, {
          headers: {
            Authorization: `Beare ${token}`
          }
        });
        console.log(data);
      } catch (error) {
        ((error) => {
          toast.error(error.response.data.msg, {
              position: "top-center",
          });
      })(error);
      }
      console.log(values);
    },
  });

  return (
    <Container maxWidth="md" sx={{ height: "100vh", mt: 4 }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker
                value={formik.values.date}
                onChange={(date) => formik.setFieldValue("date", date || null)}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Total Products Count"
              variant="outlined"
              type="number"
              required
              {...formik.getFieldProps("totalProductsCount")}
              error={
                formik.touched.totalProductsCount &&
                Boolean(formik.errors.totalProductsCount)
              }
              helperText={
                formik.touched.totalProductsCount &&
                formik.errors.totalProductsCount
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Sold Count"
              variant="outlined"
              type="number"
              required
              {...formik.getFieldProps("soldCount")}
              error={
                formik.touched.soldCount && Boolean(formik.errors.soldCount)
              }
              helperText={formik.touched.soldCount && formik.errors.soldCount}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Add Dataset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
