'use strict';

import * as Curry                                from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog                        from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor                from "../../../store/AppStore.js";
import * as StateFacade$WonderEditor             from "../../../../../facade/StateFacade.js";
import * as EventHandler$WonderEditor            from "../../../eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor       from "../../../eventHandler/EmptyEventHandler.js";
import * as MainEditorSceneView$WonderEditor     from "../../../../component/mainEditor/logic/view/MainEditorSceneView.js";
import * as CurrentGameObjectFacade$WonderEditor from "../../../../../facade/CurrentGameObjectFacade.js";
import * as MainEditorSceneTreeView$WonderEditor from "../../../../component/mainEditor/component/sceneTree/logic/view/MainEditorSceneTreeView.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndo = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

function onClick(param, _, _$1) {
  var match = StateFacade$WonderEditor.getState(CurrentGameObjectFacade$WonderEditor.getCurrentGameObject);
  if (match) {
    var gameObject = match[0];
    StateFacade$WonderEditor.getAndSetState((function (stateTuple) {
            return CurrentGameObjectFacade$WonderEditor.clearCurrentGameObject(MainEditorSceneView$WonderEditor.disposeCurrentGameObject(gameObject, stateTuple));
          }));
  } else {
    Log$WonderLog.error(Log$WonderLog.buildErrorMessage("disposeCurrentGameObject", "current gameObject should exist, but actual is None", "", "set current gameObject", ""));
  }
  Curry._1(param[1], [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[/* Some */[StateFacade$WonderEditor.getState(MainEditorSceneTreeView$WonderEditor.getSceneGraphDataFromEngine)]]
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
