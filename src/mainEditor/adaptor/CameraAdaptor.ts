import { PerspectiveCamera } from "amyjs/dist/es2015/Component/Camera/PerspectiveCamera";
import { CameraController } from "amyjs/dist/es2015/Component/Camera/Controll/CameraController";
import { Camera } from "amyjs/dist/es2015/Component/Camera/Camera";

export const perspectiveCamera = () => {
    return PerspectiveCamera.create();
};

export const cameraControll = (cameraComponent: Camera) => {
    return CameraController.create(cameraComponent);
};

export const near = (camera: Camera, near: number) => {
    camera.near = near;
};

export const far = (camera: Camera, far: number) => {
    camera.far = far;
};

export const aspect = (camera: PerspectiveCamera, aspect: number) => {
    camera.aspect = aspect;
};

export const fovy = (camera: PerspectiveCamera, fovy: number) => {
    camera.fovy = fovy;
};

export const translate = (camera: Camera, x: number, y: number, z: number) => {
    camera.translate(x, y, z);
};


