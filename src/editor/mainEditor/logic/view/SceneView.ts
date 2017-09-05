import { setCurrentGameObject as setCurrentGameObjectBuss, getCurrentGameObject as getCurrentGameObjectBuss } from "../bussiness/SceneBuss";

export const getCurrentGameObject = getCurrentGameObjectBuss;

export const setCurrentGameObject = (uid: number) => {
    setCurrentGameObjectBuss(uid);
};
