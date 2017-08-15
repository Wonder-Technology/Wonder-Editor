import { changeRotate, changeTranslate, init as initMainBuss, render } from "../bussiness/MainBuss";
import { MainViewData } from "./MainViewData";
import { compose } from "../../../utils/functionUtil";
import { Map } from "immutable";

export const init = (state: Map<any, any>) => {
    var resultState = initMainBuss(state);

    return resultState;
};

export const main = () => {
    compose(
        loop,
        init
    )(Map());
};

export const setTranslate = (x: number, y: number, z: number) => {
    let state = MainViewData.state;

    changeTranslate(state, x, y, z);
};

export const setRotate = (angle: number) => {
    let state = MainViewData.state;

    changeRotate(state, angle);
};

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
}
