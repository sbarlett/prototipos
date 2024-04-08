import { Html5Qrcode, QrcodeErrorCallback, QrcodeSuccessCallback } from "html5-qrcode";
import { useCallback, useEffect, useRef } from "react";
import { ContainerVideo } from "./styles";

interface Html5PluginProps {
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  mode: "user" | "environment";
  qrCodeSuccessCallback: QrcodeSuccessCallback;
}

const qrcodeRegionId = "html5qr-code-full-region";

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

  return <ContainerVideo id={qrcodeRegionId}/>;
};

export default Video;
