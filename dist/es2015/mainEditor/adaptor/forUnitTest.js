import { getChildren, getComponent, getTransform, hasComponent, removeAllChildren } from "./GameObjectAdaptor";
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
import { Director } from "wonder.js/dist/es2015/core/Director";
import { CameraController } from "wonder.js/dist/es2015/component/camera/CameraController";
import { Geometry } from "wonder.js/dist/es2015/component/geometry/Geometry";
import { getAspect, getFar, getFovy, getNear } from "./CameraAdaptor";
import { Material } from "wonder.js/dist/es2015/component/material/Material";
import { BasicMaterial, getBasicMaterialColor } from "wonder.js/dist/es2015/component/material/BasicMaterial";
import { Color } from "wonder.js/dist/es2015/structure/Color";
import { MeshRenderer } from "wonder.js/dist/es2015/component/renderer/MeshRenderer";
import { isInit } from "wonder.js/dist/es2015/core/DirectorSystem";
import { getPosition } from "./TransformAdaptor";
export var removeAllChildrenAdaptor = removeAllChildren;
export var getSceneAdaptor = getScene;
export var getChildrenAdaptor = getChildren;
export var getComponentAdaptor = getComponent;
export var hasComponentAdaptor = hasComponent;
export var getTransformComponentAdaptor = function (gameObject) {
    return getTransform(gameObject);
};
export var getCameraControllerAdaptor = function () {
    return CameraController;
};
export var getMeshRendererAdaptor = function () {
    return MeshRenderer;
};
export var getMaterialAdaptor = function () {
    return Material;
};
export var getBasicMaterialAdaptor = function () {
    return BasicMaterial;
};
export var getGeometryAdaptor = function () {
    return Geometry;
};
export var getMainAdaptor = function () {
    return Main;
};
export var getColorAdaptor = function () {
    return Color;
};
export var getDataBufferConfigAdaptor = function () {
    return DataBufferConfig;
};
export var getBasicMaterialColorAdaptor = getBasicMaterialColor;
export var setWebGLVersionAdaptor = function (version) {
    switch (version) {
        case "webgl1":
            WebGLDetectData.version = EWebGLVersion.WEBGL1;
            break;
        case "webgl2":
            WebGLDetectData.version = EWebGLVersion.WEBGL2;
            break;
        default:
            Log.error(true, Log.info.FUNC_UNKNOW("version:" + version));
            break;
    }
};
export var setGPUDetectDataAdaptor = function (extensionName, value) {
    GPUDetectData[extensionName] = value;
};
export var initDataAdaptor = initData;
export var getGLAdaptor = function () {
    return DeviceManagerData.gl;
};
export var setGLAdaptor = function (gl) {
    DeviceManagerData.gl = gl;
};
export var createStateAdapator = function () {
    return createState();
};
export var setStateAdaptor = function (state) {
    DirectorData.state = state;
};
export var getDomQueryAdaptor = function () {
    return DomQuery;
};
export var clearInstance = function () {
    Director._instance = null;
};
export var getNearAdaptor = getNear;
export var getFarAdaptor = getFar;
export var getAspectAdaptor = getAspect;
export var getFovyAdaptor = getFovy;
export var isDirectorInit = function () { return isInit(DirectorData); };
export var getPositionAdaptor = function (transform) {
    return getPosition(transform);
};
//# sourceMappingURL=forUnitTest.js.map