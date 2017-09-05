import { setClearColor as setClearColorAdaptor, setViewport as setDeviceViewport } from "../../adaptor/DeviceAdaptor";
import { render_config } from "wonder.js/dist/es2015/renderer/worker/both_file/data/render_config";
import { setConfigData } from "../../adaptor/RenderConfigAdaptor";
import { createByRGBA } from "../../adaptor/ColorAdaptor";

export const setClearColor = (r: number, g: number, b: number, a: number) => {
    var clearColor = createByRGBA(r, g, b, a);

    setClearColorAdaptor(clearColor);
    setConfigData(render_config, "clearColor", clearColor);
};

export const setViewport = setDeviceViewport;
