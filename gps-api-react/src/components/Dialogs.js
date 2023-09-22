import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

export const LoginDialog = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [er, setEr] = React.useState("");
  const [log, setLog] = React.useState(false);
  const navigate = useNavigate();
  
  const handleLogin = () => {
      try {
          axios
          .post("http://localhost:4000/api/v1/auth/login", {
              email: email,
              password: password,
            })
            .then((result) => {
          const data = result.data;
          if (data.success) {
              sessionStorage.setItem("auth_token", data.data.token);
            sessionStorage.setItem("user_name", data.data.userName);
            sessionStorage.setItem("user_mail", email);
            sessionStorage.setItem("user_currency", data.data.currency);
            sessionStorage.setItem("user_confirm", data.data.isConfirmed);
            props.setName(data.data.userName);
            props.setMail(email);
            props.setCurrency(data.data.currency);
            props.setConfirm(data.data.isConfirmed);
            props.setTok(data.data.token);
          } else {
            setEr(data.error);
        }
        setLog(true);
        });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
      if(er===''&&log===false&&(props.tok!==false)){
          navigate(`/home`);
          props.setClick(false);
        }
        if(er!==''&&log===false){
            setEr('')
        }
    },[log])
    return (
        <>
      <Dialog
        open={props.click}
        onClose={() => {
            props.setClick(false);
        }}
        >
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            fullWidth
            variant="standard"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.setClick(false)}>Cancel</Button>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      <Snackbar
        open={log}
        autoHideDuration={props.tok?500:2000}
        onClose={() => {
          setLog(false);
        }}
      >
        <Alert
          onClose={() => {
              setLog(false);
            }}
            severity={!er?'success':"error"}
            sx={{ width: "100%" }}
            >
          {er?er:'Login SUccessfull'}
        </Alert>
      </Snackbar>
      </Dialog>
    </>
  );
};
export const SignUpDialog = (props) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [er, setEr] = React.useState("");
    const [ers,setErs]=useState([''])
    const [log, setLog] = React.useState(false);
    const navigate = useNavigate();
    const handleClose=()=>{
        if(er!==''||props.tok!==false){
            setEr('')
            setLog(false)
        }
    }
    const handleSignup = () => {
        try {
            axios
            .post(
                "http://localhost:4000/api/v1/auth/register",
                { email: email, password: password, name: name }
                ).then((result) => {
                    const data = result.data;
                    if (data.success) {
                        sessionStorage.setItem("auth_token", data.data.token);
                        sessionStorage.setItem("user_name", name);
                        sessionStorage.setItem("user_mail", email);
                        sessionStorage.setItem("user_currency", 'usd');
                        sessionStorage.setItem("user_confirm", false);
            props.setName(name);
            props.setMail(email);
            props.setCurrency('usd');
            props.setConfirm(false);
            props.setTok(data.data.token);
            
          } else {
            setEr(data.error);
        }
        setLog(true);
        });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(()=>{
    if(er===''&&log===false&&(props.tok!==false)){
        navigate(`/home`);
        props.setClick(false);
    }
  },[log])

  return (
    <>
      <Dialog open={props.click} onClose={()=>{props.setClick(false)}}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            onChange={(e) => setName(e.target.value)}
            label="Name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{props.setClick(false)}}>Cancel</Button>
          <Button onClick={handleSignup}>Sign Up</Button>
        </DialogActions>
        <Snackbar
        open={log}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={!er?'success':"error"}
          sx={{ width: "100%" }}
        >
          {er?er:'Signup SUccessfull'}
        </Alert>
      </Snackbar>
      </Dialog>
    </>
  );
};
