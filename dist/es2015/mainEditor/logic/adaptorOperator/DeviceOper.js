import { setClearColor as setClearColorAdaptor } from "../../adaptor/DeviceAdaptor";
import { render_config } from "wonder.js/dist/es2015/renderer/worker/both_file/data/render_config";
import { setConfigData } from "../../adaptor/RenderConfigAdaptor";
import { createByRGBA } from "../../adaptor/ColorAdaptor";
export var setClearColor = function (r, g, b, a) {
    var clearColor = createByRGBA(r, g, b, a);
    setClearColorAdaptor(clearColor);
    setConfigData(render_config, "clearColor", clearColor);
};
//# sourceMappingURL=DeviceOper.js.map