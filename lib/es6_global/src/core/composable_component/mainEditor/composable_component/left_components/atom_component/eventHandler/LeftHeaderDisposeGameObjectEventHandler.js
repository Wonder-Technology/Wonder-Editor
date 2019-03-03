

import * as Curry from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Result$WonderEditor from "../../../../../../../module/Result.js";
import * as AppStore$WonderEditor from "../../../../../../ui/store/AppStore.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../utils/ui/ConsoleUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../ui/eventHandler/EventHandler.js";
import * as JobEngineService$WonderEditor from "../../../../../../../service/state/engine/job/JobEngineService.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEngineService$WonderEditor from "../../../../../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../service/state/engine/state/StateEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as LeftHeaderGameObjectResultUtils$WonderEditor from "./utils/LeftHeaderGameObjectResultUtils.js";
import * as CurrentNodeSceneTreeLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/sceneTree/CurrentNodeSceneTreeLogicService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, param$1, param$2) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var engineState$1 = Result$WonderEditor.Result[/* either */2]((function (removedGameObject) {
          var match = CurrentNodeSceneTreeLogicService$WonderEditor.disposeCurrentSceneTreeNode(removedGameObject, /* tuple */[
                editorState,
                engineState
              ]);
          var engineState$2 = match[1];
          var __x = HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(removedGameObject, engineState$2);
          var isNeedReInitAllLightMaterials = SceneEngineService$WonderEditor.isNeedReInitAllLightMaterials(__x, engineState$2);
          StateEditorService$WonderEditor.setState(match[0]);
          var engineState$3 = JobEngineService$WonderEditor.execDisposeJob(engineState$2);
          var engineState$4 = isNeedReInitAllLightMaterials ? SceneEngineService$WonderEditor.clearShaderCacheAndReInitAllLightMaterials(engineState$3) : engineState$3;
          var editorState$1 = StateEditorService$WonderEditor.getState(/* () */0);
          var editorState$2 = SceneTreeEditorService$WonderEditor.removeIsShowChildren(removedGameObject, editorState$1);
          StateEditorService$WonderEditor.setState(editorState$2);
          return StateLogicService$WonderEditor.refreshEngineStateAndReturnEngineState(engineState$4);
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
