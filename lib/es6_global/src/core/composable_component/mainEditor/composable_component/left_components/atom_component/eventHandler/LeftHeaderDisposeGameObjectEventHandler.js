

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
import * as StateEngineService$WonderEditor from "../../../../../../../service/state/engine/StateEngineService.js";
import * as SceneTreeEditorService$WonderEditor from "../../../../../../../service/state/editor/sceneTree/SceneTreeEditorService.js";
import * as LeftHeaderGameObjectResultUtils$WonderEditor from "./utils/LeftHeaderGameObjectResultUtils.js";
import * as CurrentNodeSceneTreeLogicService$WonderEditor from "../../../../../../../service/stateTuple/logic/sceneTree/CurrentNodeSceneTreeLogicService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../../../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, _, _$1) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = Result$WonderEditor.Result[/* either */2]((function (removedGameObject) {
          var match = CurrentNodeSceneTreeLogicService$WonderEditor.disposeCurrentSceneTreeNode(removedGameObject, /* tuple */[
                editorState,
                engineState
              ]);
          var engineState$1 = match[1];
          var __x = HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(removedGameObject, engineState$1);
          var isNeedReInitSceneAllLightMaterials = SceneEngineService$WonderEditor.isNeedReInitSceneAllLightMaterials(__x, engineState$1);
          var engineState$2 = JobEngineService$WonderEditor.execDisposeJob(engineState$1);
          var engineState$3 = isNeedReInitSceneAllLightMaterials ? SceneEngineService$WonderEditor.clearShaderCacheAndReInitSceneAllLightMaterials(engineState$2) : engineState$2;
          var editorState$1 = SceneTreeEditorService$WonderEditor.removeIsShowChildren(removedGameObject, match[0]);
          var engineState$4 = StateLogicService$WonderEditor.refreshEngineStateAndReturnEngineState(engineState$3);
          return /* tuple */[
                  editorState$1,
                  engineState$4
                ];
        }), (function (errorMsg) {
          ConsoleUtils$WonderEditor.error(errorMsg, editorState);
          return /* tuple */[
                  editorState,
                  engineState
                ];
        }), LeftHeaderGameObjectResultUtils$WonderEditor.getTargetGameObject(/* () */0));
  StateEditorService$WonderEditor.setState(match[0]);
  StateEngineService$WonderEditor.setState(match[1]);
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
