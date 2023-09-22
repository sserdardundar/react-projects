import {
  Alert,
  AlertTitle,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  Snackbar,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useNavigate } from "react-router";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const dlcoin = async (token, coin) => {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/crypto/coin&time`,
      { headers, data: { crypto: coin } }
    );
    const dat = response.data;
    if (dat.success) {
      return { suc: true, coin: coin };
    }
    return { suc: false, error: dat.error };
  } catch (error) {
    console.error(error);
    return { suc: false, error: error };
  }
};

export const addaCoin = async (token, coin) => {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.post(
      `http://localhost:4000/api/v1/crypto/coin&time`,
      { crypto: [coin] },
      { headers }
    );
    const dat = response.data;
    if (dat.success) {
      return { suc: true, coin: coin };
    } else {
      return { suc: false, error: dat.error };
    }
  } catch (error) {
    console.error(error);
    return [error];
  }
};
export const getuser = async (token) => {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/user/no`, {
      headers,
    });
    const dat = await response.data;
    if (dat.success) {
      return { suc: true, data: dat.data };
    } else {
      return { suc: false, error: dat.error };
    }
  } catch (error) {
    console.error(error);
    return { suc: false, error: error };
  }
};
export const getcode = async (token) => {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.get(`http://localhost:4000/api/v1/user/yes`, {
      headers,
    });
    const dat = await response.data;
    if (dat.success) {
      return { suc: true, data: dat.data };
    } else {
      return { suc: false, error: dat.error };
    }
  } catch (error) {
    console.error(error);
    return { suc: false, error: error };
  }
};
export const edituser = async (token, edit) => {
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const response = await axios.post(
      `http://localhost:4000/api/v1/user/no`,
      { edit },
      { headers }
    );
    const dat = response.data;
    if (dat.success) {
      return { suc: true, data: dat.data };
    } else {
      return { suc: false, error: dat.error };
    }
  } catch (error) {
    console.error(error);
    return [error];
  }
};

