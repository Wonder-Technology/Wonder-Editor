

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as Immutable$WonderEditor from "../../../core/external/Immutable.js";
import * as AllStateData$WonderEditor from "../data/AllStateData.js";
import * as StateEditorService$WonderEditor from "../../state/editor/StateEditorService.js";

function operateHistory(currentState, currentStack, getNewHistoryStateFunc) {
  var match = Immutable$WonderEditor.Stack[/* first */4](currentStack);
  if (match !== undefined) {
    AllStateData$WonderEditor.setHistoryState(Curry._1(getNewHistoryStateFunc, /* () */0));
    return Js_primitive.valFromOption(match);
  } else {
    return currentState;
  }
}

function hasHistoryState(stack) {
  return Js_option.isSome(Immutable$WonderEditor.Stack[/* first */4](stack));
}

function hasUndoState(historyState) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("all history state stack should has the same length", "not"), (function () {
                        Contract$WonderLog.Operators[/* = */0](Immutable$WonderEditor.Stack[/* count */1](historyState[/* uiUndoStack */2]), Immutable$WonderEditor.Stack[/* count */1](historyState[/* editorUndoStack */4]));
                        return Contract$WonderLog.Operators[/* = */0](Immutable$WonderEditor.Stack[/* count */1](historyState[/* uiUndoStack */2]), Immutable$WonderEditor.Stack[/* count */1](historyState[/* engineUndoStack */6]));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return Js_option.isSome(Immutable$WonderEditor.Stack[/* first */4](historyState[/* uiUndoStack */2]));
}

function hasRedoState(historyState) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("all history state stack should has the same length", "not"), (function () {
                        Contract$WonderLog.Operators[/* = */0](Immutable$WonderEditor.Stack[/* count */1](historyState[/* uiRedoStack */1]), Immutable$WonderEditor.Stack[/* count */1](historyState[/* editorRedoStack */3]));
                        return Contract$WonderLog.Operators[/* = */0](Immutable$WonderEditor.Stack[/* count */1](historyState[/* uiRedoStack */1]), Immutable$WonderEditor.Stack[/* count */1](historyState[/* engineRedoStack */5]));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return Js_option.isSome(Immutable$WonderEditor.Stack[/* first */4](historyState[/* uiRedoStack */1]));
}

export {
  operateHistory ,
  hasHistoryState ,
  hasUndoState ,
  hasRedoState ,
  
}
/* Log-WonderLog Not a pure module */
