import {
    initAllData, initContainer, loopBody
} from "./MainBuss";
import { Map } from "immutable";
import { getCurrentGameObject, removeCurrentGameObject, setCurrentGameObject } from "./SceneBuss";
import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";

export const initContainerBuss = initContainer;

export const initAllDataBuss = initAllData;

export const loopBodyBuss = loopBody;

export const getCurrentGameObjectBuss = getCurrentGameObject;

export const setCurrentGameObjectBuss = setCurrentGameObject;

export const removeCurrentGameObjectBuss = removeCurrentGameObject;

