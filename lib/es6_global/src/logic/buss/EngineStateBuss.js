'use strict';

import * as EngineStateOper$WonderEditor from "../operator/EngineStateOper.js";

function goBack(engineState) {
  return EngineStateOper$WonderEditor.restoreState(engineState, EngineStateOper$WonderEditor.goBack(engineState));
}

function goForward(engineState) {
  return EngineStateOper$WonderEditor.restoreState(engineState, EngineStateOper$WonderEditor.goForward(engineState));
}

function storeEngineState(engineState) {
  return EngineStateOper$WonderEditor.storeEngineState(EngineStateOper$WonderEditor.deepCopyStateForRestore(engineState));
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
  goBack                  ,
  goForward               ,
  storeEngineState        ,
  
}
/* EngineStateOper-WonderEditor Not a pure module */
