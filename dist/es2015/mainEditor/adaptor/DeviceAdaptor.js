import { getDeviceManagerGL, setDeviceManagerClearColor } from "wonder.js/dist/es2015/renderer/device/DeviceManager";
export var getGL = function () {
    return getDeviceManagerGL();
};
export var setClearColor = function (color) {
    setDeviceManagerClearColor(color);
};
//# sourceMappingURL=DeviceAdaptor.js.map