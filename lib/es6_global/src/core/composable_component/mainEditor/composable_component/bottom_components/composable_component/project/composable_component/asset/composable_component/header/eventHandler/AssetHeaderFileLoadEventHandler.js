

import * as LogUtils$WonderEditor from "../../../../../../../../../../../utils/console/LogUtils.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../../../../../utils/ui/ConsoleUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EventHandler.js";
import * as AssetNodeType$WonderEditor from "../../../../../../../../../../../../service/record/editor/data/AssetNodeType.js";
import * as AssetHeaderUtils$WonderEditor from "../../utils/AssetHeaderUtils.js";
import * as AllHistoryService$WonderEditor from "../../../../../../../../../../../../service/stateTuple/history/AllHistoryService.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../../../../service/state/editor/StateEditorService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, createJsZipFunc, $$event) {
  var dispatchFunc = param[1];
  var store = param[0];
  return AssetHeaderUtils$WonderEditor.fileLoad(/* tuple */[
                store,
                dispatchFunc
              ], createJsZipFunc, $$event).catch((function (e) {
                AllHistoryService$WonderEditor.handleUndo(store, dispatchFunc);
                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                if (e[0] === AssetNodeType$WonderEditor.LoadException) {
                  ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("" + (String(e[1]) + ""), "", "", ""), editorState);
                } else {
                  var message = e.message;
                  var stack = e.stack;
                  ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("" + (String(message) + ""), "", "", ""), editorState);
                  ConsoleUtils$WonderEditor.logStack(stack);
                }
                return Promise.resolve(/* () */0);
              }));
}

var CustomEventHandler = /* module */[
  /* setUndoValueToCopiedEngineState */setUndoValueToCopiedEngineState,
  /* handleSelfLogic */handleSelfLogic
];

var MakeEventHandler = EventHandler$WonderEditor.MakeEventHandler([
      handleSelfLogic,
      setUndoValueToCopiedEngineState
    ]);

export {
  CustomEventHandler ,
  MakeEventHandler ,
  
}
/* MakeEventHandler Not a pure module */
