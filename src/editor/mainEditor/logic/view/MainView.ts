import {
    createState, getState, initAllData, initContainer, initEditor, loopBody, saveLoop,
    setState, setViewport as setDeviceViewport
} from "../bussiness/MainBuss";
import { compose } from "../../../utils/functionUtil";
import { setHeight as setHeightBuss, setWidth as setWidthBuss, setStyleHeight as setStyleHeightBuss, setStyleWidth as setStyleWidthBuss } from "../adaptorOperator/ViewOper";
import { Map } from "immutable";

export const init = (state: Map<any, any>) => {
    var resultState = null;

    initContainer();

    resultState = initEditor(state);

    initAllData();

    return resultState;
};

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

