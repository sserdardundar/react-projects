import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useNavigate } from "react-router-dom";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import {
  Avatar,
  Button,
  ButtonGroup,
  CircularProgress,
  InputBase,
  Menu,
  MenuItem,
  SvgIcon,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { LoginDialog, SignUpDialog } from "./Dialogs";
import { useState } from "react";
import { useEffect } from "react";

const StyledToolbar = styled(Toolbar)({
  backgroundColor: "#14171A",
  display: "flex",
  justifyContent: "space-evenly",
});

const Search = styled("Box")(({ theme }) => ({
  display: "flex",
  gap: "10px",
  color: "gray",
  alignItems: "center",
  backgroundColor: "#14171A",
  justifyContent: "space-between",
  padding: "0",
  borderRadius: 20,
  width: "40%",
  marginLeft: "20%",
  marginRight: "20%",
}));
const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
}));

export default function AppBars(props) {
  const [searchIconStatus, setSearchIconStatus] = useState(true);
  const [profileMenu, setProfileMenu] = useState(false);
  const [popLoginDialog, setPopLoginDialog] = useState(null);
  const [popSignupDialog, setPopSignupDialog] = useState(null);
  const [token, setToken] = useState(false);
  const [ind, setInd] = useState(true);
  const [userMail, setUserMail] = useState("");
  const [userCurrency, setUserCurrency] = useState("usd");
  const [userConfirm, setUserConfirm] = useState(false);
  const [srch, setSrch] = useState("");
  const navigate = useNavigate();
  const inputRef = React.useRef(null);
    const {name,setName}=props
  const srcHandler = () => {
    if (srch !== "") {
      navigate(`/coin/${srch}`);
      setSrch("");
    }
  };
  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      srcHandler();
    }
  };
  useEffect(() => {
    props.setTok(token);
  }, [token]);
  setTimeout(() => {
    setInd(false);
  }, 1000);
  const handleLogOut = () => {
    setToken(false);
    setProfileMenu(false);
    sessionStorage.setItem("auth_token", false);
    navigate("/home");
  };
  useEffect(() => {
    var tempToken = sessionStorage.getItem("auth_token");
    var tempName = sessionStorage.getItem("user_name");
    var tempMail = sessionStorage.getItem("user_mail");
    var tempCurrency = sessionStorage.getItem("user_currency");
    var tempConfirm = sessionStorage.getItem("user_confirm");
    var tempDate = sessionStorage.getItem("token_date");
    if (tempToken === null) {
      tempToken = false;
      tempName = "";
      tempCurrency = "usd";
      tempConfirm = false;
      sessionStorage.setItem("auth_token", tempToken);
      sessionStorage.setItem("user_name", tempName);
      sessionStorage.setItem("user_mail", tempMail);
      sessionStorage.setItem("user_currency", tempCurrency);
      sessionStorage.setItem("user_confirm", tempConfirm);
    }
    if (tempToken !== "false") {
      const tokenDate = new Date().getTime(tempDate);
      const currentDate = new Date().getTime();
      if (((currentDate - tokenDate) / 1000) * 60 > 30) {
        tempToken = false;
        tempName = "";
        tempCurrency = "usd";
        tempConfirm = false;
      }
    } else {
      tempToken = false;
      tempName = "";
      tempCurrency = "usd";
      tempConfirm = false;
    }
    if (tempToken !== token) {
      sessionStorage.setItem("auth_token", tempToken);
      sessionStorage.setItem("user_mail", tempMail);
      sessionStorage.setItem("user_name", tempName);
      sessionStorage.setItem("user_currency", tempCurrency);
      sessionStorage.setItem("user_confirm", tempConfirm);
      setToken(tempToken);
      setName(tempName);
      setUserMail(tempMail);
      setUserCurrency(tempCurrency);
      setUserConfirm(tempConfirm);
    }
  }, []);
  function CustomIcon(props) {
    return (
      <SvgIcon {...props}>
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="399.000000pt"
          height="257.000000pt"
          viewBox="0 0 399.000000 257.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,257.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none"
          >
            <path d="M0 1285 l0 -1285 1995 0 1995 0 0 1285 0 1285 -1995 0 -1995 0 0 -1285z m3371 845 c30 -6 73 -19 96 -30 24 -11 46 -20 50 -20 21 -1 140 -110 163 -150 71 -121 96 -273 86 -525 -3 -93 -8 -282 -12 -420 -3 -137 -10 -281 -16 -320 -22 -143 -101 -255 -226 -317 l-67 -33 -575 0 -575 0 -3 447 -2 448 22 5 c13 3 111 4 218 3 l195 -3 3 -232 2 -233 163 -2 c239 -4 370 1 385 16 10 9 13 110 13 457 0 443 0 444 -22 461 -20 17 -91 18 -1173 18 -899 0 -1156 -3 -1176 -13 -38 -19 -70 -74 -70 -121 0 -48 17 -76 64 -105 32 -20 46 -21 365 -21 302 0 340 -2 419 -21 123 -29 169 -47 237 -92 84 -56 112 -83 151 -153 47 -84 54 -146 54 -521 0 -209 4 -323 10 -323 6 0 10 -4 10 -10 0 -7 -335 -10 -985 -10 -542 0 -985 3 -985 6 0 9 21 47 68 119 92 141 149 231 176 272 l26 43 610 0 610 0 0 88 c0 93 -10 120 -53 144 -16 10 -128 14 -422 18 l-400 6 -85 38 c-97 44 -162 88 -213 145 -50 56 -63 78 -91 154 -21 58 -24 85 -25 209 -2 167 8 229 50 315 67 137 159 217 289 252 73 19 109 20 1331 20 814 1 1275 -2 1310 -9z" />
          </g>
        </svg>
      </SvgIcon>
    );
  }

  return (
    <Box>
      <StyledToolbar>
        <IconButton onClick={() => navigate("/home")}>
          <CustomIcon sx={{ bgcolor: "white" }} />
        </IconButton>
        <Button
          disableRipple
          sx={{ display: { xs: "auto", sm: "none" } }}
          onClick={() => setSearchIconStatus(false)}
        >
          {searchIconStatus ? (
            <SearchIcon sx={{ color: "white", p: 1.5 }} />
          ) : (
            <Search>
              <InputBase
                placeholder="Search..."
                value={srch}
                onChange={(e) => setSrch(e.target.value.toUpperCase())}
                onKeyDown={handleInputKeyDown}
                inputRef={inputRef}
              />
              <Button onClick={srcHandler}>
                <SearchIcon sx={{ color: "primary", p: 1.5 }} />
              </Button>
            </Search>
          )}
        </Button>
        <Box
          sx={{ display: { xs: "none", sm: "block", gap: 8 }, width: "100%" }}
        >
          <Search sx={{ border: 2 }}>
            <Box sx={{ ml: "2vw" }}>
              <InputBase
                placeholder="Search..."
                value={srch}
                onChange={(e) => setSrch(e.target.value.toUpperCase())}
                onKeyDown={handleInputKeyDown}
                inputRef={inputRef}
                sx={{ color: "white" }}
              />
            </Box>
            <Button
              onClick={srcHandler}
              style={{
                backgroundColor: "#3b3d3d",
                color: "white",
                border: 2,
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}
            >
              <SearchIcon />
            </Button>
          </Search>
        </Box>
        {ind ? (
          <CircularProgress />
        ) : token ? (
          <UserBox disableRipple onClick={() => setProfileMenu(true)}>
            <Avatar
              src="https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              sx={{ width: 30, height: 30 }}
            />
            {name !== "" ? (
              <Typography color="white">{name}</Typography>
            ) : null}
          </UserBox>
        ) : (
          <ButtonGroup variant="contained" size="small">
            <Button
              onClick={() => setPopLoginDialog(!popLoginDialog)}
              sx={{ borderRadius: 5 }}
            >
              Login
            </Button>
            <Button
              onClick={() => setPopSignupDialog(!popSignupDialog)}
              sx={{ borderRadius: 5 }}
            >
              Sign Up
            </Button>
          </ButtonGroup>
        )}
      </StyledToolbar>
      {popLoginDialog ? (
        <LoginDialog
          click={popLoginDialog}
          setClick={setPopLoginDialog}
          setTok={setToken}
          setPop={setPopLoginDialog}
          setName={setName}
          setMail={setUserMail}
          setCurrency={setUserCurrency}
          setConfirm={setUserConfirm}
          tok={token}
          currency={userCurrency}
        />
      ) : popSignupDialog ? (
        <SignUpDialog
          click={popSignupDialog}
          setClick={setPopSignupDialog}
          setTok={setToken}
          setPop={setPopSignupDialog}
          setName={setName}
          setMail={setUserMail}
          setCurrency={setUserCurrency}
          setConfirm={setUserConfirm}
          currency={userCurrency}
          tok={token}
        />
      ) : null}
      <Menu
        open={profileMenu}
        onClose={() => setProfileMenu(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ mb: "10px" }}
      >
        <MenuItem onClick={() => navigate("/account/profile")}>
          Profile
        </MenuItem>
        <MenuItem
          onClick={handleLogOut}
          sx={{ color: "red", fontWeight: "bold" }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}
