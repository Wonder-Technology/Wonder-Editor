import {addGameObject, getScene} from "../../adaptor/SceneAdaptor";
import { createTriangle } from "./PrimitiveOper";
import { createCamera } from "./CameraOper";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import {getChildren} from "../../adaptor/GameObjectAdaptor";

export const setDefaultScene = () => {
    var gameObject: GameObject = null,
        camera: GameObject = null;

    gameObject = createTriangle();
    camera = createCamera();

    addGameObject(camera);
    addGameObject(gameObject);
};

export const getSceneChildren = () => {
    return getChildren(getScene());
};
