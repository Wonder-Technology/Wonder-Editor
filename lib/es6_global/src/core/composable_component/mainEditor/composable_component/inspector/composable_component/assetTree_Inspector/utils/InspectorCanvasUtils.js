

import * as Curry from "../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../ui/store/AppStore.js";
import * as DomHelper$WonderEditor from "../../../../../../../external/DomHelper.js";
import * as JobEngineService$WonderEditor from "../../../../../../../../service/state/engine/job/JobEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../service/state/editor/StateEditorService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../../../service/state/engine/ArcballCameraEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as GameObjectInspectorEngineService$WonderEditor from "../../../../../../../../service/state/inspectorEngine/GameObjectInspectorEngineService.js";
import * as ReallocateCPUMemoryJobEngineService$WonderEditor from "../../../../../../../../service/state/engine/job/ReallocateCPUMemoryJobEngineService.js";
import * as InspectorEngineGameObjectLogicService$WonderEditor from "../../../../../../../../service/stateTuple/logic/engine/InspectorEngineGameObjectLogicService.js";

function getCameraDefaultDistance(param) {
  return 1.1;
}

function showInspectorCanvas(param) {
  return Curry._2(DomHelper$WonderEditor.setDomDisplay, document.getElementById("inspectorCanvasParent"), true);
}

function hideInspectorCanvas(param) {
  return Curry._2(DomHelper$WonderEditor.setDomDisplay, document.getElementById("inspectorCanvasParent"), false);
}

function _reallocateCPUMemory(inspectorEngineState) {
  return ReallocateCPUMemoryJobEngineService$WonderEditor.reallocateGeometry(0.5, ReallocateCPUMemoryJobEngineService$WonderEditor.reallocateGameObjectByDisposeCount(inspectorEngineState));
}

function disposeContainerGameObjectAllChildrenAndReallocateCPUMemory(param) {
  var inspectorEngineState = JobEngineService$WonderEditor.execDisposeJob(InspectorEngineGameObjectLogicService$WonderEditor.disposeInspectorEngineContainerGameObjectAllChildren(/* tuple */[
            param[0],
            param[1]
          ]));
  return ReallocateCPUMemoryJobEngineService$WonderEditor.reallocateGeometry(0.5, ReallocateCPUMemoryJobEngineService$WonderEditor.reallocateGameObjectByDisposeCount(inspectorEngineState));
}

function setCameraDefaultDistance(inspectorEngineState) {
  var cameraArcballControllerComponent = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(GameObjectInspectorEngineService$WonderEditor.unsafeGetCamera(inspectorEngineState), inspectorEngineState);
  return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerDistance(1.1, cameraArcballControllerComponent, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerTarget(cameraArcballControllerComponent, /* tuple */[
                  0,
                  0,
                  0
                ], inspectorEngineState));
}

function initArcballCameraControllerAngle(arcballCameraController, inspectorEngineState) {
  return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerPhi(arcballCameraController, Math.PI / 2, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerTheta(arcballCameraController, 1.5, inspectorEngineState));
}

function restoreArcballCameraControllerAngle(inspectorEngineState) {
  var cameraArcballControllerComponent = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(GameObjectInspectorEngineService$WonderEditor.unsafeGetCamera(inspectorEngineState), inspectorEngineState);
  return initArcballCameraControllerAngle(cameraArcballControllerComponent, inspectorEngineState);
}

function updateSnapshot(currentNodeId, param) {
  StateEditorService$WonderEditor.setState(Curry._4(param[0], document.getElementById("inspector-canvas"), document.getElementById("img-canvas"), currentNodeId, StateEditorService$WonderEditor.getState(/* () */0)));
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[/* Project */4]]
      ]);
  return /* () */0;
}

export {
  getCameraDefaultDistance ,
  showInspectorCanvas ,
  hideInspectorCanvas ,
  _reallocateCPUMemory ,
  disposeContainerGameObjectAllChildrenAndReallocateCPUMemory ,
  setCameraDefaultDistance ,
  initArcballCameraControllerAngle ,
  restoreArcballCameraControllerAngle ,
  updateSnapshot ,
  
}
/* AppStore-WonderEditor Not a pure module */
