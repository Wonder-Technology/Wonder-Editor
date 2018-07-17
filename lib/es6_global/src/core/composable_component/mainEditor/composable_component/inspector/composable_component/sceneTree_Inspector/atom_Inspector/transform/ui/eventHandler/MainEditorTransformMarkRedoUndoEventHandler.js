

import * as Curry from "../../../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AppStore$WonderEditor from "../../../../../../../../../../ui/store/AppStore.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/StateEngineService.js";
import * as TransformEngineService$WonderEditor from "../../../../../../../../../../../service/state/engine/TransformEngineService.js";
import * as MarkRedoUndoEventHandlerUtils$WonderEditor from "../../../../../../../../../../ui/eventHandler/utils/MarkRedoUndoEventHandlerUtils.js";

var onSelect = EmptyEventHandler$WonderEditor.EmptyEventHandler[0];

var onClick = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

var onDrop = EmptyEventHandler$WonderEditor.EmptyEventHandler[2];

var onMarkRedoUndoByStackLastReturnStore = EmptyEventHandler$WonderEditor.EmptyEventHandler[4];

function onMarkRedoUndoByStackFirst(param, transformComponent, param$1) {
  var partial_arg_000 = param$1[0];
  var partial_arg_001 = param$1[1];
  var partial_arg_002 = param$1[2];
  var partial_arg = /* tuple */[
    partial_arg_000,
    partial_arg_001,
    partial_arg_002
  ];
  var match = StateLogicService$WonderEditor.handleFuncWithDiff(/* array */[/* record */[
          /* arguments : array */[transformComponent],
          /* type_ : Transform */1
        ]], (function (param, param$1) {
          return TransformEngineService$WonderEditor.setLocalPosition(partial_arg, param, param$1);
        }), /* tuple */[
        StateEngineService$WonderEditor.deepCopyForRestore(StateLogicService$WonderEditor.getEditEngineState(/* () */0)),
        StateEngineService$WonderEditor.deepCopyForRestore(StateLogicService$WonderEditor.getRunEngineState(/* () */0))
      ]);
  MarkRedoUndoEventHandlerUtils$WonderEditor.storeCopiedEngineStateHistory(param[0], /* tuple */[
        StateEditorService$WonderEditor.getState(/* () */0),
        match[0],
        match[1]
      ]);
  Curry._1(param[1], AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

var MarkRedoUndoEventHandler = /* module */[
  /* onSelect */onSelect,
  /* onClick */onClick,
  /* onDrop */onDrop,
  /* onMarkRedoUndoByStackLastReturnStore */onMarkRedoUndoByStackLastReturnStore,
  /* onMarkRedoUndoByStackFirst */onMarkRedoUndoByStackFirst
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      onSelect,
      onDrop,
      onClick,
      onMarkRedoUndoByStackFirst,
      onMarkRedoUndoByStackLastReturnStore
    ]);

export {
  MarkRedoUndoEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
