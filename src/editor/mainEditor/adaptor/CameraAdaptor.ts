import {
    CameraController,
    createCameraController as createCameraControllerEngine
} from "wonder.js/dist/es2015/component/camera/CameraController";
import { getCameraNear, setCameraFar, setCameraNear, getCameraFar } from "wonder.js/dist/es2015/component/camera/Camera";
import {
    getPerspectiveCameraAspect, getPerspectiveCameraFovy,
    setPerspectiveCameraAspect,
    setPerspectiveCameraFovy
} from "wonder.js/dist/es2015/component/camera/PerspectiveCamera";

export const createCameraController = () => {
    return createCameraControllerEngine();
};

export const getNear = (cameraController: CameraController) => {
    return getCameraNear(cameraController);
};

export const setNear = (cameraController: CameraController, near: number) => {
    setCameraNear(cameraController, near);
};

export const getFar = (cameraController: CameraController) => {
    return getCameraFar(cameraController);
};

export const setFar = (cameraController: CameraController, far: number) => {
    setCameraFar(cameraController, far);
};

export const getAspect = (cameraController: CameraController) => {
    return getPerspectiveCameraAspect(cameraController);
};

export const setAspect = (cameraController: CameraController, aspect: number) => {
    setPerspectiveCameraAspect(cameraController, aspect);
};

export const getFovy = (cameraController: CameraController) => {
    return getPerspectiveCameraFovy(cameraController);
};

export const setFovy = (cameraController: CameraController, fovy: number) => {
    setPerspectiveCameraFovy(cameraController, fovy);
};
