import { create as createGameObject, addComponent } from "../../adaptor/GameObjectAdaptor";
import {
    translate, perspectiveCamera, near, far, cameraControll,
    aspect, fovy
} from "../../adaptor/CameraAdaptor";

export const createCamera = () => {
    let camera = createGameObject(),
        cameraComponent = createPerspectiveCamera();
    let cameraControll = createCameraControll(cameraComponent);

    setCameraNear(cameraComponent, 1);
    setCameraFar(cameraComponent, 1000);
    setPerspectiveCameraAspect(cameraComponent, 1);
    setPerspectiveCameraFovy(cameraComponent, 45);

    translateCamera(cameraComponent, 0, 0, -3);

    addComponent(camera, cameraControll);

    return camera;
};

export const translateCamera = translate;
export const createPerspectiveCamera = perspectiveCamera;
export const createCameraControll = cameraControll;
export const setCameraNear = near;
export const setCameraFar = far;
export const setPerspectiveCameraAspect = aspect;
export const setPerspectiveCameraFovy = fovy;

