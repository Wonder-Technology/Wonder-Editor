import {
    GameObject
} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { getDirector } from "./DirectorAdaptor";
import { addSceneChild } from "wonder.js/dist/es2015/core/entityObject/scene/Scene";

export const getScene = () => {
    return getDirector().scene;
};

export const addGameObject = (gameObject: GameObject) => {
    addSceneChild(getScene(), gameObject);
};

