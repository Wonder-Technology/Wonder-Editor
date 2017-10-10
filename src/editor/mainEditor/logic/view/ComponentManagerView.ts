import { Map } from "immutable";
import { registerInit as registerSceneTreeInit } from "../../component/sceneTree/logic/bussiness/SceneTreeBuss";
import {
    setEmptyComponentInitList, triggerComponentInit
} from "../bussiness/ComponentManagerBuss";

export const prepare = (state: Map<any, any>) => {
    var resultState: Map<any, any> = state;

    resultState = setEmptyComponentInitList(resultState);

    resultState = _registerComponents(resultState);

    return resultState;
};

export const init = (state: Map<any, any>) => {
    var resultState: Map<any, any> = state;

    resultState = triggerComponentInit(resultState);

    return resultState;
};

const _registerComponents = (state:Map<any,any>) => {
    var resultState: Map<any, any> = state;

    resultState = registerSceneTreeInit(resultState);

    return resultState;
};
