import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, LinearProgress, Typography, useMediaQuery } from "@mui/material";
import axios from "axios";

const columns = [
  { field: "name", headerName: "Coin" },
  { field: "time", headerName: "Time", width: "30%" },
  {
    field: "price",
    headerName: "Price",
    type: "number",
    width: "30%",
  },
];

export default function DataTable(props) {
  const [coinListData, setcoinListData] = React.useState([{}]);
  const [coinNumData, setcoinNumData] = React.useState(0);
  const [wait, setWait] = React.useState(true);
  const getRowId = (row) => {
    return row.name + row.age;
  };
  React.useEffect(() => {
    const homeFetcher = async (currency) => {
      const response = await axios.get(`http://localhost:4000/api/v1/home/${props.cur}`,{data:{currency: currency}}
      );
      const data = response.data;
      if (data.success) {
        setcoinNumData(data.data.numberOfCoins);
        setcoinListData(data.data.TopCoins);
      }
    };
    setTimeout(() => {
      setWait(false);
    }, 1000);
    homeFetcher(props.cur);
  }, [props.cur]);
  const rows = coinListData;
  return (
    <Box sx={{ mr:'5vw'}}>
      {!wait ? (
        <Box sx={{ml:'5vw',maxWidth:'600px', height:'80vh'}}>
        {coinNumData !== 0 ? (
          <DataGrid rows={rows} columns={columns} getRowId={getRowId} />
        ) : (
          <p>Loading...</p>
        )}
        </Box>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
}
