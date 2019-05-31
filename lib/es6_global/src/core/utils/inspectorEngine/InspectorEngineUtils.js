

import * as JobEngineService$WonderEditor from "../../../service/state/engine/job/JobEngineService.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";

function removeInspectorEngineSceneAllChildren(inspectorEngineState) {
  StateLogicService$WonderEditor.refreshInspectorEngineState(JobEngineService$WonderEditor.execDisposeJob(SceneEngineService$WonderEditor.disposeSceneAllChildrenKeepOrderRemoveGeometryRemoveMaterial(inspectorEngineState)));
  return /* () */0;
}

export {
  removeInspectorEngineSceneAllChildren ,
  
}
/* JobEngineService-WonderEditor Not a pure module */
