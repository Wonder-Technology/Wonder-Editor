

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as StateLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../../service/state/editor/scene/SceneEditorService.js";
import * as CameraEngineService$WonderEditor from "../../../../../../service/state/engine/CameraEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../service/state/engine/ArcballCameraEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../../../../service/state/engine/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function getInspectorComponentType(type_) {
  switch (type_) {
    case "ArcballCameraController" : 
        return /* ArcballCameraController */3;
    case "CameraGroup" : 
        return /* CameraGroup */4;
    case "Light" : 
        return /* Light */5;
    case "RenderGroup" : 
        return /* RenderGroup */1;
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getInspectorComponentType", "the type:" + (String(type_) + " in InspectorComponentType is can\'t add"), "", "", ""));
  }
}

function _bindArcballCameraEventIfHasActiveCameraGroup(currentSceneTreeNode, runEngineState) {
  var match = CameraEngineService$WonderEditor.hasCameraGroup(currentSceneTreeNode, runEngineState);
  if (match) {
    var match$1 = BasicCameraViewEngineService$WonderEditor.isActiveBasicCameraView(GameObjectComponentEngineService$WonderEditor.getBasicCameraViewComponent(currentSceneTreeNode, runEngineState), runEngineState);
    if (match$1) {
      return ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEventIfHasComponent(currentSceneTreeNode, runEngineState);
    } else {
      return runEngineState;
    }
  } else {
    return runEngineState;
  }
}

function handleAddArcballCameraControllerIfInRunMode(currentSceneTreeNode, runEngineState) {
  var match = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getIsRun);
  if (match) {
    return _bindArcballCameraEventIfHasActiveCameraGroup(currentSceneTreeNode, runEngineState);
  } else {
    return runEngineState;
  }
}

function handleAddCameraGroupIfInRunMode(currentSceneTreeNode, runEngineState) {
  var match = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getIsRun);
  if (match) {
    return ArcballCameraEngineService$WonderEditor.bindArcballCameraControllerEventIfHasComponent(currentSceneTreeNode, runEngineState);
  } else {
    return runEngineState;
  }
}

export {
  getInspectorComponentType ,
  _bindArcballCameraEventIfHasActiveCameraGroup ,
  handleAddArcballCameraControllerIfInRunMode ,
  handleAddCameraGroupIfInRunMode ,
  
}
/* Log-WonderLog Not a pure module */
