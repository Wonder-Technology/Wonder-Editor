

import * as LogUtils$WonderEditor from "../../../../../utils/console/LogUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../../../utils/ui/ConsoleUtils.js";
import * as CameraLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/CameraLogicService.js";
import * as MainEditorLightUtils$WonderEditor from "../composable_component/sceneTree_Inspector/composable_component/light/utils/MainEditorLightUtils.js";
import * as GameObjectLogicService$WonderEditor from "../../../../../../service/stateTuple/logic/GameObjectLogicService.js";
import * as MainEditorMaterialUtils$WonderEditor from "../composable_component/sceneTree_Inspector/composable_component/renderGroup/material/utils/MainEditorMaterialUtils.js";
import * as CameraGroupEngineService$WonderEditor from "../../../../../../service/state/engine/CameraGroupEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../../../../service/state/engine/GameObjectComponentEngineService.js";

function removeComponentByType(type_, currentSceneTreeNode, param) {
  var engineState = param[1];
  var editorState = param[0];
  var exit = 0;
  switch (type_) {
    case 1 : 
        return GameObjectLogicService$WonderEditor.disposeRenderGroup(currentSceneTreeNode, MainEditorMaterialUtils$WonderEditor.getMaterialTypeByGameObject(currentSceneTreeNode, engineState), /* tuple */[
                    editorState,
                    engineState
                  ]);
    case 2 : 
        return GameObjectLogicService$WonderEditor.disposeGeometry(currentSceneTreeNode, GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(currentSceneTreeNode, engineState), /* tuple */[
                    editorState,
                    engineState
                  ]);
    case 3 : 
        var arcballCameraController = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(currentSceneTreeNode, engineState);
        return GameObjectLogicService$WonderEditor.disposeArcballCameraController(currentSceneTreeNode, arcballCameraController, /* tuple */[
                    editorState,
                    engineState
                  ]);
    case 4 : 
        return GameObjectLogicService$WonderEditor.disposeCameraGroup(currentSceneTreeNode, CameraGroupEngineService$WonderEditor.getCameraGroupComponents(currentSceneTreeNode, /* tuple */[
                        GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent,
                        GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent
                      ], engineState), CameraLogicService$WonderEditor.unbindArcballCameraControllerEventIfHasComponentForGameView(currentSceneTreeNode, editorState, engineState));
    case 5 : 
        var lightType = MainEditorLightUtils$WonderEditor.getLightTypeByGameObject(currentSceneTreeNode, engineState);
        return MainEditorLightUtils$WonderEditor.disposeLightByLightType(lightType, currentSceneTreeNode, /* tuple */[
                    editorState,
                    engineState
                  ]);
    case 0 : 
    case 6 : 
    case 7 : 
        exit = 1;
        break;
    
  }
  if (exit === 1) {
    ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("the type:" + (String(type_) + " in inspectorComponentType can\'t remove "), "", "", ""), editorState);
    return /* tuple */[
            editorState,
            engineState
          ];
  }
  
}

export {
  removeComponentByType ,
  
}
/* ConsoleUtils-WonderEditor Not a pure module */
