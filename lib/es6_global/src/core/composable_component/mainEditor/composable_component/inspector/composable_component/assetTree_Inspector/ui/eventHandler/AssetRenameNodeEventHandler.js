

import * as Curry from "../../../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Result$WonderEditor from "../../../../../../../../../module/Result.js";
import * as AppStore$WonderEditor from "../../../../../../../../ui/store/AppStore.js";
import * as ConsoleUtils$WonderEditor from "../../../../../../../../utils/ui/ConsoleUtils.js";
import * as EventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EventHandler.js";
import * as EmptyEventHandler$WonderEditor from "../../../../../../../../ui/eventHandler/EmptyEventHandler.js";
import * as StateLogicService$WonderEditor from "../../../../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../../../../../../service/state/engine/state/StateEngineService.js";
import * as RenameNodeAssetLogicService$WonderEditor from "../../../../../../../../../service/stateTuple/logic/asset/RenameNodeAssetLogicService.js";

var setUndoValueToCopiedEngineState = EmptyEventHandler$WonderEditor.EmptyEventHandler[1];

function handleSelfLogic(param, nodeId, value) {
  var dispatchFunc = param[1];
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  StateLogicService$WonderEditor.setState(Result$WonderEditor.SameDataResult[/* handleError */5]((function (param) {
              Curry._1(dispatchFunc, [
                    AppStore$WonderEditor.UpdateAction,
                    /* Update */[/* array */[/* Project */4]]
                  ]);
              return /* tuple */[
                      param[0],
                      param[1]
                    ];
            }), (function (msg, param) {
              var editorState = param[0];
              ConsoleUtils$WonderEditor.warn(msg, editorState);
              Curry._1(dispatchFunc, [
                    AppStore$WonderEditor.UpdateAction,
                    /* Update */[/* array */[
                        /* Console */5,
                        /* BottomHeader */3,
                        /* Inspector */2
                      ]]
                  ]);
              return /* tuple */[
                      editorState,
                      param[1]
                    ];
            }), RenameNodeAssetLogicService$WonderEditor.renameNode(nodeId, value, /* tuple */[
                editorState,
                engineState
              ])));
  return /* () */0;
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
