import { create } from "./ColorAdaptor";
import { getDeviceManagerGL, setDeviceManagerClearColor } from "wonder.js/dist/es2015/renderer/device/DeviceManager";

export const getGL = () => {
    return getDeviceManagerGL();
};

export const setClearColor = (r: number, g: number, b: number, a: number) => {
    var color = create();

    color.r = r;
    color.g = g;
    color.b = b;
    color.a = a;

    setDeviceManagerClearColor(color);
};