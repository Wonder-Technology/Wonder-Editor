import {GlobalTempGameObject} from "./GlobalTempGameObject";
import {GameObject} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import {create} from "../mainEditor/adaptor/GameObjectAdaptor";

export const createTempGameObject1 = (uid:number) => {
    GlobalTempGameObject.gameObject_1 = create();

    _setGameObjectUid(GlobalTempGameObject.gameObject_1,uid);

    return GlobalTempGameObject.gameObject_1;
};

export const createTempGameObject2 = (uid:number) => {
    GlobalTempGameObject.gameObject_2 = create();

    _setGameObjectUid(GlobalTempGameObject.gameObject_2,uid);

    return GlobalTempGameObject.gameObject_2;
};

const _setGameObjectUid = (gameObject:GameObject,uid:number) => {
    gameObject.uid = uid;
};