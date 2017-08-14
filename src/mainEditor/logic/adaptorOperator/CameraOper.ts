import {create as createGameObject, addComponent} from "../../adaptor/GameObjectAdaptor";
import {
    createPerspectiveCamera, createCameraControll, setCameraFar, setCameraNear,
    setPerspectiveCameraAspect, setPerspectiveCameraFovy, translate
} from "../../adaptor/CameraAdaptor";

export const createCamera = () => {
    let camera = createGameObject(),
        cameraComponent = createPerspectiveCamera();
    let cameraControll = createCameraControll(cameraComponent);

    setCameraNear(cameraComponent,1);
    setCameraFar(cameraComponent,1000);
    setPerspectiveCameraAspect(cameraComponent,1);
    setPerspectiveCameraFovy(cameraComponent,45);

    translate(cameraComponent,0,0,-3);

    addComponent(camera,cameraControll);

    return camera;
};

