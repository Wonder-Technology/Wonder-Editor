import {buildFakeGl} from "./glslTool";
import {createState} from "wonder.js/dist/es2015/utils/stateUtils";
import {DeviceManagerData} from "wonder.js/dist/es2015/renderer/device/DeviceManagerData";
import {DirectorData} from "wonder.js/dist/es2015/core/DirectorData";

export const createAndSetFakeGLState = (sandbox) => {
    var state = createFakeGLState(sandbox);

    DirectorData.state = state;

    return state;
};

export const createFakeGLState = (sandbox) => {
    var state = createState(),
        gl = buildFakeGl(sandbox);

    DeviceManagerData.gl = gl;

    return state;
};

export const getGLFromFakeGLState = (state) => {
    return DeviceManagerData.gl;
};

