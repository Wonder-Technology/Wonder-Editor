import {WebGLDetectData} from "wonder.js/dist/es2015/renderer/device/WebGLDetectData";
import {EWebGLVersion} from "wonder.js/dist/es2015/renderer/enum/EWebGLVersion";
import {error} from "../../../../../src/utils/logUtils";

export const initForTest = (sandbox) => {
    setWebGLVersion("webgl1");
};

export const setWebGLVersion = (version: "webgl1" | "webgl2") => {
    switch (version) {
        case "webgl1":
            WebGLDetectData.version = EWebGLVersion.WEBGL1;
            break;
        case "webgl2":
            WebGLDetectData.version = EWebGLVersion.WEBGL2;
            break;
        default:
            error(true, `version:${version}`);
            break;
    }
}
