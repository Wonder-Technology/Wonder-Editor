import { getDeviceManagerGL, setDeviceManagerClearColor } from "wonder.js/dist/es2015/renderer/device/DeviceManager";
import { Color } from "wonder.js/dist/es2015/structure/Color";

export const getGL = () => {
    return getDeviceManagerGL();
};

export const setClearColor = (color:Color) => {
    setDeviceManagerClearColor(color);
};