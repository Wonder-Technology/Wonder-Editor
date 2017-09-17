import {
    setCurrentGameObject as setCurrentGameObjectBuss, getCurrentGameObject as getCurrentGameObjectBuss,
    getSceneChildren
} from "../bussiness/SceneBuss";

export const getCurrentGameObject = getCurrentGameObjectBuss;

export const setCurrentGameObject = (uid: number) => {
    setCurrentGameObjectBuss(uid, getSceneChildren());
};
