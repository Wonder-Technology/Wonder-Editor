import { getDirector } from "./DirectorAdaptor";
import { GameObject } from "amyjs/dist/es2015/core/Entity/GameObject";
import { Collection } from "wonder-commonlib/dist/commonjs/Collection";

export const getScene = () => {
    return getDirector().scene;
};

export const gameObjectScene = () => {
    return getDirector().scene.gameObjectScene;
};

export const getChildren = (gameObject: GameObject) => {
    return gameObject.getChildren();
};

export const removeAllChildren = (gameObject: GameObject) => {
    gameObject.removeAllChildren();
};

export const addGameObject = (gameObject: GameObject) => {
    getScene().addChild(gameObject);
};

