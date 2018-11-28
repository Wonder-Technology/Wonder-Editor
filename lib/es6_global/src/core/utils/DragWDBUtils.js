

import * as ArrayService$WonderEditor from "../../service/atom/ArrayService.js";
import * as ConsoleUtils$WonderEditor from "./ui/ConsoleUtils.js";
import * as GameObjectUtils$WonderEditor from "./engine/GameObjectUtils.js";
import * as StateLogicService$WonderEditor from "../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../service/state/engine/SceneEngineService.js";
import * as MainEditorLightUtils$WonderEditor from "../composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/utils/MainEditorLightUtils.js";
import * as GameObjectEngineService$WonderEditor from "../../service/state/engine/GameObjectEngineService.js";
import * as PointLightEngineService$WonderEditor from "../../service/state/engine/PointLightEngineService.js";
import * as DirectionLightEngineService$WonderEditor from "../../service/state/engine/DirectionLightEngineService.js";
import * as OperateGameObjectLogicService$WonderEditor from "../../service/stateTuple/logic/OperateGameObjectLogicService.js";
import * as GameObjectComponentLogicService$WonderEditor from "../../service/stateTuple/logic/GameObjectComponentLogicService.js";

function _checkLightCount(gameObject, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = (GameObjectEngineService$WonderEditor.getAllDirectionLights(GameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState), engineState).length + DirectionLightEngineService$WonderEditor.getLightCount(engineState) | 0) > DirectionLightEngineService$WonderEditor.getBufferMaxCount(/* () */0);
  var result;
  if (match) {
    ConsoleUtils$WonderEditor.warn(MainEditorLightUtils$WonderEditor.getDirectionLightExceedMaxCountMessage(/* () */0), editorState);
    result = false;
  } else {
    var match$1 = (GameObjectEngineService$WonderEditor.getAllPointLights(GameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState), engineState).length + PointLightEngineService$WonderEditor.getLightCount(engineState) | 0) > PointLightEngineService$WonderEditor.getBufferMaxCount(/* () */0);
    if (match$1) {
      ConsoleUtils$WonderEditor.warn(MainEditorLightUtils$WonderEditor.getPointLightExceedMaxCountMessage(/* () */0), editorState);
      result = false;
    } else {
      result = true;
    }
  }
  return /* tuple */[
          engineState,
          result
        ];
}

function dragWDB(wdbGameObjectUid, targetGameObjectUid, param) {
  var editorState = param[0];
  var match = _checkLightCount(wdbGameObjectUid, /* tuple */[
        editorState,
        param[1]
      ]);
  var engineState = match[0];
  if (match[1]) {
    var match$1 = OperateGameObjectLogicService$WonderEditor.cloneGameObject(wdbGameObjectUid, 1, true, engineState);
    var flatCloneGameObjectArr = OperateGameObjectLogicService$WonderEditor.getFlattenClonedGameObjectArr(match$1[0]);
    var clonedWDBGameObject = ArrayService$WonderEditor.unsafeGetFirst(flatCloneGameObjectArr);
    var engineState$1 = GameObjectUtils$WonderEditor.addChild(targetGameObjectUid, clonedWDBGameObject, match$1[1]);
    var match$2 = SceneEngineService$WonderEditor.doesNeedReInitSceneAllLightMaterials(flatCloneGameObjectArr, engineState$1);
    var engineState$2 = match$2 ? SceneEngineService$WonderEditor.clearShaderCacheAndReInitSceneAllLightMaterials(engineState$1) : engineState$1;
    var editorState$1 = GameObjectComponentLogicService$WonderEditor.getGameObjectComponentStoreInComponentTypeMap(/* array */[clonedWDBGameObject], engineState$2, editorState);
    var engineState$3 = StateLogicService$WonderEditor.refreshEngineStateAndReturnEngineState(engineState$2);
    return /* tuple */[
            true,
            /* tuple */[
              editorState$1,
              engineState$3
            ]
          ];
  } else {
    return /* tuple */[
            false,
            /* tuple */[
              editorState,
              engineState
            ]
          ];
  }
}

export {
  _checkLightCount ,
  dragWDB ,
  
}
/* ArrayService-WonderEditor Not a pure module */
