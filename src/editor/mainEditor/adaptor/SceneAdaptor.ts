import {
    GameObject
} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { addSceneChild } from "wonder.js/dist/es2015/core/entityObject/scene/Scene";

export const getScene = (director:any) => {
    return director.scene;
};

export const addGameObject = (director:any, gameObject: GameObject) => {
    addSceneChild(getScene(director), gameObject);
};

