import {PerspectiveCamera} from "amyjs/dist/es2015/Component/Camera/PerspectiveCamera";
import {CameraController} from "amyjs/dist/es2015/Component/Camera/Controll/CameraController";
import {Camera} from "amyjs/dist/es2015/Component/Camera/Camera";

export const createPerspectiveCamera = () => {
    return PerspectiveCamera.create();
};

export const createCameraControll = (cameraComponent:Camera) => {
    return CameraController.create(cameraComponent);
};

export const setCameraNear = (camera:Camera,near:number) => {
    camera.near = near;
};

export const setCameraFar = (camera:Camera,far:number) => {
    camera.far = far;
};

export const setPerspectiveCameraAspect = (camera:PerspectiveCamera,aspect:number) => {
    camera.aspect = aspect;
};

export const setPerspectiveCameraFovy = (camera:PerspectiveCamera,fovy:number) => {
    camera.fovy = fovy;
};

export const translate = (camera:Camera,x:number,y:number,z:number) => {
    camera.translate(x,y,z);
};


