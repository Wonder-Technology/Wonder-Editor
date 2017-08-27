import { PerspectiveCamera } from "amyjs/dist/es2015/Component/Camera/PerspectiveCamera";
import { CameraController } from "amyjs/dist/es2015/Component/Camera/Controll/CameraController";
import { Camera } from "amyjs/dist/es2015/Component/Camera/Camera";

export const perspectiveCamera = () => {
    return PerspectiveCamera.create();
};

export const cameraControll = (cameraComponent: Camera) => {
    return CameraController.create(cameraComponent);
};

export const setNear = (camera: Camera, near: number) => {
    camera.near = near;
};

export const setFar = (camera: Camera, far: number) => {
    camera.far = far;
};

export const setAspect = (camera: PerspectiveCamera, aspect: number) => {
    camera.aspect = aspect;
};

export const setFovy = (camera: PerspectiveCamera, fovy: number) => {
    camera.fovy = fovy;
};

export const setTranslate = (camera: Camera, x: number, y: number, z: number) => {
    camera.translate(x, y, z);
};


