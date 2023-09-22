import React from "react";
import { Alert, AlertTitle, Box } from "@mui/material";
import { useParams } from "react-router";
import { GetCoin } from "./ReqWithAuth";

export const Coin = (props) => {
  const { coin } = useParams();
  return (
    <>{props.tok?
    <Box sx={{ height: "85vh", p: "4",mt:'6vh' }}>
      <GetCoin coin={coin} token={props.tok} />
    </Box>:<Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "90vh" }}
      >
        <Alert severity="error" sx={{ width: "20vw" }}>
          <AlertTitle>Error</AlertTitle>
          <strong>Please Log in</strong>
        </Alert>
      </Box>}
    </>
  );
};
