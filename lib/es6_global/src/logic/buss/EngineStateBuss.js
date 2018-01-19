'use strict';

import * as EngineStateOper$WonderEditor from "../operator/EngineStateOper.js";

function getEngineState() {
  return EngineStateOper$WonderEditor.getState(/* () */0);
}

var setEngineState = EngineStateOper$WonderEditor.setState;

function goBack(engineState) {
  return EngineStateOper$WonderEditor.restoreState(engineState, EngineStateOper$WonderEditor.goBack(EngineStateOper$WonderEditor.deepCopyStateForRestore(engineState)));
}

function goForward(engineState) {
  return EngineStateOper$WonderEditor.restoreState(engineState, EngineStateOper$WonderEditor.goForward(engineState));
}

function storeEngineState(engineState) {
  return EngineStateOper$WonderEditor.storeEngineState(EngineStateOper$WonderEditor.deepCopyStateForRestore(engineState));
}

var deepCopyStateForRestore = EngineStateOper$WonderEditor.deepCopyStateForRestore;

var restoreState = EngineStateOper$WonderEditor.restoreState;

export {
  deepCopyStateForRestore ,
  restoreState            ,
  getEngineState          ,
  setEngineState          ,
  goBack                  ,
  goForward               ,
  storeEngineState        ,
  
}
/* EngineStateOper-WonderEditor Not a pure module */
