import { Dialog, styled } from "@mui/material";


export const ContainerVideo = styled("div")(({ theme }) => ({
  width: "600px",
  height: 'auto',
  [theme.breakpoints.up("lg")]: {
    width: "720px",
    height: '540px'
  },
}));

export const Modal = styled(Dialog)({
  "& .MuiPaper-root": {
    borderRadius: "20px",
    overflow: "hidden",
  },
});
