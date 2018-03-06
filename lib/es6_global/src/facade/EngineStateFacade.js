'use strict';

import * as EngineStateLogicService$WonderEditor from "../service/logic_service/engineState/EngineStateLogicService.js";

function undo(historyState, engineState) {
  return EngineStateLogicService$WonderEditor.restoreState(engineState, EngineStateLogicService$WonderEditor.undo(historyState, engineState));
}

function redo(historyState, engineState) {
  return EngineStateLogicService$WonderEditor.restoreState(engineState, EngineStateLogicService$WonderEditor.redo(historyState, engineState));
}

function storeState(engineState, historyState) {
  return EngineStateLogicService$WonderEditor.storeEngineState(EngineStateLogicService$WonderEditor.deepCopyStateForRestore(engineState), historyState);
}

var deepCopyStateForRestore = EngineStateLogicService$WonderEditor.deepCopyStateForRestore;

var restoreState = EngineStateLogicService$WonderEditor.restoreState;

var getState = EngineStateLogicService$WonderEditor.getState;

var setState = EngineStateLogicService$WonderEditor.setState;

export {
  deepCopyStateForRestore ,
  restoreState            ,
  getState                ,
  setState                ,
  undo                    ,
  redo                    ,
  storeState              ,
  
}
/* EngineStateLogicService-WonderEditor Not a pure module */
