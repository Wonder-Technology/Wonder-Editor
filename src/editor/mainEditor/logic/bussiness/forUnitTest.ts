import { GameObject } from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import {EComponentType} from "../../enum/EComponentType";
import { Map } from "immutable";
import {Component} from "wonder.js/dist/es2015/component/Component";

import {
    getAllComponentData, initAllData, initContainer, isStart, loopBody
} from "./MainBuss";
import { getCurrentGameObject, removeCurrentGameObject, setCurrentGameObject } from "./SceneBuss";

export const initContainerBuss = initContainer;

export const initAllDataBuss = initAllData;

export const loopBodyBuss = loopBody;

export const getCurrentGameObjectBuss = getCurrentGameObject;

export const setCurrentGameObjectBuss = setCurrentGameObject;

export const removeCurrentGameObjectBuss = removeCurrentGameObject;

export const getAllComponentDataBuss = getAllComponentData;

