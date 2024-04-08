import { useRef, useCallback, useState, useEffect } from "react";
import {
  Html5Qrcode,
  QrcodeErrorCallback,
  QrcodeSuccessCallback,
} from "html5-qrcode";
import { Box, Button, Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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

const Video = (props: Html5PluginProps) => {
  const {
    fps,
    qrbox,
    aspectRatio,
    disableFlip,
    verbose = false,
    mode,
    qrCodeSuccessCallback,
  } = props;
  const scannerRef = useRef<Html5Qrcode | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onError: QrcodeErrorCallback = useCallback((_errorMsg, _errorObj) => {},
  []);
  useEffect(() => {
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
    <div id={qrcodeRegionId} style={{ width: "400px", height: "auto" }} />
  );
};

const Html5PluginDialog = (props: Html5PluginProps) => {
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

      {/* Modal con scaner */}
      <Dialog open={open}>
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

        <Video
          fps={fps}
          qrbox={qrbox}
          aspectRatio={aspectRatio}
          disableFlip={disableFlip}
          verbose={verbose}
          mode={mode}
          qrCodeSuccessCallback={qrCodeSuccessCallback}
        />
      </Dialog>
    </>
  );
};
export default Html5PluginDialog;
