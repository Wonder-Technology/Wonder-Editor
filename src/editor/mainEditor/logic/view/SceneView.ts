import {GameObject} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";

import {
    setCurrentGameObject as setCurrentGameObjectBuss, getCurrentGameObject as getCurrentGameObjectBuss,
    getSceneChildren, removeCurrentGameObject as removeCurrentGameObjectBuss, getScene, hasCurrentGameObject
} from "../bussiness/SceneBuss";
import {isStart} from "../bussiness/MainBuss";

export const getSceneId = ()=>{
    if(isStart()){
        return getScene().uid;
    }

    return -1;
};

export const getCurrentGameObjectUId = () => {
    var uid = -1;

    if(isStart()){
        let gameObject = getCurrentGameObject();

        if(hasCurrentGameObject(gameObject)){
            uid = gameObject.uid;
        }
    }

    return uid;
};

export const hasCurrentGameObjectByUId = (uid: number) => uid !== -1;

export const getCurrentGameObject = getCurrentGameObjectBuss;

export const setCurrentGameObject = (uid: number) => {
    setCurrentGameObjectBuss(uid, getSceneChildren());
};

export const removeCurrentGameObject = removeCurrentGameObjectBuss;