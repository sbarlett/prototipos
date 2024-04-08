import { Dialog, styled } from "@mui/material";

export const ContainerVideo = styled("div")({
  width: "100%",
  height: "auto",
  "& video, & canvas": {
    width: "100% !important",
    height: "auto !important",
  },
});

export const Modal = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "20px",
    overflow: "hidden",
    width: "600px",
    [theme.breakpoints.up("lg")]: {
      width: "720px",
    },
  },
}));
