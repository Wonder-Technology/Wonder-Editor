

import * as Caml_builtin_exceptions from "../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as ConsoleUtils$WonderEditor from "./ui/ConsoleUtils.js";
import * as OptionService$WonderEditor from "../../service/primitive/OptionService.js";
import * as StateLogicService$WonderEditor from "../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../service/state/engine/SceneEngineService.js";
import * as MainEditorLightUtils$WonderEditor from "../composable_component/mainEditor/composable_component/inspector/composable_component/sceneTree_Inspector/composable_component/light/utils/MainEditorLightUtils.js";
import * as GameObjectEngineService$WonderEditor from "../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as PointLightEngineService$WonderEditor from "../../service/state/engine/PointLightEngineService.js";
import * as CloneGameObjectLogicService$WonderEditor from "../../service/stateTuple/logic/CloneGameObjectLogicService.js";
import * as DirectionLightEngineService$WonderEditor from "../../service/state/engine/DirectionLightEngineService.js";
import * as GameObjectComponentLogicService$WonderEditor from "../../service/stateTuple/logic/GameObjectComponentLogicService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

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

function dragWDB(wdbGameObject, targetGameObject, dragPosition, param) {
  var editorState = param[0];
  var match = _checkLightCount(wdbGameObject, /* tuple */[
        editorState,
        param[1]
      ]);
  var engineState = match[0];
  if (match[1]) {
    var match$1 = GameObjectEngineService$WonderEditor.cloneGameObject(wdbGameObject, 1, true, engineState);
    var engineState$1 = match$1[1];
    var cloneGameObjectArr = match$1[0];
    var allClonedGameObjectArr = CloneGameObjectLogicService$WonderEditor.getAllClonedGameObjectArr(cloneGameObjectArr);
    var clonedWDBGameObject = CloneGameObjectLogicService$WonderEditor.getClonedGameObject(cloneGameObjectArr);
    var engineState$2;
    switch (dragPosition) {
      case 0 : 
          throw [
                Caml_builtin_exceptions.match_failure,
                /* tuple */[
                  "DragWDBUtils.re",
                  66,
                  6
                ]
              ];
      case 1 : 
          engineState$2 = HierarchyGameObjectEngineService$WonderEditor.changeGameObjectChildOrder(clonedWDBGameObject, targetGameObject, /* Before */0, HierarchyGameObjectEngineService$WonderEditor.addChild(OptionService$WonderEditor.unsafeGet(HierarchyGameObjectEngineService$WonderEditor.getParentGameObject(targetGameObject, engineState$1)), clonedWDBGameObject, engineState$1));
          break;
      case 2 : 
          engineState$2 = HierarchyGameObjectEngineService$WonderEditor.addChild(targetGameObject, clonedWDBGameObject, engineState$1);
          break;
      case 3 : 
          engineState$2 = HierarchyGameObjectEngineService$WonderEditor.changeGameObjectChildOrder(clonedWDBGameObject, targetGameObject, /* After */1, HierarchyGameObjectEngineService$WonderEditor.addChild(OptionService$WonderEditor.unsafeGet(HierarchyGameObjectEngineService$WonderEditor.getParentGameObject(targetGameObject, engineState$1)), clonedWDBGameObject, engineState$1));
          break;
      
    }
    var match$2 = SceneEngineService$WonderEditor.isNeedReInitSceneAllLightMaterials(allClonedGameObjectArr, engineState$2);
    var engineState$3 = match$2 ? SceneEngineService$WonderEditor.clearShaderCacheAndReInitSceneAllLightMaterials(engineState$2) : engineState$2;
    var editorState$1 = GameObjectComponentLogicService$WonderEditor.setGameObjectArrComponentTypeMap(/* array */[clonedWDBGameObject], GameObjectComponentLogicService$WonderEditor.buildAllComponentArray(/* () */0), engineState$3, editorState);
    var engineState$4 = StateLogicService$WonderEditor.refreshEngineStateAndReturnEngineState(engineState$3);
    return /* tuple */[
            true,
            /* tuple */[
              editorState$1,
              engineState$4
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
/* ConsoleUtils-WonderEditor Not a pure module */
