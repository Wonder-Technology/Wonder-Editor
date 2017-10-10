import {GPUDetectData} from "wonder.js/dist/es2015/renderer/device/GPUDetectData";

export const setGPUDetectData = (extensionName: string, value: any) => {
    GPUDetectData[extensionName] = value;
};