export const GetWallet = (props) => {
  const [er, setEr] = useState("");
  const [data, setData] = useState({
    coins: [{ name: "", time: "" }],
    history: [{ name: "", coinHistory: [{ price: "", time: "" }] }],
  });
  const [open, setOpen] = useState(true);
  const [coinHistoryData, setCoinHistoryData] = useState([
    { name: "", coinHistory: [{ price: "", time: "", message: "" }] },
  ]);
  const [coinNames, setCoinNames] = useState([""]);
  const [wait, setWait] = useState(true);
  const [del, setDel] = useState(false);
  const [delEr, setDelEr] = useState("");
  const [delCoin, setDelCoin] = useState("");
  const [empty, setEmpty] = useState(false);
  const [time, setTime] = useState(null);
  const [count, setCount] = useState(0);
  const [progress, setProgress] = useState(false);
  const [sessionDataLoaded, setSessionDataLoaded] = useState(false);
  const isSizeLarge = useMediaQuery("(min-width:1200px)");

  useEffect(() => {
    let tempTime = sessionStorage.getItem("time_interval");
    if (tempTime === null) {
      tempTime = "dflt";
      sessionStorage.setItem("time_interval", tempTime);
      setTime("dflt");
    } else {
      setTime(tempTime);
    }
    setSessionDataLoaded(true);
  }, []);
  useEffect(() => {
    const refCount = sessionStorage.getItem("ref_count");
    if (refCount === null) {
      sessionStorage.setItem("ref_count", 1);
      setCount(1);
    } else {
      setCount(refCount);
      sessionStorage.setItem("ref_count", count + 1);
    }
  }, []);
  useEffect(() => {
    if (count !== 0) {
      sessionStorage.setItem("time_interval", time);
    }
  }, [time]);

  const handleTime = (event, newTime) => {
    if (newTime !== null) {
      setTime(newTime);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const headers = { Authorization: `Bearer ${props.token}` };
  const handleDL = async (value) => {
    const delData = await dlcoin(props.token, value);
    if (delData.suc) {
      setDelEr("");
      setDelCoin(delData.coin);
    } else {
      setDelEr(delData.error);
      setDelCoin("");
    }
    setDel(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/crypto/wallet/${time}`,
          { headers }
        );
        const dat = await response.data;
        if (dat.success) {
          if (dat.errors.length) {
            setEr(dat.errors);
          }
          setData(dat.data);
        } else {
          setEr(dat.error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (sessionDataLoaded) {
      setProgress(true);
      fetchData();
    }
  }, [props.token, delCoin, sessionDataLoaded, time]);
  useEffect(() => {
    if (data.coins.length !== 0) {
      setCoinNames(data.history.map((item) => item.name));
      setCoinHistoryData(data.history.map((item) => item));
    } else {
      setEmpty(true);
      setEr("User wallet is empty");
    }
  }, [data, props.token]);
  useEffect(() => {
    if (coinHistoryData[0].name.length !== 0) {
      setWait(false);
      setProgress(false);
    }
  }, [coinHistoryData]);
  useEffect(() => {
    if (er === "jwt malformed" || delEr === "jwt malformed") {
      setEr("Please Log In");
      setEmpty(true);
    }
    if (er === "User wallet is empty") {
      setEmpty(true);
    }
    if (er === "Unvalid Authentication") {
      setEr("Please Log In");
      sessionStorage.setItem("auth_token", "");
      setEmpty(true);
    }
    if (er.length && !data.length) {
      setWait(false);
      setProgress(false);
    }
  }, [props.token, er, delEr]);
  return (
    <Box sx={{ width: "100vw", height: !props.isMb ? "140vh" : "90vh" }}>
      {!wait ? (
        !empty ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: !props.isMb ? "column" : "row",
              mt: 5,
              gap: isSizeLarge ? 15 : 5,
              ml: 3,
            }}
          >
            <List
              sx={{
                width: !props.isMb ? "90vw" : "50vw",
                height: "80vh",
                overflow: "auto",
                maxHeight: "80vh",
                "& ul": { padding: 0 },
              }}
              subheader={<li />}
            >
              {coinNames.map((symbol) => {
                return (
                  <li>
                    <ul>
                      <ListSubheader>{`Pricelist of  ${symbol}`}</ListSubheader>
                      {coinHistoryData.map((item) => (
                        <>
                          {item.name === symbol
                            ? item.coinHistory.map((save) => (
                                <>
                                  {save.price !== "" ? (
                                    <>
                                      <ListItem>
                                        <ListItemText
                                          primary={`Price: ${save.price}`}
                                          secondary={`Time: ${save.time}`}
                                        />
                                      </ListItem>
                                      <Divider />
                                    </>
                                  ) : (
                                    <>
                                      <ListItem>
                                        <ListItemText
                                          primary={`${save.message}`}
                                        />
                                      </ListItem>
                                      <Divider />
                                    </>
                                  )}
                                </>
                              ))
                            : null}
                        </>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </List>
            <Box
              sx={{
                display: "flex",
                rowGap: "5vh",
                gap: !props.isMb ? "5vw" : null,
                flexDirection: !props.isMb ? "row" : "column",
              }}
            >
              <List
                sx={{
                  width: !props.isMb ? "90vw" : "20vw",
                  maxWidth: "200px",
                  height: !props.isMb ? "30vh" : "40vh",
                  bgcolor: "background.paper",
                  position: "relative",
                  overflow: "auto",
                  maxHeight: "40vh",
                  p: 1,
                  "& ul": { padding: 0 },
                }}
              >
                {coinNames.map((value) => (
                  <ul>
                    <ListItem
                      key={value}
                      disableGutters
                      secondaryAction={
                        <IconButton
                          title="remove coin from wallet"
                          color="secondary"
                          size="medium"
                          onClick={() => handleDL(value)}
                        >
                          <RemoveCircleIcon fontSize="medium" />
                        </IconButton>
                      }
                    >
                      <ListItemText primary={`${value}`} />
                    </ListItem>{" "}
                    <Divider />{" "}
                  </ul>
                ))}
              </List>
              <ToggleButtonGroup
                value={time}
                exclusive
                onChange={handleTime}
                size="small"
                sx={{ height: "4vh" }}
              >
                <ToggleButton
                  value="6m"
                  style={{
                    color: time === "6m" ? "#1f26ff" : "#555859",
                  }}
                >
                  6M
                </ToggleButton>
                <ToggleButton
                  value="3m"
                  style={{
                    color: time === "3m" ? "#1f26ff" : "#555859",
                  }}
                >
                  3M
                </ToggleButton>
                <ToggleButton
                  value="dflt"
                  style={{
                    color: time === "dflt" ? "#1f26ff" : "#555859",
                  }}
                >
                  DFLT
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
            <Snackbar
              open={del}
              autoHideDuration={3000}
              onClose={() => setDel(false)}
            >
              <Alert
                onClose={() => setDel(false)}
                severity={delEr ? "error" : "success"}
                sx={{ width: "100%" }}
              >
                {delEr ? delEr : `${delCoin} is removed from Wallet`}
              </Alert>
            </Snackbar>
            {er.length !== 0 ? (
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                  <Typography>{er}</Typography>
                </DialogContent>
              </Dialog>
            ) : null}
            {progress ? (
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={progress}
                onClick={handleClose}
              >
                <CircularProgress color="primary" />
              </Backdrop>
            ) : null}
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
              <strong>{er}</strong>
            </Alert>
          </Box>
        )
      ) : (
        <Box
          sx={{ display: "flex", height: "90vh", width: "80vw" }}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export const GetCoin = (props) => {
  const headers = { Authorization: `Bearer ${props.token}` };
  const [er, setEr] = useState("");
  const [data, setData] = useState({
    name: "",
    prices: [{ price: "", time: "" }],
  });
  const navigate = useNavigate();
  const [wait, setWait] = useState(true);
  const [addToggle, setAddToggle] = useState(true);
  const [addEr, setAddEr] = useState([""]);
  const [op, setOp] = useState(false);
  const [addd, setAddd] = useState("");
  const [del, setDel] = useState(false);
  const [delEr, setDelEr] = useState("");
  const [delCoin, setDelCoin] = useState("");
  const [prices, setPrices] = useState([{ price: "", time: "" }]);
  const [last, setLast] = useState({ price: "", time: "" });
  const [timeInt, setTimeInt] = useState(null);
  const [cnt, setCnt] = useState(0);
  const [sessionDataLoaded, setSessionDataLoaded] = useState(false);
  useEffect(() => {
    let tempTimeInt = sessionStorage.getItem("time_int");
    if (tempTimeInt === null) {
      tempTimeInt = "1m";
      sessionStorage.setItem("time_int", tempTimeInt);
      setTimeInt("1m");
    } else {
      setTimeInt(tempTimeInt);
    }
    setSessionDataLoaded(true);
  }, []);
  useEffect(() => {
    const refCnt = Number(sessionStorage.getItem("ref_cnt"));
    if (refCnt === null) {
      setCnt(0);
      sessionStorage.setItem("ref_cnt", cnt + 1);
    } else {
      setCnt(cnt + 1);
      sessionStorage.setItem("ref_cnt", cnt + 1);
    }
  }, []);

  useEffect(() => {
    if (cnt !== 0) {
      sessionStorage.setItem("time_int", timeInt);
    }
  }, [timeInt]);

  const handleTimeInt = (event, newTime) => {
    if (newTime !== null) {
      setTimeInt(newTime);
    }
  };
  const handleOp = () => {
    setOp(false);
  };
  const handleAdd = async (coin) => {
    const added = await addaCoin(props.token, coin);
    if (added.suc) {
      setAddd(added.coin);
      setAddEr([""]);
      setAddToggle(!addToggle);
    } else {
      setAddd("");
      if(typeof(added.error)==='string'){
        setAddEr([added.error])
      }
      else{
          setAddEr(added.error);
      }
      if (added.error[0] === `${coin} already exists in Wallet`) {
        setAddToggle(!addToggle);
      }
    }
    setOp(true);
  };
  const handleDL = async (coin) => {
    const delData = await dlcoin(props.token, coin);
    if (delData.suc) {
      setDelEr("");
      setDelCoin(delData.coin);
    } else {
      setDelEr(delData.error);
      setDelCoin("");
    }
    setDel(true);
    setAddToggle(!addToggle);
  };
  useEffect(() => {
    if (addd !== "") {
      navigate("/userwallet");
    }
  }, [addd]);

  const fetchData = async () => {
    const url = `http://localhost:4000/api/v1/crypto/${props.coin}&${timeInt}`;
    try {
      const response = await axios.get(url, { headers });
      const dat = await response.data;
      if (dat.success) {
        setData({
          name: dat.name,
          prices: dat.data.coins.prices,
        });
        setEr("");
      } else {
        setEr(dat.error);
        setData({
          name: "",
          prices: [{ price: "", time: "" }],
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setEr(error);
    }
  };
  useEffect(() => {
    if (props.token !== "" && sessionDataLoaded === true) {
      fetchData();
    }
    setOp(false);
  }, [props.token, props.coin, sessionDataLoaded, timeInt]);

  useEffect(() => {
    if (er === "jwt malformed") {
      setEr("Please Log In");
    }
    if (er.length && data.name === "") {
      setTimeout(() => {
        setWait(false);
      }, 500);
    }
  }, [props.token, er]);

  useEffect(() => {
    if (addEr[0] === "jwt malformed") {
      setEr("Please Log In");
    }
    if (addEr[0] === "Unvalid Authentication") {
      sessionStorage.setItem("auth_token", "");
      navigate("/home");
    }
  }, [addEr, addd]);
  useEffect(() => {
    if (data.prices.length > 1) {
      setPrices(
        data.prices.filter((price) => {
          if (price !== data.prices[0]) {
            return true;
          }
        })
      );
    } else {
      setPrices([{ price: "", time: "" }]);
    }
    setLast(data.prices[0]);
  }, [data]);
  return (
    <Box>
      {data.name !== "" ? (
        <Box>
          <Box
            sx={{ display: "flex", flexDirection: "row", width: "70vw" }}
            justifyContent="center"
            alignItems="center"
          >
            <h1 color="black">{data.name}</h1>
            {addToggle ? (
              <IconButton onClick={(e) => handleAdd(props.coin)}>
                <AddCircleIcon color="primary" />
              </IconButton>
            ) : (
              <IconButton onClick={(e) => handleDL(props.coin)}>
                <RemoveCircleIcon color="error" />
              </IconButton>
            )}
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column" }}
            justifyContent="center"
            alignItems="center"
          >
            <List
              sx={{
                position: "relative",
                overflow: "auto",
                "& ul": { padding: 0 },
              }}
            >
              <ul>
                <ListItem disableGutters>
                  <Divider />{" "}
                  <ListItemText
                    primary={`Price: ${last.price}`}
                    secondary={`Time: ${last.time}`}
                  />
                </ListItem>{" "}
              </ul>
            </List>
            {prices[0].price !== "" ? (
              <Box>
                <List
                  sx={{
                    width: " 60vw",
                    maxWidth: "60vw",
                    height: "60vh",
                    bgcolor: "background.paper",
                    position: "relative",
                    overflow: "auto",
                    maxHeight: "60vh",
                    "& ul": { padding: 0 },
                  }}
                >
                  {prices.map((pric) => (
                    <ul>
                      <ListItem key={pric} disableGutters>
                        <ListItemText primary={`Price: ${pric.price}`} />
                        <ListItemText secondary={`Time: ${pric.time}`} />
                      </ListItem>{" "}
                      <Divider />{" "}
                    </ul>
                  ))}
                </List>
                <ToggleButtonGroup
                  value={timeInt}
                  exclusive
                  onChange={handleTimeInt}
                  size="small"
                  sx={{ height: "4vh" }}
                >
                  <ToggleButton
                    value="6m"
                    style={{
                      color: "black",
                      backgroundColor: timeInt === "6m" ? "#bdaf31" : "#c9e9f0",
                    }}
                  >
                    6M
                  </ToggleButton>
                  <ToggleButton
                    value="3m"
                    style={{
                      color: "black",
                      backgroundColor: timeInt === "3m" ? "#bdaf31" : "#c9e9f0",
                    }}
                  >
                    3M
                  </ToggleButton>
                  <ToggleButton
                    value="1m"
                    style={{
                      color: "black",
                      backgroundColor: timeInt === "1m" ? "#bdaf31" : "#c9e9f0",
                    }}
                  >
                    1M
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            ) : null}
            <Snackbar
              open={del}
              autoHideDuration={3000}
              onClose={() => setDel(false)}
            >
              <Alert
                onClose={() => setDel(false)}
                severity={delEr ? "error" : "success"}
                sx={{ width: "100%" }}
              >
                {delEr ? delEr : `${delCoin} is removed from Wallet`}
              </Alert>
            </Snackbar>
          </Box>
          {addd !== "" ? null : (
            <>
              {addEr.map((eror) => (
                <Snackbar open={op} autoHideDuration={2000} onClose={handleOp}>
                  <Alert
                    onClose={handleOp}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    {eror}
                  </Alert>
                </Snackbar>
              ))}
            </>
          )}
        </Box>
      ) : er.length !== 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Alert severity="error" sx={{ width: "20vw" }}>
            <AlertTitle>Error</AlertTitle>
            <strong>{er}</strong>
          </Alert>
        </Box>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
};

export const GetUser = (props) => {
  const navigate = useNavigate();
  const { confirm } = props;
  return (
    <Box sx={{ width: "80vw" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70vw",
          ml: "5vw",
          mt: "10vh",
          rowGap: "5vh",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", width: "60vw" }}>
          <h2>Notification Prefences</h2>
          <FormGroup
            sx={{ display: "flex", flexDirection: "row", width: "60vw" }}
          >
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Email"
            />
            <FormControlLabel control={<Switch defaultChecked />} label="SMS" />
          </FormGroup>
        </Box>
        <Box sx={{ display: "felx", flexDirection: "column" }}>
          {!confirm ? (
            <Button variant="text" onClick={(e) => navigate("./verify")}>
              Email Verification
            </Button>
          ) : null}
          <Button variant="text" onClick={(e) => navigate("./profile")}>
            Profile Settings
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export const UserEdit = (props) => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const { name, setName, currency, setCurrency, mail, setMail, token } = props;
  const [userCurrency, setUserCurrency] = React.useState(currency);
  const [userName, setUserName] = useState(name);
  const [userMail, setUserMail] = useState(mail);
  const [remain, setRemain] = useState(false);
  const [children, setChildren] = useState(null);
  const [succ,setSucc]=useState(null)
  const [err,setErr]=useState(null)
  const handleExpansion = (panel) => (event, isExpanded) => {
    if (!remain) {
      setExpanded(isExpanded ? panel : false);
    } else {
      handleCancel(expanded);
    }
  };
  const handleChange = (event) => {
    setUserCurrency(event.target.value);
  };
  useEffect(()=>{
    if(succ!==null||err!==null){
        setChildren((<Snackbar open={true} autoHideDuration={2000} onClose={()=>{setChildren(null);setSucc(null);setErr(null)}}>
        <Alert
          onClose={()=>{setChildren(null)}}
          severity={succ?"success":'error'}
          sx={{ width: "100%" }}
        >
          {succ?succ:err}
        </Alert>
      </Snackbar>))
    }
  },[succ,err])
  
  const handleSaves = (element) => {
    if (element === "name") {
      if (userName !== name) {
        edituser(token, { name: userName }).then((result) => {
          const { suc,error} = result;
          if (suc) {
            sessionStorage.setItem("user_name", userName);
            setName(userName);
            setSucc(`${element} changed successfully`)
            setErr(null)
          }
          else{
            setSucc(null)
            setErr(`${error}`)
          }
        });
      }
      else{
        setSucc(null)
        setErr(`No changes found on ${element}`)
      }
    } else if (element === "mail") {
        if (userMail !== mail) {
            edituser(token, { email: userMail,isConfirmed:false }).then((result) => {
              const { suc,error} = result;
              if (suc) {
                sessionStorage.setItem("user_mail", userMail);
                sessionStorage.setItem("user_confirm", false);
                setMail(userMail);
                setSucc(`${element} changed successfully`)
                setErr(null)
              }
              else{
                setSucc(null)
                setErr(`${error}`)
              }
            });
          }
          else{
            setSucc(null)
            setErr(`No changes found`)
          }
    } else if (element === "currency") {
        if (userCurrency !== currency) {
            edituser(token, { currency: userCurrency }).then((result) => {
              const { suc,error } = result;
              if (suc) {
                sessionStorage.setItem("user_currency", userCurrency);
                setCurrency(userCurrency);
                setSucc(`${element} changed successfully`)
                setErr(null)
              }
              else{
                setSucc(null)
                setErr(`${error}`)
              }
            });
          }
          else{
            setSucc(null)
            setErr(`No changes found`)
          }
    }
  };
  useEffect(() => {
    if (userMail !== mail || userName !== name || userCurrency !== currency) {
      setRemain(true);
    } else {
      setRemain(false);
    }
  }, [userMail, name, mail, currency, userName, userCurrency]);
  const handleCancel = (type) => {
    if (!remain) {
      setExpanded("");
    } else {
      setChildren(
        <Dialog
          open={true}
          onClose={() => {
            setChildren(null);
          }}
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Wanna leave without saving ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setChildren(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => handleSaves(type)}>Save</Button>
          </DialogActions>
        </Dialog>
      );
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "70vw",
        ml: "5vw",
        mt: "10vh",
        rowGap: "2vh",
      }}
    >
      <h1>Profile Settings </h1>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "70vw",
          rowGap: "2vh",
        }}
      >
        <Accordion
          expanded={expanded === "name"}
          onChange={handleExpansion("name")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Name</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
              <TextField
                value={userName}
                size="small"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              ></TextField>
              <Box sx={{ display: "flex", gap: 3, flexDirection: "row" }}>
                <Button
                  variant="text"
                  style={{
                    backgroundColor: "#e4ecf7",
                    borderRadius: 25,
                    color: "black",
                  }}
                  onClick={() => handleCancel("name")}
                >
                  Cancel
                </Button>
                <Button
                  variant="text"
                  sx={{ color: "white" }}
                  style={{ backgroundColor: "#006aff", borderRadius: 25 }}
                  onClick={()=>handleSaves('name')}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        {children}
        <Accordion
          expanded={expanded === "mail"}
          onChange={handleExpansion("mail")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Email address</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
              <TextField
                value={userMail}
                size="small"
                onChange={(e) => {
                  setUserMail(e.target.value);
                }}
              ></TextField>
              <Box sx={{ display: "flex", gap: 3, flexDirection: "row" }}>
                <Button
                  variant="text"
                  style={{
                    backgroundColor: "#e4ecf7",
                    borderRadius: 25,
                    color: "black",
                  }}
                  onClick={() => handleCancel("mail")}
                >
                  Cancel
                </Button>
                <Button
                  variant="text"
                  sx={{ color: "white" }}
                  style={{ backgroundColor: "#006aff", borderRadius: 25 }}
                  onClick={()=>handleSaves('mail')}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "currency"}
          onChange={handleExpansion("currency")}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Currency</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: "flex", gap: 2, flexDirection: "column" }}>
              <FormControl sx={{ width: "20vw" }}>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userCurrency}
                  label="Currency"
                  onChange={handleChange}
                >
                  <MenuItem value={"usd"}>US Dollar (USD)</MenuItem>
                  <MenuItem value={"tl"}>Turkish Lira (TL)</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: "flex", gap: 3, flexDirection: "row" }}>
                <Button
                  variant="text"
                  style={{
                    backgroundColor: "#e4ecf7",
                    borderRadius: 25,
                    color: "black",
                  }}
                  onClick={() => handleCancel("currency")}
                >
                  Cancel
                </Button>
                <Button
                  variant="text"
                  sx={{ color: "white" }}
                  style={{ backgroundColor: "#006aff", borderRadius: 25 }}
                  onClick={()=>handleSaves('currency')}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export const DeleteAccount=(props)=>{

    return (
        <Box>
            
        </Box>
    )
}
export const FreezeAccount=(props)=>{

    return (
        <Box>
            
        </Box>
    )
}