'use strict';

import * as EngineStateLogicService$WonderEditor from "../service/logic_service/engineState/EngineStateLogicService.js";

function undo(historyState, engineState) {
  return EngineStateLogicService$WonderEditor.restoreState(engineState, EngineStateLogicService$WonderEditor.undo(historyState, engineState));
}

function redo(historyState, engineState) {
  return EngineStateLogicService$WonderEditor.restoreState(engineState, EngineStateLogicService$WonderEditor.redo(historyState, engineState));
}

function storeEngineState(engineState, historyState) {
  return EngineStateLogicService$WonderEditor.storeEngineState(EngineStateLogicService$WonderEditor.deepCopyStateForRestore(engineState), historyState);
}

var deepCopyStateForRestore = EngineStateLogicService$WonderEditor.deepCopyStateForRestore;

var restoreState = EngineStateLogicService$WonderEditor.restoreState;

var getEngineState = EngineStateLogicService$WonderEditor.getState;

var setEngineState = EngineStateLogicService$WonderEditor.setState;

export {
  deepCopyStateForRestore ,
  restoreState            ,
  getEngineState          ,
  setEngineState          ,
  undo                    ,
  redo                    ,
  storeEngineState        ,
  
}
/* EngineStateLogicService-WonderEditor Not a pure module */
