import React from "react";
import DataTable from "./tp20";
import { Box, LinearProgress, useMediaQuery } from "@mui/material";
export const Home = (props) => {
  const [wait, setWait] = React.useState(true);
  const isMobile=useMediaQuery('(min-width:600px)')
  React.useEffect(() => {
    setTimeout(() => {
      setWait(false);
    }, 1000);
  }, []);
  return (
    <Box sx={{mt:'3vh', width:!isMobile?'90vw':'80vw'}}>
      <DataTable cur={props.cur} isMobile={isMobile}/>
    </Box>
  );
};
