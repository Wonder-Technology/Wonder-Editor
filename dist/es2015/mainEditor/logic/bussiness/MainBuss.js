import { getSceneChildren, setDefaultScene } from "../adaptorOperator/SceneOper";
import { init as initMain } from "../adaptorOperator/MainOper";
import { init as initDirector, loopBody as loopDirectorBody
// setClearColor as setDirectorClearColor
 } from "../adaptorOperator/DirectorOper";
import { saveSceneGraphData } from "../editor/SceneGraphEdit";
import { containerConfig } from "../../config/containerConfig";
import { createState as createStateEdit, getState as getStateEdit, setState as setStateEdit } from "../editor/StateManagerEdit";
import { saveLoop as saveLoopEdit } from "../editor/LoopEdit";
import { setClearColor } from "../adaptorOperator/DeviceOper";
export var getState = getStateEdit;
export var setState = setStateEdit;
export var createState = createStateEdit;
export var saveLoop = saveLoopEdit;
export var initEditor = function (state) {
    var resultState = null;
    setDefaultScene();
    initDirector();
    //todo need get scene children store in editor state
    resultState = saveSceneGraphData(state, getSceneChildren());
    return resultState;
};
export var initContainer = function () {
    var canvasId = containerConfig.canvasId, clearColor = containerConfig.clearColor;
    initMain(canvasId);
    setClearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
};
export var loopBody = function (state, time) {
    loopDirectorBody(time);
    return state;
};
//# sourceMappingURL=MainBuss.js.map