import { useRef, useCallback, useState } from "react";
import { Html5Qrcode, Html5QrcodeResult } from "html5-qrcode";
import { Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Video from "./Video";
import { Modal } from "./styles";

const Html5QrCode = () => {
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

  function onScanSuccess(
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) {
    // handle the scanned code as you like, for example:
    console.log(`Resultado del escaneo = ${decodedText}`, decodedResult);
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
          mode={"user"}
          fps={40}
          aspectRatio={1.0}
          qrCodeSuccessCallback={onScanSuccess}
        />
      </Modal>
    </>
  );
};
export default Html5QrCode;
