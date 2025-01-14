import DeviceDetector from "device-detector-js";
import ip from "ip";

export default function useDetectDevice() {
  const deviceDetector = new DeviceDetector();
  const userAgent =
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36";
  const device = deviceDetector.parse(userAgent);
  const ipAddress = ip.address();
  return {
    ...device,
    ip: ipAddress,
  };
}
