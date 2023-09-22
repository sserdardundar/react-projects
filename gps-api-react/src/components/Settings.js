import React, { useEffect } from "react";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import { useNavigate } from "react-router";
import { GetUser, getUser } from "./ReqWithAuth";
import { useState } from "react";

export const Settings = (props) => {
  const [wait, setWait] = useState(true);
  const [confirm,setConfirm]=useState(false)
  useEffect(() => {
    if (props.tok !== false) {
      let conf = sessionStorage.getItem("user_confirm");
      setConfirm(conf==='true')
    }
  }, [props.tok]);
  useEffect(() => {
    setTimeout(() => {
      setWait(false);
    }, 200);
  }, []);
  return (
    <>
      {wait ? (
        <Box sx={{display:'flex', height:'90vh', width:'80vw'}} justifyContent='center' alignItems='center'>
            <CircularProgress />
        </Box>
      ) : props.tok ? (
        <Box sx={{ height: "100%", display: "flex" }}>
          <GetUser token={props.tok} confirm={confirm} />
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
