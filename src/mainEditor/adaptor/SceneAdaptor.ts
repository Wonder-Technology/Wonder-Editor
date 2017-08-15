import { getDirector } from "./DirectorAdaptor";
import { GameObject } from "amyjs/dist/es2015/core/Entity/GameObject";

export const getScene = () => {
    return getDirector().scene;
};

export const setColor = (r: number, g: number, b: number, a: number) => {
    getDirector().renderer.setClearColor(r, g, b, a);
};

export const getAllChildren = (gameObject: GameObject) => {
    return gameObject.getAllChildren();
};

export const addGameObject = (gameObject: GameObject) => {
    getScene().addChild(gameObject);
};

