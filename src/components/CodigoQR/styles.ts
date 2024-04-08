import { Box, styled } from "@mui/material";

export const VideoContainer = styled(Box)({
  width: "100%",
  height: "auto",
  maxWidth: "100%",
});

export const Video = styled("div")(({ theme }) => ({
  video: {
    borderRadius: "0px 0px 20px 20px",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "600px",
  },
  [theme.breakpoints.up("xl")]: {
    width: "100%",
  },
}));

// Al usar dialog tengo problema con el canvas
export const Modal = styled(Box)<{ open: boolean }>(({ theme, open }) => ({
  display: open ? "flex" : "none",
  flexDirection: "column",
  alignItems: "center",
  margin: "20px auto",
  borderRadius: "20px",
  backgroundColor: "#fff",
  boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.2)",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 1000,
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    top: "initial",
    left: "0",
    transform: "none",
    right: "0",
    maxWidth: "90%",
  },
  [theme.breakpoints.up("sm")]: {
    maxWidth: "500px",
    top: "initial",
    left: "0",
    right: "0",
    transform: "none",
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: "600px",
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: "720px",
  },
}));
