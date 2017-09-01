import { Map } from "immutable";
import { getChildren, getComponent, getTransform, hasComponent, removeAllChildren } from "./GameObjectAdaptor";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { getScene } from "./SceneAdaptor";
import { Main } from "wonder.js/dist/es2015/core/Main";
import { DataBufferConfig } from "wonder.js/dist/es2015/config/DataBufferConfig";
import { WebGLDetectData } from "wonder.js/dist/es2015/renderer/device/WebGLDetectData";
import { EWebGLVersion } from "wonder.js/dist/es2015/renderer/enum/EWebGLVersion";
import { Log } from "wonder.js/dist/es2015/utils/Log";
import { GPUDetectData } from "wonder.js/dist/es2015/renderer/device/GPUDetectData";
import { DeviceManagerData } from "wonder.js/dist/es2015/renderer/device/DeviceManagerData";
import { createState } from "wonder.js/dist/es2015/utils/stateUtils";
import { DirectorData } from "wonder.js/dist/es2015/core/DirectorData";
import { DomQuery } from "wonder-commonlib/dist/es2015/utils/DomQuery";
import { Director, isDirectorInit as isDirectorInitEngine } from "wonder.js/dist/es2015/core/Director";
import { initAllData } from "wonder.js/dist/es2015/core/Main";
import { CameraController } from "wonder.js/dist/es2015/component/camera/CameraController";
import { Geometry } from "wonder.js/dist/es2015/component/geometry/Geometry";
import { getAspect, getFar, getFovy, getNear } from "./CameraAdaptor";
import { Material } from "wonder.js/dist/es2015/component/material/Material";
import { BasicMaterial, getBasicMaterialColor } from "wonder.js/dist/es2015/component/material/BasicMaterial";
import { Color } from "wonder.js/dist/es2015/structure/Color";
import { MeshRenderer } from "wonder.js/dist/es2015/component/renderer/MeshRenderer";
import { getPosition } from "./TransformAdaptor";
import { ThreeDTransform } from "wonder.js/dist/es2015/component/transform/ThreeDTransform";

export const removeAllChildrenAdaptor = removeAllChildren;

export const getSceneAdaptor = getScene;

export const getChildrenAdaptor = getChildren;

export const getComponentAdaptor = getComponent;

export const hasComponentAdaptor = hasComponent;

export const getTransformComponentAdaptor = (gameObject: GameObject) => {
    return getTransform(gameObject);
}

export const getCameraControllerAdaptor = () => {
    return CameraController;
}

export const getMeshRendererAdaptor = () => {
    return MeshRenderer;
}

export const getMaterialAdaptor = () => {
    return Material;
}

export const getBasicMaterialAdaptor = () => {
    return BasicMaterial;
}

export const getGeometryAdaptor = () => {
    return Geometry;
}

export const getMainAdaptor = () => {
    return Main;
}

export const getColorAdaptor = () => {
    return Color;
}

export const getDataBufferConfigAdaptor = () => {
    return DataBufferConfig;
}

export const getBasicMaterialColorAdaptor = getBasicMaterialColor;

export const setWebGLVersionAdaptor = (version: "webgl1" | "webgl2") => {
    switch (version) {
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

export const setGPUDetectDataAdaptor = (extensionName: string, value: any) => {
    GPUDetectData[extensionName] = value;
}

export const initDataAdaptor = initAllData;

export const getGLAdaptor = () => {
    return DeviceManagerData.gl;
}

export const setGLAdaptor = (gl: any) => {
    DeviceManagerData.gl = gl;
}

export const createStateAdapator = () => {
    return createState();
}

export const setStateAdaptor = (state: Map<any, any>) => {
    DirectorData.state = state;
}

export const getDomQueryAdaptor = () => {
    return DomQuery;
}

export const clearInstance = () => {
    (Director as any)._instance = null;
}

export const getNearAdaptor = getNear;

export const getFarAdaptor = getFar;

export const getAspectAdaptor = getAspect;

export const getFovyAdaptor = getFovy;

export const isDirectorInit = () => isDirectorInitEngine();

export const getPositionAdaptor = (transform: ThreeDTransform) => {
    return getPosition(transform);
}
