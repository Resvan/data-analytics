import React from "react";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";

function TableComponent({ labels, data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sl No</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right">Sold</TableCell>
            <TableCell align="right">Remaining</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {labels?.map((label, index) => {
            const rowData = data?.find((item) => item.id === index - 1);

            return (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {label}
                </TableCell>
                <TableCell align="right">{rowData?.data.total || 0}</TableCell>
                <TableCell align="right">{rowData?.data.sold || 0}</TableCell>
                <TableCell align="right">
                  {rowData?.data.total - rowData?.data.sold || 0}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableComponent;
