'use strict';

import * as Curry                                from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor                from "../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor            from "../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor       from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as OperateStateUtils$WonderEditor       from "../../../../../../state/utils/OperateStateUtils.js";
import * as SceneGraphDataUtils$WonderEditor     from "../../../../../../utils/SceneGraphDataUtils.js";
import * as MainEditorSceneTreeView$WonderEditor from "../../logic/view/MainEditorSceneTreeView.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onClick = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var onMarkRedoUndo = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

function onDrop(param, _, param$1) {
  var dragedUid = param$1[1];
  var targetUid = param$1[0];
  var dispatch = param[1];
  var match = OperateStateUtils$WonderEditor.getState((function (param) {
          return MainEditorSceneTreeView$WonderEditor.isGameObjectRelationError(targetUid, dragedUid, param);
        }));
  if (match !== 0) {
    Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
    return /* () */0;
  } else {
    OperateStateUtils$WonderEditor.getAndSetState((function (param) {
            return MainEditorSceneTreeView$WonderEditor.setParentKeepOrder(targetUid, dragedUid, param);
          }));
    Curry._1(dispatch, [
          AppStore$WonderEditor.SceneTreeAction,
          /* SetSceneGraph */[/* Some */[MainEditorSceneTreeView$WonderEditor.getDragedSceneGraphData(targetUid, dragedUid, SceneGraphDataUtils$WonderEditor.unsafeGetSceneGraphDataFromStore(param[0]))]]
        ]);
    return /* () */0;
  }
}

var DragEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onClick */onClick,
  /* onMarkRedoUndo */onMarkRedoUndo,
  /* onDrop */onDrop
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndo
    ]);

export {
  DragEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
