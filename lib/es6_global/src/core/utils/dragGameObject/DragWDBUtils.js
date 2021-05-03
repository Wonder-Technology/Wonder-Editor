

import * as ConsoleUtils$WonderEditor from "../ui/ConsoleUtils.js";
import * as StateLogicService$WonderEditor from "../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as DragGameObjectUtils$WonderEditor from "./DragGameObjectUtils.js";
import * as MainEditorLightUtils$WonderEditor from "../../composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/utils/MainEditorLightUtils.js";
import * as GameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as PointLightEngineService$WonderEditor from "../../../service/state/engine/PointLightEngineService.js";
import * as CloneGameObjectLogicService$WonderEditor from "../../../service/stateTuple/logic/engine/CloneGameObjectLogicService.js";
import * as DirectionLightEngineService$WonderEditor from "../../../service/state/engine/DirectionLightEngineService.js";
import * as GameObjectComponentLogicService$WonderEditor from "../../../service/stateTuple/logic/GameObjectComponentLogicService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

function _checkLightCount(gameObject, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = (GameObjectEngineService$WonderEditor.getAllDirectionLights(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState), engineState).length + DirectionLightEngineService$WonderEditor.getLightCount(engineState) | 0) > DirectionLightEngineService$WonderEditor.getBufferMaxCount(/* () */0);
  var result;
  if (match) {
    ConsoleUtils$WonderEditor.warn(MainEditorLightUtils$WonderEditor.getDirectionLightExceedMaxCountMessage(/* () */0), editorState);
    result = false;
  } else {
    var match$1 = (GameObjectEngineService$WonderEditor.getAllPointLights(HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(gameObject, engineState), engineState).length + PointLightEngineService$WonderEditor.getLightCount(engineState) | 0) > PointLightEngineService$WonderEditor.getBufferMaxCount(/* () */0);
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

function _cloneWDBGameObject(wdbGameObject, engineState) {
  var match = GameObjectEngineService$WonderEditor.cloneGameObject(wdbGameObject, 1, true, engineState);
  var cloneGameObjectArr = match[0];
  var allClonedGameObjectArr = CloneGameObjectLogicService$WonderEditor.getAllClonedGameObjectArr(cloneGameObjectArr);
  var clonedWDBGameObject = CloneGameObjectLogicService$WonderEditor.getClonedGameObject(cloneGameObjectArr);
  return /* tuple */[
          clonedWDBGameObject,
          allClonedGameObjectArr,
          match[1]
        ];
}

function _drag(param, dragPosition, engineState) {
  var clonedWDBGameObject = param[2];
  var targetGameObject = param[1];
  var match = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
          return SceneEngineService$WonderEditor.isSceneGameObject(targetGameObject, param);
        }));
  if (match) {
    return DragGameObjectUtils$WonderEditor.handleDragToBeSceneGameObjectChild(dragPosition, targetGameObject, clonedWDBGameObject, engineState);
  } else {
    return DragGameObjectUtils$WonderEditor.handleDragToBeTargetGameObjectSib(dragPosition, targetGameObject, clonedWDBGameObject, engineState);
  }
}

function dragWDB(wdbGameObject, targetGameObject, dragPosition, param) {
  var editorState = param[0];
  var match = _checkLightCount(wdbGameObject, /* tuple */[
        editorState,
        param[1]
      ]);
  var engineState = match[0];
  if (match[1]) {
    var match$1 = _cloneWDBGameObject(wdbGameObject, engineState);
    var clonedWDBGameObject = match$1[0];
    var engineState$1 = _drag(/* tuple */[
          wdbGameObject,
          targetGameObject,
          clonedWDBGameObject
        ], dragPosition, match$1[2]);
    var match$2 = SceneEngineService$WonderEditor.isNeedReInitAllLightMaterials(match$1[1], engineState$1);
    var engineState$2 = match$2 ? SceneEngineService$WonderEditor.clearShaderCacheAndReInitAllLightMaterials(engineState$1) : engineState$1;
    var editorState$1 = GameObjectComponentLogicService$WonderEditor.setGameObjectArrComponentTypeMap(/* array */[clonedWDBGameObject], GameObjectComponentLogicService$WonderEditor.buildAllComponentArray(/* () */0), engineState$2, editorState);
    StateEditorService$WonderEditor.setState(editorState$1);
    var engineState$3 = StateLogicService$WonderEditor.renderEngineStateAndReturnEngineState(engineState$2);
    return /* tuple */[
            true,
            /* tuple */[
              StateEditorService$WonderEditor.getState(/* () */0),
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
  _cloneWDBGameObject ,
  _drag ,
  dragWDB ,
  
}
/* ConsoleUtils-WonderEditor Not a pure module */
