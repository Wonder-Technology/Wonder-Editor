

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as CameraEngineService$WonderEditor from "../../../../../../service/state/engine/CameraEngineService.js";
import * as MainEditorLightUtils$WonderEditor from "../composable_component/sceneTree_Inspector/composable_component/light/utils/MainEditorLightUtils.js";
import * as GameObjectLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/GameObjectLogicService.js";
import * as MainEditorMaterialUtils$WonderEditor from "../composable_component/sceneTree_Inspector/composable_component/renderGroup/material/utils/MainEditorMaterialUtils.js";
import * as CameraGroupEngineService$WonderEditor from "../../../../../../service/state/engine/CameraGroupEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../../../../../service/state/engine/ArcballCameraEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function removeComponentByTypeForEditEngineState(type_, currentSceneTreeNode, engineState) {
  var exit = 0;
  switch (type_) {
    case 1 : 
        return GameObjectLogicService$WonderEditor.disposeRenderGroupForEditEngineState(currentSceneTreeNode, MainEditorMaterialUtils$WonderEditor.getMaterialTypeByGameObject(currentSceneTreeNode, engineState), engineState);
    case 3 : 
        var arcballCameraController = GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(currentSceneTreeNode, engineState);
        return GameObjectLogicService$WonderEditor.disposeArcballCameraControllerForEditEngineState(currentSceneTreeNode, arcballCameraController, engineState);
    case 4 : 
        return GameObjectLogicService$WonderEditor.disposeCameraGroupForEditEngineState(currentSceneTreeNode, CameraGroupEngineService$WonderEditor.getCameraGroupComponents(currentSceneTreeNode, /* tuple */[
                        GameObjectComponentEngineService$WonderEditor.getBasicCameraViewComponent,
                        GameObjectComponentEngineService$WonderEditor.getPerspectiveCameraProjectionComponent
                      ], engineState), engineState);
    case 5 : 
        var lightType = MainEditorLightUtils$WonderEditor.getLightTypeByGameObject(currentSceneTreeNode, engineState);
        return MainEditorLightUtils$WonderEditor.disposeLightByLightTypeForEditEngineState(lightType, currentSceneTreeNode, engineState);
    case 0 : 
    case 2 : 
    case 6 : 
        exit = 1;
        break;
    
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("removeComponentByTypeForEditEngineState", "the type_:" + (String(type_) + " in InspectorComponentType is can\'t remove"), "", "", ""));
  }
  
}

function removeComponentByTypeForRunEngineState(type_, currentSceneTreeNode, param) {
  var engineState = param[1];
  var editorState = param[0];
  var exit = 0;
  switch (type_) {
    case 1 : 
        return GameObjectLogicService$WonderEditor.disposeRenderGroupForRunEngineState(currentSceneTreeNode, MainEditorMaterialUtils$WonderEditor.getMaterialTypeByGameObject(currentSceneTreeNode, engineState), /* tuple */[
                    editorState,
                    engineState
                  ]);
    case 3 : 
        var arcballCameraController = GameObjectComponentEngineService$WonderEditor.getArcballCameraControllerComponent(currentSceneTreeNode, engineState);
        var engineState$1 = ArcballCameraEngineService$WonderEditor.unbindArcballCameraControllerEventIfHasComponent(currentSceneTreeNode, engineState);
        return GameObjectLogicService$WonderEditor.disposeArcballCameraControllerForRunEngineState(currentSceneTreeNode, arcballCameraController, /* tuple */[
                    editorState,
                    engineState$1
                  ]);
    case 4 : 
        var engineState$2 = CameraEngineService$WonderEditor.prepareForRemoveCameraGroup(currentSceneTreeNode, engineState);
        return GameObjectLogicService$WonderEditor.disposeCameraGroupForRunEngineState(currentSceneTreeNode, CameraGroupEngineService$WonderEditor.getCameraGroupComponents(currentSceneTreeNode, /* tuple */[
                        GameObjectComponentEngineService$WonderEditor.getBasicCameraViewComponent,
                        GameObjectComponentEngineService$WonderEditor.getPerspectiveCameraProjectionComponent
                      ], engineState$2), /* tuple */[
                    editorState,
                    engineState$2
                  ]);
    case 5 : 
        var lightType = MainEditorLightUtils$WonderEditor.getLightTypeByGameObject(currentSceneTreeNode, engineState);
        return MainEditorLightUtils$WonderEditor.disposeLightByLightTypeForRunEngineState(lightType, currentSceneTreeNode, /* tuple */[
                    editorState,
                    engineState
                  ]);
    case 0 : 
    case 2 : 
    case 6 : 
        exit = 1;
        break;
    
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("removeComponentByTypeForRunEngineState", "the type_:" + (String(type_) + " in InspectorComponentType is can\'t remove"), "", "", ""));
  }
  
}

export {
  removeComponentByTypeForEditEngineState ,
  removeComponentByTypeForRunEngineState ,
  
}
/* Log-WonderLog Not a pure module */
