import { Alert, AlertTitle, Box, Button, CircularProgress, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { UserEdit } from "./ReqWithAuth";
import { useState } from "react";

export const Profile = (props) => {
    const [email,setEmail]=useState('')
    const [currency,setCurrency]=useState('usd')
    const [confirm,setConfirm]=useState(false)
    const [wait, setWait] = useState(true);
    useEffect(() => {
        setTimeout(() => {
          setWait(false);
        }, 200);
      }, []);
    useEffect(() => {
        if (props.tok !== false) {
           let mail = sessionStorage.getItem("user_mail");
           setEmail(mail)
           let curr = sessionStorage.getItem("user_currency");
           setCurrency(curr)
           let conf = sessionStorage.getItem("user_confirm");
           setConfirm(conf)
        }
      }, [props.tok]);
  return (
    <Box>
        {wait ? (
        <Box sx={{display:'flex', height:'90vh', width:'80vw'}} justifyContent='center' alignItems='center'>
            <CircularProgress />
        </Box>
      ):props.tok ? (
        <UserEdit name={props.name} setName={props.setName} mail={email} setMail={setEmail} currency={currency} setCurrency={setCurrency} confirm={confirm} setConfirm={setConfirm} token={props.tok} />
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
    </Box>
  );
};
