'use strict';

import * as Curry                                      from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor                      from "../../../../../../ui/store/AppStore.js";
import * as AllStateData$WonderEditor                  from "../../../../../../state/AllStateData.js";
import * as EventHandler$WonderEditor                  from "../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor             from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as OperateStateUtils$WonderEditor             from "../../../../../../state/utils/OperateStateUtils.js";
import * as MainEditorSceneView$WonderEditor           from "../../../../logic/view/MainEditorSceneView.js";
import * as MarkRedoUndoEventHandlerUtils$WonderEditor from "../../../../../../ui/eventHandler/utils/MarkRedoUndoEventHandlerUtils.js";

var onClick = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndo = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

function onSelect(param, _, uid) {
  OperateStateUtils$WonderEditor.getAndSetState((function (param) {
          return MainEditorSceneView$WonderEditor.setCurrentGameObject(uid, param);
        }));
  Curry._1(param[1], AppStore$WonderEditor.ReLoad);
  return MarkRedoUndoEventHandlerUtils$WonderEditor.markRedoUndoChangeNothing(AllStateData$WonderEditor.getHistoryState(/* () */0), param[0]);
}

var SelectEventHandler = /* module */[
  /* onClick */onClick,
  /* onDrop */onDrop,
  /* onMarkRedoUndo */onMarkRedoUndo,
  /* onSelect */onSelect
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndo
    ]);

export {
  SelectEventHandler ,
  MakeEventHandler   ,
  
}
/* MakeEventHandler Not a pure module */
