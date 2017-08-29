import {getSceneChildren, setDefaultScene} from "../adaptorOperator/SceneOper";
import { init as initMain } from "../adaptorOperator/MainOper";
import {
    init as initDirector, loopBody as loopDirectorBody
    // setClearColor as setDirectorClearColor
} from "../adaptorOperator/DirectorOper";
import { Map } from "immutable";
import { saveSceneGraphData } from "../editor/SceneGraphEdit";
import { containerConfig } from "../../config/containerConfig";
import { createState as createStateEdit, getState as getStateEdit, setState as setStateEdit } from "../editor/StateManagerEdit";
import { saveLoop as saveLoopEdit } from "../editor/LoopEdit";
import {setClearColor, setViewport as setDeviceViewport} from "../adaptorOperator/DeviceOper";

export const getState = getStateEdit;
export const setState = setStateEdit;
export const createState = createStateEdit;
export const saveLoop = saveLoopEdit;

export const initEditor = (state: Map<any, any>) => {
    var resultState: Map<any, any> = null;
    // var scenGraph;

    //sceneGraph = setDefaultScene();
    setDefaultScene();
    initDirector();

    //todo need get scene children store in editor state
    // resultState = saveSceneGraphData(state, sceneGraph);
    resultState = saveSceneGraphData(state, getSceneChildren());

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

export const loopBody = (state: Map<any, any>, time: number) => {
    loopDirectorBody(time);

    return state;
};

export const setViewport = setDeviceViewport;
