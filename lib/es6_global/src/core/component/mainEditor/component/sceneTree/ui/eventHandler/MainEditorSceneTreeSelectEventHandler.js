'use strict';

import * as Curry                                      from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor                      from "../../../../../../ui/store/AppStore.js";
import * as AllStateData$WonderEditor                  from "../../../../../../state/AllStateData.js";
import * as EventHandler$WonderEditor                  from "../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor             from "../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor             from "../../../../../../../service/stateTuple/StateLogicService.js";
import * as CurrentGameObjectService$WonderEditor      from "../../../../../../../service/primitive/CurrentGameObjectService.js";
import * as MarkRedoUndoEventHandlerUtils$WonderEditor from "../../../../../../ui/eventHandler/utils/MarkRedoUndoEventHandlerUtils.js";

var onClick = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndo = EmptyEventHandler$WonderEditor.EmptyEventHandler[3];

function onSelect(param, _, uid) {
  var store = param[0];
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return CurrentGameObjectService$WonderEditor.setCurrentGameObject(uid, param);
        }));
  Curry._1(param[1], AppStore$WonderEditor.ReLoad);
  var partial_arg = AllStateData$WonderEditor.getHistoryState(/* () */0);
  return StateLogicService$WonderEditor.getState((function (param) {
                return MarkRedoUndoEventHandlerUtils$WonderEditor.markRedoUndoChangeNothing(partial_arg, store, param);
              }));
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
