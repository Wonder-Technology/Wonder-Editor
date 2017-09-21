import {Component} from "wonder.js/dist/es2015/component/Component";
import {EComponentType} from "../../enum/EComponentType";
import { Map } from "immutable";

import {
    createState, getAllComponentData as getAllComponentDataBuss, getState, initAllData, initContainer, initEditor as initEditorBuss, loopBody, saveLoop, setState, setViewport as setDeviceViewport,
 setHeight as setHeightBuss, setWidth as setWidthBuss, setStyleHeight as setStyleHeightBuss, setStyleWidth as setStyleWidthBuss
} from "../bussiness/MainBuss";
import { compose } from "../../../utils/functionUtil";
import { init as initComponentManager, prepare as prepareComponentManager } from "./ComponentManagerView";

export const init = (state: Map<any, any>) => {
    var resultState = null;

    initContainer();

    resultState = initEditor(state);

    initAllData();

    return resultState;
};

export const initEditor = (state: Map<any, any>) => {
    var resultState = state;

    resultState = initEditorBuss(resultState);

    resultState = prepareComponentManager(resultState);

    resultState = initComponentManager(resultState);

    return resultState;
}

export const start = () => {
    compose(
        loop,
        init
    )(createState());
};

const loop = (state: Map<any, any>) => {
    var resultState: any = null;

    var _loop = (time: number) => {
        var resultState = getState();

        resultState = loopBody(resultState, time);

        setState(resultState);

        return window.requestAnimationFrame(_loop);
    };

    resultState = saveLoop("loopId", state, _loop(null));

    setState(resultState);
};

export const setViewport = setDeviceViewport;

export const setWidth = setWidthBuss;

export const setHeight = setHeightBuss;

export const setStyleWidth = setStyleWidthBuss;

export const setStyleHeight = setStyleHeightBuss;

export const getAllComponentData = getAllComponentDataBuss;