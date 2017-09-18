import {
    setCurrentGameObject as setCurrentGameObjectBuss, getCurrentGameObject as getCurrentGameObjectBuss,
    getSceneChildren, removeCurrentGameObject as removeCurrentGameObjectBuss
} from "../bussiness/SceneBuss";

export const getCurrentGameObject = getCurrentGameObjectBuss;

export const setCurrentGameObject = (uid: number) => {
    setCurrentGameObjectBuss(uid, getSceneChildren());
};

export const removeCurrentGameObject = removeCurrentGameObjectBuss;