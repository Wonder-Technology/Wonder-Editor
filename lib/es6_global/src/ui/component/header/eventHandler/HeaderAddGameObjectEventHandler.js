'use strict';

import * as Curry                                      from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor                      from "../../../store/AppStore.js";
import * as AllStateData$WonderEditor                  from "../../../../state/AllStateData.js";
import * as EventHandler$WonderEditor                  from "../../../eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor             from "../../../eventHandler/EmptyEventHandler.js";
import * as OperateStateUtils$WonderEditor             from "../../../../state/utils/OperateStateUtils.js";
import * as MainEditorSceneView$WonderEditor           from "../../../../component/mainEditor/logic/view/MainEditorSceneView.js";
import * as MarkRedoUndoEventHandlerUtils$WonderEditor from "../../../eventHandler/utils/MarkRedoUndoEventHandlerUtils.js";

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var onMarkRedoUndo = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

function onSelect(param, _, uid) {
  OperateStateUtils$WonderEditor.getAndSetState((function (param) {
          return MainEditorSceneView$WonderEditor.setCurrentGameObject(uid, param);
        }));
  Curry._1(param[1], AppStore$WonderEditor.ReLoad);
  return MarkRedoUndoEventHandlerUtils$WonderEditor.markRedoUndoChangeNothing(AllStateData$WonderEditor.getHistoryState(/* () */0), param[0]);
}

var SelectEventHandler = /* module */[
  /* onDrop */onDrop,
  /* onMarkRedoUndo */onMarkRedoUndo,
  /* onSelect */onSelect
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onMarkRedoUndo
    ]);

export {
  SelectEventHandler ,
  MakeEventHandler   ,
  
}
/* MakeEventHandler Not a pure module */
