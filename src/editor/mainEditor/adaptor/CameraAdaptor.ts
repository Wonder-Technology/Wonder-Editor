// export const createPerspectiveCamera = () => {
//     return createPerspectiveCamera
// };

import {
    CameraController,
    createCameraController as createCameraControllerEngine
} from "wonder.js/dist/es2015/component/camera/CameraController";
import { setCameraFar, setCameraNear } from "wonder.js/dist/es2015/component/camera/Camera";
import {
    setPerspectiveCameraAspect,
    setPerspectiveCameraFovy
} from "wonder.js/dist/es2015/component/camera/PerspectiveCamera";

export const createCameraController = () => {
    return createCameraControllerEngine();
};

export const setNear = (cameraController: CameraController, near: number) => {
    setCameraNear(cameraController, near);
};

export const setFar = (cameraController: CameraController, far: number) => {
    setCameraFar(cameraController, far);
};

export const setAspect = (cameraController: CameraController, aspect: number) => {
    setPerspectiveCameraAspect(cameraController, aspect);
};

export const setFovy = (cameraController: CameraController, fovy: number) => {
    setPerspectiveCameraFovy(cameraController, fovy);
};

// export const setTranslate = (camera: Camera, x: number, y: number, z: number) => {
//     camera.translate(x, y, z);
// };


