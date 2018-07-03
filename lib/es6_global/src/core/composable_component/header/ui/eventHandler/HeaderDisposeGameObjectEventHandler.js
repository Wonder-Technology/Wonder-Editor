

import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor from "../../../../ui/store/AppStore.js";
import * as HeaderUtils$WonderEditor from "../../utils/HeaderUtils.js";
import * as EventHandler$WonderEditor from "../../../../ui/eventHandler/EventHandler.js";
import * as SceneTreeUtils$WonderEditor from "../../../mainEditor/composable_component/sceneTree/utils/SceneTreeUtils.js";
import * as EmptyEventHandler$WonderEditor from "../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as SceneEditorService$WonderEditor from "../../../../../service/state/editor/SceneEditorService.js";
import * as CameraEngineService$WonderEditor from "../../../../../service/state/engine/CameraEngineService.js";
import * as CurrentSceneTreeNodeLogicService$WonderEditor from "../../../../../service/stateTuple/logic/CurrentSceneTreeNodeLogicService.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndoByStackFirst = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

var onMarkRedoUndoByStackLastReturnStore = EmptyEventHandler$WonderEditor.EmptyEventHandler[4];

function onClick(param, _, _$1) {
  var match = StateLogicService$WonderEditor.getEditorState(SceneEditorService$WonderEditor.getCurrentSceneTreeNode);
  if (match) {
    var gameObject = match[0];
    var match$1 = StateLogicService$WonderEditor.getEngineStateToGetData((function (param) {
            return CameraEngineService$WonderEditor.isCamera(gameObject, param);
          }));
    if (match$1) {
      var match$2 = HeaderUtils$WonderEditor.doesSceneHasRemoveableCamera(/* () */0);
      if (match$2) {
        Log$WonderLog.warn("can\'t remove last camera");
      } else {
        CurrentSceneTreeNodeLogicService$WonderEditor.disposeCurrentSceneTreeNode(gameObject);
      }
    } else {
      CurrentSceneTreeNodeLogicService$WonderEditor.disposeCurrentSceneTreeNode(gameObject);
    }
  } else {
    Log$WonderLog.error(Log$WonderLog.buildErrorMessage("disposeCurrentSceneTreeNode", "current gameObject should exist, but actual is None", "", "set current gameObject", ""));
  }
  Curry._1(param[1], [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[/* Some */[StateLogicService$WonderEditor.getStateToGetData(SceneTreeUtils$WonderEditor.getSceneGraphDataFromEngine)]]
      ]);
  return /* () */0;
}

var DisposeGameObjectEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onDrop */onDrop,
  /* onMarkRedoUndoByStackFirst */onMarkRedoUndoByStackFirst,
  /* onMarkRedoUndoByStackLastReturnStore */onMarkRedoUndoByStackLastReturnStore,
  /* onClick */onClick
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndoByStackFirst,
      onMarkRedoUndoByStackLastReturnStore
    ]);

export {
  DisposeGameObjectEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
