import { Html5QrcodeResult } from "html5-qrcode";
import Html5PluginDialog from "./Html5QrcodePluginDialog";

const ButtonScann = () => {
  function onScanSuccess(
    decodedText: string,
    decodedResult: Html5QrcodeResult
  ) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
  }

  return (
    <Html5PluginDialog
      mode={"user"}
      qrCodeSuccessCallback={onScanSuccess}
      fps={20}
    />
  );
};

export default ButtonScann;
