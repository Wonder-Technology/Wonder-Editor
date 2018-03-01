'use strict';

import * as Curry                                from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog                        from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor                from "../../../store/AppStore.js";
import * as EventHandler$WonderEditor            from "../../../eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor       from "../../../eventHandler/EmptyEventHandler.js";
import * as OperateStateUtils$WonderEditor       from "../../../../state/utils/OperateStateUtils.js";
import * as MainEditorSceneView$WonderEditor     from "../../../../component/mainEditor/logic/view/MainEditorSceneView.js";
import * as MainEditorSceneTreeView$WonderEditor from "../../../../component/mainEditor/component/sceneTree/logic/view/MainEditorSceneTreeView.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndo = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

function onClick(param, _, _$1) {
  var match = OperateStateUtils$WonderEditor.getState(MainEditorSceneView$WonderEditor.getCurrentGameObject);
  if (match) {
    var gameObject = match[0];
    OperateStateUtils$WonderEditor.getAndSetState((function (stateTuple) {
            return MainEditorSceneView$WonderEditor.clearCurrentGameObject(MainEditorSceneView$WonderEditor.disposeCurrentGameObject(gameObject, stateTuple));
          }));
  } else {
    Log$WonderLog.error(Log$WonderLog.buildErrorMessage("disposeCurrentGameObject", "current gameObject should exist, but actual is None", "", "set current gameObject", ""));
  }
  Curry._1(param[1], [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[/* Some */[OperateStateUtils$WonderEditor.getState(MainEditorSceneTreeView$WonderEditor.getSceneGraphDataFromEngine)]]
      ]);
  return /* () */0;
}

var DisposeGameObjectEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onDrop */onDrop,
  /* onMarkRedoUndo */onMarkRedoUndo,
  /* onClick */onClick
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndo
    ]);

export {
  DisposeGameObjectEventHandler ,
  MakeEventHandler              ,
  
}
/* MakeEventHandler Not a pure module */
