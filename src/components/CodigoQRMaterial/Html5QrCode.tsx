import { useRef, useCallback, useState } from "react";
import { Html5Qrcode, QrcodeSuccessCallback } from "html5-qrcode";
import { Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Video from "./Video";
import { Modal } from "./styles";

interface Html5PluginProps {
  mode: "user" | "environment";
  fps: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  qrCodeSuccessCallback: QrcodeSuccessCallback;
}

const Html5QrCode = (props: Html5PluginProps) => {
  const {
    fps,
    qrbox,
    aspectRatio,
    disableFlip,
    verbose = false,
    mode,
    qrCodeSuccessCallback,
  } = props;

  const [open, setOpen] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  const handleClose = useCallback(() => {
    setOpen(false);
    const qrCode = scannerRef.current;
    qrCode?.stop().then(() => {
      qrCode?.clear();
    });
  }, []);

  function handleOpen() {
    setOpen(true);
  }

  return (
    <>
      <Button variant="outlined" size="small" onClick={handleOpen}>
        QR
      </Button>
      <Modal open={open}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px 5px 10px 0px",
            cursor: "pointer",
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </Box>
        <Video
          fps={fps}
          qrbox={qrbox}
          aspectRatio={aspectRatio}
          disableFlip={disableFlip}
          verbose={verbose}
          mode={mode}
          qrCodeSuccessCallback={qrCodeSuccessCallback}
        />
      </Modal>
    </>
  );
};
export default Html5QrCode;
