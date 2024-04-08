import { useRef, useCallback, useState } from "react";
import { Html5Qrcode, Html5QrcodeResult } from "html5-qrcode";
import { Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Video from "./Video";
import { Modal } from "./styles";

const Html5QrCode = () => {
  const [openModal, setOpenModal] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [result, setResult] = useState("");

  const handleClose = useCallback(() => {
    setOpenModal(false);
    const qrCode = scannerRef.current;
    qrCode?.stop().then(() => {
      qrCode?.clear();
    });
  }, []);

  function handleOpen() {
    setOpenModal(true);
  }

  function onScanSuccess(
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) {
    // handle the scanned code as you like, for example:
    console.log(`Resultado del escaneo = ${decodedText}`, decodedResult);
    setResult(decodedText);
    setOpenModal(false)
  }

  return (
    <>
      <Button variant="outlined" size="small" onClick={handleOpen}>
        QR
      </Button>
      <Modal open={openModal}>
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
          fps={80}
          aspectRatio={1.0}
          qrCodeSuccessCallback={onScanSuccess}
          mode={"environment"}
        />
      </Modal>
      <Box>
        <Typography>{result}</Typography>
      </Box>
    </>
  );
};
export default Html5QrCode;
