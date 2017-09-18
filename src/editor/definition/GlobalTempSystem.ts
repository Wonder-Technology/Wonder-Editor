import { GlobalTempData } from "./GlobalTempData";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import { create } from "../mainEditor/adaptor/GameObjectAdaptor";

export const createTempGameObject1 = (uid: number) => {
    _setGameObjectUid(GlobalTempData.gameObject_1, uid);

    return GlobalTempData.gameObject_1;
};

export const createTempGameObject2 = (uid: number) => {
    _setGameObjectUid(GlobalTempData.gameObject_2, uid);

    return GlobalTempData.gameObject_2;
};

const _setGameObjectUid = (gameObject: GameObject, uid: number) => {
    gameObject.uid = uid;
};

export const initData = (GlobalTempData: any) => {
    GlobalTempData.gameObject_1 = create();
    GlobalTempData.gameObject_2 = create();
}
