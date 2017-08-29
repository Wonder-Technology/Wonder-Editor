import { getDeviceManagerGL, setDeviceManagerClearColor, setDeviceManagerViewport } from "wonder.js/dist/es2015/renderer/device/DeviceManager";
import { Color } from "wonder.js/dist/es2015/structure/Color";

export const getGL = () => {
    return getDeviceManagerGL();
};

export const setClearColor = (color: Color) => {
    setDeviceManagerClearColor(color);
};

export const setViewport = (x:number, y:number, width:number, height:number) => {
    setDeviceManagerViewport(x, y, width, height);
};
