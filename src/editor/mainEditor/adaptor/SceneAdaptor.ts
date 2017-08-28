import {
    addGameObject as addGameObjectEngine,
    GameObject
} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { getDirector } from "./DirectorAdaptor";

export const getScene = () => {
    return getDirector().scene;
};

export const addGameObject = (gameObject: GameObject) => {
    addGameObjectEngine(getScene(), gameObject);
};

