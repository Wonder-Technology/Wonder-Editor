import {
    setCurrentGameObject as setCurrentGameObjectBuss, getCurrentGameObject as getCurrentGameObjectBuss,
    getSceneChildren, removeCurrentGameObject as removeCurrentGameObjectBuss
} from "../bussiness/SceneBuss";
import {GameObject} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";

export const getCurrentGameObject = getCurrentGameObjectBuss;

export const setCurrentGameObject = (uid: number) => {
    setCurrentGameObjectBuss(uid, getSceneChildren());
};

export const removeCurrentGameObject = removeCurrentGameObjectBuss;