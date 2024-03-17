import { ReactNode } from "react";
import { Box } from "@mui/material";
import Navbar from "../navbar";
import "./style.css";

type PropTypes = {
  children?: ReactNode;
};

const Base = ({ children }: PropTypes) => {
  return (
    <Box className="main-container">
      <Navbar />
      <Box className="page-container">{children}</Box>
    </Box>
  );
};

export default Base;
