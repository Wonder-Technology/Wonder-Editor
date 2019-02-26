

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Result$WonderEditor from "../../../../../../../module/Result.js";
import * as AppStore$WonderEditor from "../../../../../../ui/store/AppStore.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../utils/ui/ConsoleUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../ui/eventHandler/EventHandler.js";
import * as OptionService$WonderEditor from "../../../../../../../service/primitive/OptionService.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../service/state/engine/state/StateEngineService.js";
import * as MainEditorLightUtils$WonderEditor from "../../../inspector/composable_component/sceneTree_Inspector/composable_component/light/utils/MainEditorLightUtils.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as CloneGameObjectLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/CloneGameObjectLogicService.js";
import * as GameObjectComponentLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/GameObjectComponentLogicService.js";
import * as LeftHeaderGameObjectResultUtils$WonderEditor from "./utils/LeftHeaderGameObjectResultUtils.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function _clone(targetGameObject, editorState, engineState) {
  var __x = HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(targetGameObject, engineState);
  var isNeedReInitAllLightMaterials = SceneEngineService$WonderEditor.isNeedReInitAllLightMaterials(__x, engineState);
  var match = GameObjectEngineService$WonderEditor.cloneGameObject(targetGameObject, 1, true, engineState);
  var engineState$1 = match[1];
  var clonedGameObject = CloneGameObjectLogicService$WonderEditor.getClonedGameObject(match[0]);
  var engineState$2 = HierarchyGameObjectEngineService$WonderEditor.addChild(OptionService$WonderEditor.unsafeGet(HierarchyGameObjectEngineService$WonderEditor.getParentGameObject(targetGameObject, engineState$1)), clonedGameObject, engineState$1);
  var editorState$1 = SceneTreeEditorService$WonderEditor.setCurrentSceneTreeNode(clonedGameObject, GameObjectComponentLogicService$WonderEditor.setGameObjectArrComponentTypeMap(/* array */[clonedGameObject], GameObjectComponentLogicService$WonderEditor.buildAllComponentArray(/* () */0), engineState$2, editorState));
  var engineState$3 = isNeedReInitAllLightMaterials ? SceneEngineService$WonderEditor.clearShaderCacheAndReInitAllLightMaterials(engineState$2) : engineState$2;
  StateEditorService$WonderEditor.setState(editorState$1);
  return StateLogicService$WonderEditor.refreshEngineStateAndReturnEngineState(engineState$3);
}

function _cloneLightGameObject(targetGameObject, param) {
  var engineState = param[1];
  var editorState = param[0];
  var match = MainEditorLightUtils$WonderEditor.isLightExceedMaxCountByType(MainEditorLightUtils$WonderEditor.getLightTypeByGameObject(targetGameObject, engineState), engineState);
  if (match[1]) {
    ConsoleUtils$WonderEditor.warn(match[0], editorState);
    return engineState;
  } else {
    return _clone(targetGameObject, editorState, engineState);
  }
}

function handleSelfLogic(param, _, _$1) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var engineState$1 = Result$WonderEditor.Result[/* either */2]((function (targetGameObject) {
          var match = MainEditorLightUtils$WonderEditor.isLightGameObject(targetGameObject, engineState);
          if (match) {
            return _cloneLightGameObject(targetGameObject, /* tuple */[
                        editorState,
                        engineState
                      ]);
          } else {
            return _clone(targetGameObject, editorState, engineState);
          }
        }), (function (errorMsg) {
          ConsoleUtils$WonderEditor.error(errorMsg, editorState);
          return engineState;
        }), LeftHeaderGameObjectResultUtils$WonderEditor.getTargetGameObject(/* () */0));
  StateEngineService$WonderEditor.setState(engineState$1);
  Curry._1(param[1], [
        AppStore$WonderEditor.UpdateAction,
        /* Update */[/* array */[
            /* Inspector */2,
            /* SceneTree */6
          ]]
      ]);
  return /* () */0;
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* _clone */_clone,
  /* _cloneLightGameObject */_cloneLightGameObject,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
