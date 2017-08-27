import {
    createState, getState, initContainer, initEditor, render, saveLoop,
    setState
} from "../bussiness/MainBuss";
import { compose } from "../../../utils/functionUtil";
import { Map } from "immutable";

export const init = (state: Map<any, any>) => {
    var resultState = null;

    initContainer();

    resultState = initEditor(state);

    return resultState;
};

export const main = () => {
    compose(
        loop,
        init
    )(createState());
};

const loop = (state: Map<any, any>) => {
    var resultState: any = null;
    var _loop = () => {
        var resultState = getState();

        resultState = render(resultState);

        setState(resultState);

        return window.requestAnimationFrame(_loop);
    };

    resultState = saveLoop("loopId", state, _loop());

    setState(resultState);
};

