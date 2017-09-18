import { registerInit as registerSceneTreeInit } from "../../component/sceneTree/logic/bussiness/SceneTreeBuss";
import { Map } from "immutable";
import { setEmptyComponentInitList, getComponentInitList } from "../editor/ComponentManagerEdit";

export const init = (state: Map<any, any>) => {
    var resultState: Map<any, any> = state;

    resultState = triggerComponentInit(resultState);

    return resultState;
};

export const prepare = (state: Map<any, any>) => {
    var resultState: Map<any, any> = state;

    resultState = setEmptyComponentInitList(resultState);

    resultState = registerComponents(resultState);

    return resultState;
};

export const registerComponents = (state: Map<any, any>) => {
    var resultState: Map<any, any> = state;

    resultState = registerSceneTreeInit(resultState);

    return resultState;
};

export const triggerComponentInit = (state: Map<any, any>) => {
    var initList: Array<Function> = getComponentInitList(state),
        resultState: Map<any, any> = state;

    initList.forEach((item: Function) => {
        resultState = item(resultState);
    });

    return resultState;
};
