import { Box, Button, List, ListItem } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import WalletIcon from "@mui/icons-material/Wallet";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router";

export const IconDrawer = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: "75px", bgcolor: "#212121" }}>
      <List style={{ marginTop: "20px" }}>
        <ListItem>
          <Button
            variant="text"
            size="small"
            sx={{ mb: "10px", color: "white" }}
            onClick={() => navigate("/home")}
          >
            <HomeIcon sx={{ color: "white" }} />
          </Button>
        </ListItem>
        <ListItem>
          <Button
            variant="text"
            size="small"
            sx={{ mb: "10px", color: "white" }}
            justifyContent="center"
            onClick={() => navigate("/userwallet")}
          >
            <WalletIcon sx={{ color: "white" }} />
          </Button>
        </ListItem>
        <ListItem>
          <Button
            variant="text"
            size="small"
            sx={{ mb: "10px", color: "white" }}
            justifyContent="center"
            onClick={() => navigate("/account")}
          >
            <SettingsIcon sx={{ color: "white" }} />
          </Button>
        </ListItem>
      </List>
    </Box>
  );
};
