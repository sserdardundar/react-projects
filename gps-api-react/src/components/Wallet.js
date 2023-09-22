import React from "react";
import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import { GetWallet } from "./ReqWithAuth";
import { useState } from "react";
import { useEffect } from "react";
export const Wallet = (props) => {
  const [wait, setWait] = useState(true);
  const isMd = useMediaQuery("(min-width:1200px)");
  const isMb = useMediaQuery("(min-width:600px)");
  useEffect(() => {
    setTimeout(() => {
      setWait(false);
    }, 200);
  }, []);
  return (
    <>
      {wait ? (
        <Box
          sx={{ display: "flex", height: "90vh", width: "80vw" }}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      ) : props.tok ? (
        <Box sx={{ width: !isMd ? "83vw" : "80vw", display: "flex" }}>
          <GetWallet cur={props.cur} token={props.tok} isMb={isMb} />
        </Box>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Alert severity="error" sx={{ width: "20vw" }}>
            <AlertTitle>Error</AlertTitle>
            <strong>Please Log in</strong>
          </Alert>
        </Box>
      )}
    </>
  );
};
