import { initContainer, initEditor, render } from "../bussiness/MainBuss";
import { MainViewData } from "./MainViewData";
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

export const createState = () => Map();


const loop = (state: Map<any, any>) => {
    var resultState: any = null;
    var _loop = () => {
        var resultState = MainViewData.state;

        resultState = render(resultState);

        _setState(MainViewData, resultState);

        return window.requestAnimationFrame(_loop);
    };

    resultState = state.setIn(["MainView", "loopID"], _loop());

    _setState(MainViewData, resultState);
};

const _setState = (MainViewData: any, state: Map<any, any>) => {
    MainViewData.state = state;
};
