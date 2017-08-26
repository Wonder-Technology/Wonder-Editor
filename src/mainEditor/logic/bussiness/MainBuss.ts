import { setDefaultScene } from "../adaptorOperator/SceneOper";
import { initMain } from "../adaptorOperator/MainOper";
import { initDirector, setDirectorClearColor, renderDirector } from "../adaptorOperator/DirectorOper";
import { Map } from "immutable";
import { saveSceneGraphData } from "../editor/SceneGraphEdit";
import { ISceneGraph } from "../interface/ISceneGraph";
import { containerConfig } from "../../config/containerConfig";
import { createState as createStateEdit, getState as getStateEdit, setState as setStateEdit } from "../editor/StateManagerEdit";
import { saveLoop as saveLoopEdit } from "../editor/LoopEdit";

export const getState = getStateEdit;
export const setState = setStateEdit;
export const createState = createStateEdit;
export const saveLoop = saveLoopEdit;

export const initEditor = (state: Map<any, any>) => {
    var resultState: Map<any, any> = null,
        sceneGraphData: ISceneGraph = null;

    sceneGraphData = setDefaultScene();
    initDirector();

    resultState = saveSceneGraphData(state, sceneGraphData);

    return resultState;
};

export const initContainer = () => {
    var {
        canvasId,
        parentId,
        clearColor
    } = containerConfig;

    initMain(canvasId, parentId);

    setDirectorClearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
};

export const render = (state: Map<any, any>) => {
    renderDirector();

    return state;
};

