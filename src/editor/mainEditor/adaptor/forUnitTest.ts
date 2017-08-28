import { Map } from "immutable";
import { getChildren, removeAllChildren } from "./GameObjectAdaptor";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { getScene } from "./SceneAdaptor";
import { Main } from "wonder.js/dist/es2015/core/Main";
import { DataBufferConfig } from "wonder.js/dist/es2015/config/DataBufferConfig";
import { WebGLDetectData } from "wonder.js/dist/es2015/renderer/device/WebGLDetectData";
import { EWebGLVersion } from "wonder.js/dist/es2015/renderer/enum/EWebGLVersion";
import { Log } from "wonder.js/dist/es2015/utils/Log";
import { initData } from "wonder.js/dist/es2015/core/MainSystem";
import { GPUDetectData } from "wonder.js/dist/es2015/renderer/device/GPUDetectData";
import { DeviceManagerData } from "wonder.js/dist/es2015/renderer/device/DeviceManagerData";
import { createState } from "wonder.js/dist/es2015/utils/stateUtils";
import { DirectorData } from "wonder.js/dist/es2015/core/DirectorData";
import { DomQuery } from "wonder.js/dist/es2015/test/forUnitTest";
import { DomQuery as DomQueryCommonLib } from "wonder-commonlib/dist/es2015/utils/DomQuery";

export const removeAllChildrenAdaptor = removeAllChildren;

export const getSceneAdaptor = getScene;

export const getChildrenAdaptor = getChildren;

export const getMainAdaptor = () => {
    return Main;
}

export const getDataBufferConfigAdaptor = () => {
    return DataBufferConfig;
}

export const setWebGLVersionAdaptor = (version:"webgl1"|"webgl2") => {
    switch(version){
        case "webgl1":
            WebGLDetectData.version = EWebGLVersion.WEBGL1;
            break;
        case "webgl2":
            WebGLDetectData.version = EWebGLVersion.WEBGL2;
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW(`version:${version}`));
            break;
    }
}

export const setGPUDetectDataAdaptor = (extensionName:string, value:any) => {
    GPUDetectData[extensionName] = value;
}

export const initDataAdaptor = initData;

export const getGLAdaptor = () => {
    return DeviceManagerData.gl;
}

export const setGLAdaptor = (gl:any) => {
    DeviceManagerData.gl = gl;
}

export const createStateAdapator = () => {
    return createState();
}

export const setStateAdaptor = (state:Map<any, any>) => {
    DirectorData.state = state;
}

export const getDomQueryAdaptor = () => {
    return DomQuery;
}
