import { setDefaultScene } from "../adaptorOperator/SceneOper";
import { init as initMain } from "../adaptorOperator/MainOper";
import {
    init as initDirector, loopBody as loopDirectorBody
    // setClearColor as setDirectorClearColor
} from "../adaptorOperator/DirectorOper";
import { Map } from "immutable";
import { containerConfig } from "../../config/containerConfig";
import { createState as createStateEdit, getState as getStateEdit, setState as setStateEdit } from "../editor/StateManagerEdit";
import { saveLoop as saveLoopEdit } from "../editor/LoopEdit";
import { setClearColor, setViewport as setDeviceViewport } from "../adaptorOperator/DeviceOper";
import { setHeight as setHeightOper, setWidth as setWidthOper, setStyleHeight as setStyleHeightOper, setStyleWidth as setStyleWidthOper } from "../adaptorOperator/ViewOper";
import {createTempGameObject1, initData} from "../../../definition/GlobalTempSystem";
import { GlobalTempData } from "../../../definition/GlobalTempData";
import {getAllComponentData as getAllComponentDataOper} from "../adaptorOperator/GameObjectOper";
import {GameObject} from "wonder.js/dist/es2015/core/entityObject/gameObject/GameObject";
import {Component} from "wonder.js/dist/es2015/component/Component";
import {EComponentType} from "../../enum/EComponentType";

export const getState = getStateEdit;

export const setState = setStateEdit;

export const createState = createStateEdit;

export const saveLoop = saveLoopEdit;

export const setViewport = setDeviceViewport;

export const setWidth = setWidthOper;

export const setHeight = setHeightOper;

export const setStyleWidth = setStyleWidthOper;

export const setStyleHeight = setStyleHeightOper;

export const getAllComponentData = (uid:number)=>{
    var tempGameObject:GameObject = createTempGameObject1(uid);

    return getAllComponentDataOper(tempGameObject);
}

export const initEditor = (state: Map<any, any>) => {
    var resultState: Map<any, any> = state;

    setDefaultScene();

    initDirector();

    return resultState;
};

export const initContainer = () => {
    var {
        canvasId,
        clearColor
    } = containerConfig;

    initMain(canvasId);

    setClearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
};

export const initAllData = () => {
    initData(GlobalTempData);
}

export const loopBody = (state: Map<any, any>, time: number) => {
    loopDirectorBody(time);

    return state;
};
