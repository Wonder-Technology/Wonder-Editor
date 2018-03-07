'use strict';

import * as EngineStateLogicSingleService$WonderEditor from "../service/logic_service/single/EngineStateLogicSingleService.js";

function undo(historyState, engineState) {
  return EngineStateLogicSingleService$WonderEditor.restoreState(engineState, EngineStateLogicSingleService$WonderEditor.undo(historyState, engineState));
}

function redo(historyState, engineState) {
  return EngineStateLogicSingleService$WonderEditor.restoreState(engineState, EngineStateLogicSingleService$WonderEditor.redo(historyState, engineState));
}

function storeState(engineState, historyState) {
  return EngineStateLogicSingleService$WonderEditor.storeEngineState(EngineStateLogicSingleService$WonderEditor.deepCopyStateForRestore(engineState), historyState);
}

var deepCopyStateForRestore = EngineStateLogicSingleService$WonderEditor.deepCopyStateForRestore;

var restoreState = EngineStateLogicSingleService$WonderEditor.restoreState;

var getState = EngineStateLogicSingleService$WonderEditor.getState;

var setState = EngineStateLogicSingleService$WonderEditor.setState;

export {
  deepCopyStateForRestore ,
  restoreState            ,
  getState                ,
  setState                ,
  undo                    ,
  redo                    ,
  storeState              ,
  
}
/* EngineStateLogicSingleService-WonderEditor Not a pure module */
