import React, { useEffect } from "react";
import AppBars from "./AppBars";
import { Box } from "@mui/material";
import { DrawerX } from "./Drawer";
import { useNavigate } from "react-router";

export const NotFound = () => {
  const [status, setStatus] = React.useState(true);
  const [wait, setWait] = React.useState(true);
  const navigate = useNavigate();
  useEffect(()=>{
      setTimeout(() => {
        setWait(false);
      }, 2000);
  }
  )
  return (
    <Box sx={{mt: "6vh"}}>
      <h1>Not Found 404</h1>
      {!wait?(navigate('/home')):null}
    </Box>
  );
};
