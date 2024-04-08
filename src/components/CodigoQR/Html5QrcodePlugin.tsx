import { useRef, useCallback, useState } from "react";
import {
  Html5Qrcode,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from "html5-qrcode";
import { Box, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Modal, Video, VideoContainer } from "./styles";

const qrcodeRegionId = "html5qr-code-full-region";

interface Html5PluginProps {
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  mode: "user" | "environment";
  qrCodeSuccessCallback: QrcodeSuccessCallback;
}

const Html5Plugin = (props: Html5PluginProps) => {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onError: QrcodeErrorCallback = useCallback((_errorMsg, _errorObj) => {},
  []);

  const handleClose = useCallback(() => {
    setOpen(false);
    const qrCode = scannerRef.current;
    qrCode?.stop().then(() => {
      qrCode?.clear();
    });
  }, []);

  const handleOpen = useCallback(() => {
    setOpen(true);

    if (scannerRef.current === null) {
      scannerRef.current = new Html5Qrcode(qrcodeRegionId, verbose);
    }
    const html5Qrcode = scannerRef.current;
    const container = document.getElementById(qrcodeRegionId);
    if (
      html5Qrcode &&
      html5Qrcode.isScanning === false &&
      container?.innerHTML === ""
    ) {
      html5Qrcode.start(
        { facingMode: mode },
        { fps, aspectRatio, disableFlip, qrbox },
        qrCodeSuccessCallback,
        onError
      );
    }

    return () => {
      if (html5Qrcode?.isScanning) {
        html5Qrcode.stop().then(() => {
          html5Qrcode.clear();
        });
      }
      scannerRef.current = null;
    };
  }, [
    fps,
    qrbox,
    aspectRatio,
    disableFlip,
    verbose,
    mode,
    qrCodeSuccessCallback,
    onError,
  ]);

  return (
    <>
      <Button variant="outlined" size="small" onClick={handleOpen}>
        QR
      </Button>

      {/* Blur pantalla completa */}
      <Box
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(16px)",
          zIndex: 999,
          display: open ? "block" : "none",
        }}
      />
      {/* Modal con scaner */}
      <Modal open={open}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "10px 20px 10px 0px",
            width: "100%",
            cursor: "pointer",
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </Box>
        <VideoContainer>
          <Video id={qrcodeRegionId}/>
        </VideoContainer>
      </Modal>
    </>
  );
};
export default Html5Plugin;

// Como inicializarlo?
{
  /* 
  <Html5Plugin mode={"user"} qrCodeSuccessCallback={onScanSuccess} fps={20} />
*/
}
