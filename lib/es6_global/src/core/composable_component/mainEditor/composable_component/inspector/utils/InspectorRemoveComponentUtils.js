

import * as Log$WonderLog from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as SceneUtils$WonderEditor from "../../../../../utils/engine/SceneUtils.js";
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
        var match = SceneUtils$WonderEditor.doesSceneHasRemoveableCamera(/* () */0);
        var match$1 = match ? CameraLogicService$WonderEditor.handleForRemoveCameraGroup(currentSceneTreeNode, editorState, engineState) : /* tuple */[
            editorState,
            engineState
          ];
        var engineState$1 = match$1[1];
        return GameObjectLogicService$WonderEditor.disposeCameraGroup(currentSceneTreeNode, CameraGroupEngineService$WonderEditor.getCameraGroupComponents(currentSceneTreeNode, /* tuple */[
                        GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent,
                        GameObjectComponentEngineService$WonderEditor.unsafeGetPerspectiveCameraProjectionComponent
                      ], engineState$1), /* tuple */[
                    match$1[0],
                    engineState$1
                  ]);
    case 5 : 
        var lightType = MainEditorLightUtils$WonderEditor.getLightTypeByGameObject(currentSceneTreeNode, engineState);
        return MainEditorLightUtils$WonderEditor.disposeLightByLightType(lightType, currentSceneTreeNode, /* tuple */[
                    editorState,
                    engineState
                  ]);
    case 0 : 
    case 6 : 
        exit = 1;
        break;
    
  }
  if (exit === 1) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("removeComponentByTypeForRunEngineState", "the type_:" + (String(type_) + " in InspectorComponentType is can\'t remove"), "", "", ""));
  }
  
}

export {
  removeComponentByType ,
  
}
/* Log-WonderLog Not a pure module */
