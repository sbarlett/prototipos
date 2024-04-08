import { Html5QrcodeResult } from "html5-qrcode";
import Html5QrCode from "./Html5QrCode";

const ButtonScann = () => {
  function onScanSuccess(
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) {
    // handle the scanned code as you like, for example:
    console.log(`Resultado del escaneo = ${decodedText}`, decodedResult);
  }

  return (
    <Html5QrCode
      mode={"user"}
      qrCodeSuccessCallback={onScanSuccess}
      fps={60}
      aspectRatio={1.0}
    />
  );
};

export default ButtonScann;
