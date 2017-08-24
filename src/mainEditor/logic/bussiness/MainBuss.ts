import { setDefaultScene } from "../adaptorOperator/SceneOper";
import { initMain } from "../adaptorOperator/MainOper";
import { initDirector, setDirectorClearColor, renderDirector } from "../adaptorOperator/DirectorOper";
import { Map } from "immutable";

export const initEngine = (state: Map<any, any>) => {
    let resultState = null;

    resultState = setDefaultScene(state);
    initDirector();

    return resultState;
};

export const initCanvas = () => {
    initMain("webgl", "parent");
    setDirectorClearColor(0, 0, 0, 1);
};


export const render = (state: Map<any, any>) => {
    renderDirector();

    return state;
};

