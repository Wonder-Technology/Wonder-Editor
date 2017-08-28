import { createCameraController as createCameraControllerEngine } from "wonder.js/dist/es2015/component/camera/CameraController";
import { getCameraNear, setCameraFar, setCameraNear, getCameraFar } from "wonder.js/dist/es2015/component/camera/Camera";
import { getPerspectiveCameraAspect, getPerspectiveCameraFovy, setPerspectiveCameraAspect, setPerspectiveCameraFovy } from "wonder.js/dist/es2015/component/camera/PerspectiveCamera";
export var createCameraController = function () {
    return createCameraControllerEngine();
};
export var getNear = function (cameraController) {
    return getCameraNear(cameraController);
};
export var setNear = function (cameraController, near) {
    setCameraNear(cameraController, near);
};
export var getFar = function (cameraController) {
    return getCameraFar(cameraController);
};
export var setFar = function (cameraController, far) {
    setCameraFar(cameraController, far);
};
export var getAspect = function (cameraController) {
    return getPerspectiveCameraAspect(cameraController);
};
export var setAspect = function (cameraController, aspect) {
    setPerspectiveCameraAspect(cameraController, aspect);
};
export var getFovy = function (cameraController) {
    return getPerspectiveCameraFovy(cameraController);
};
export var setFovy = function (cameraController, fovy) {
    setPerspectiveCameraFovy(cameraController, fovy);
};
//# sourceMappingURL=CameraAdaptor.js.map