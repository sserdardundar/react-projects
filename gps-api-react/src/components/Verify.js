import {
  Alert,
  AlertTitle,
  Box,
  Button,
  InputBase,
  LinearProgress,
  Paper,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { edituser, getcode, getuser } from "./ReqWithAuth";

export const Verify = (props) => {
  const [wait, setWait] = useState(true);
  const [code, setCode] = useState("");
  const [op,setOp]=useState(true)
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [mail,setMail]=useState('')
  const [er, setEr] = useState("");
  const [confCode, setConfCode] = useState("");
  const inputRef = React.useRef(null);
    useEffect(()=>{
        if(props.tok!==false){
            let confirm = sessionStorage.getItem("user_confirm");
            setIsConfirmed(confirm==='true')
            let email = sessionStorage.getItem("user_mail");
            setMail(email)
        }
    },[props.tok])
  useEffect(() => {
    setTimeout(() => {
      if (!isConfirmed && props.tok !== "") {
        getcode(props.tok).then((result) => {
          if (result.suc) {
            setConfCode(result.data.verCode);
            setEr("");
          } else {
            setEr(result.error);
            setConfCode("");
          }
        });
      }
    }, 200);
  }, []);
  const handleCode = () => {
    if (code !== "") {
      if (code === confCode) {
        handleConfirm();
        setIsConfirmed(true);
      }
    }
  };
  let children=(null)
  const handleConfirm = () => {
    edituser(props.tok, { isConfirmed: true }).then((result) => {
      if (result.suc) {
        sessionStorage.setItem('user_confirm',true)
        children=(<Snackbar
            open={op}
            autoHideDuration={3000}
            onClose={() => setOp(false)}
          >
            <Alert
              onClose={() => setOp(false)}
              severity={"success"}
              sx={{ width: "100%" }}
            >
              {`${mail} confirmed`}
            </Alert>
          </Snackbar>)
      } else {
        console.log(result.error);
      }
    });
  };
  const NUMERIC_REGEX = /^[0-9]+$/;
  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCode();
    }
    if (
      !NUMERIC_REGEX.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "Delete"
    ) {
      event.preventDefault();
    }
    if (
      code.length === 6 &&
      event.key !== "Backspace" &&
      event.key !== "Delete"
    ) {
      event.preventDefault();
    }
  };
  useEffect(() => {
    setTimeout(()=>{setWait(false)}, 1000);
  }, []);
  return (
    <Box
      sx={{ display: "flex", width: "80vw", maxWidth: "80vw",height:'80vh',mt:'6vh' }}
      justifyContent="center"
      alignItems="center"
    >
      {!wait ? (
        props.tok ? (
          <Box
            sx={{ display: "flex", width: "90vw", maxWidth: "90vw" }}
            justifyContent="center"
            alignItems="center"
          >
            <Paper elevation={5}>
              {!isConfirmed ? (
                <Box
                  sx={{
                    display: "flex",
                    width: "20vw",
                    height: "35vh",
                    borderRadius: 10,
                    flexDirection: "column",
                    rowGap: "5vh",
                  }}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Typography>Email Verification</Typography>
                  <InputBase
                    placeholder="  6 Digit Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    onKeyDown={handleInputKeyDown}
                    inputRef={inputRef}
                    sx={{ border: 1, width: "10vw", display: "flex" }}
                    justifyContent="center"
                    alignItems="center"
                  />
                  <Button variant="text" onClick={handleCode}>
                    Submit
                  </Button>
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    width: "20vw",
                    height: "15vh",
                    borderRadius: 10,
                    flexDirection: "column",
                    rowGap: "5vh",
                  }}
                  justifyContent="center"
                  alignItems="center"
                >
                    {children}
                  <Typography style={{ textAlign: "center" }}>
                    {mail} is verified
                  </Typography>
                </Box>
              )}
            </Paper>
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
        )
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
};
