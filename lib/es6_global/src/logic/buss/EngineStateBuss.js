'use strict';

import * as EngineStateOper$WonderEditor from "../operator/EngineStateOper.js";

function undo(historyState, engineState) {
  return EngineStateOper$WonderEditor.restoreState(engineState, EngineStateOper$WonderEditor.undo(historyState, engineState));
}

function redo(historyState, engineState) {
  return EngineStateOper$WonderEditor.restoreState(engineState, EngineStateOper$WonderEditor.redo(historyState, engineState));
}

function storeEngineState(engineState, historyState) {
  return EngineStateOper$WonderEditor.storeEngineState(EngineStateOper$WonderEditor.deepCopyStateForRestore(engineState), historyState);
}

var deepCopyStateForRestore = EngineStateOper$WonderEditor.deepCopyStateForRestore;

var restoreState = EngineStateOper$WonderEditor.restoreState;

var getEngineState = EngineStateOper$WonderEditor.getState;

var setEngineState = EngineStateOper$WonderEditor.setState;

export {
  deepCopyStateForRestore ,
  restoreState            ,
  getEngineState          ,
  setEngineState          ,
  undo                    ,
  redo                    ,
  storeEngineState        ,
  
}
/* EngineStateOper-WonderEditor Not a pure module */
