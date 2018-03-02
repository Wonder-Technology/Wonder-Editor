'use strict';

import * as Curry                                from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Log$WonderLog                        from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as AppStore$WonderEditor                from "../../../store/AppStore.js";
import * as EventHandler$WonderEditor            from "../../../eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor       from "../../../eventHandler/EmptyEventHandler.js";
import * as OperateStateUtils$WonderEditor       from "../../../../state/utils/OperateStateUtils.js";
import * as MainEditorSceneView$WonderEditor     from "../../../../component/mainEditor/logic/view/MainEditorSceneView.js";
import * as SceneGraphDataUtils$WonderEditor     from "../../../../utils/SceneGraphDataUtils.js";
import * as MainEditorSceneTreeView$WonderEditor from "../../../../component/mainEditor/component/sceneTree/logic/view/MainEditorSceneTreeView.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndo = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

function onClick(param, type_, _) {
  var match = type_ === "box" ? OperateStateUtils$WonderEditor.getState(MainEditorSceneView$WonderEditor.addBoxGameObject) : Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("addGameObject", "specific type:" + (String(type_) + " should exist"), "", "", "type:" + (String(type_) + "")));
  var newGameObject = match[0];
  OperateStateUtils$WonderEditor.setState(match[1]);
  var partial_arg = SceneGraphDataUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(param[0]);
  Curry._1(param[1], [
        AppStore$WonderEditor.SceneTreeAction,
        /* SetSceneGraph */[/* Some */[OperateStateUtils$WonderEditor.getState((function (param) {
                    return MainEditorSceneTreeView$WonderEditor.buildSceneGraphDataWithNewGameObject(newGameObject, partial_arg, param);
                  }))]]
      ]);
  return /* () */0;
}

var AddGameObjectEventHandler = /* module */[
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
  AddGameObjectEventHandler ,
  MakeEventHandler          ,
  
}
/* MakeEventHandler Not a pure module */
