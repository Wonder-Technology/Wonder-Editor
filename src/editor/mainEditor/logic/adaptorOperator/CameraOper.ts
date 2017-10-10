import { create as createGameObject, addComponent, getTransform } from "../../adaptor/GameObjectAdaptor";
import {
    setNear, setFar, createCameraController,
    setAspect, setFovy
} from "../../adaptor/CameraAdaptor";
import { translate } from "../../adaptor/TransformAdaptor";

export const createCamera = () => {
    var camera = createGameObject(),
        cameraController = createCameraController();

    setNear(cameraController, 1);
    setFar(cameraController, 1000);
    setAspect(cameraController, 1);
    setFovy(cameraController, 45);

    addComponent(camera, cameraController);

    translate(getTransform(camera), 0, 0, 3);

    return camera;
};
