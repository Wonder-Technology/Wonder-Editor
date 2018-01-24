'use strict';

import * as EngineStateOper$WonderEditor from "../operator/EngineStateOper.js";

function goBack(allState, engineState) {
  return EngineStateOper$WonderEditor.restoreState(engineState, EngineStateOper$WonderEditor.goBack(allState, engineState));
}

function goForward(allState, engineState) {
  return EngineStateOper$WonderEditor.restoreState(engineState, EngineStateOper$WonderEditor.goForward(allState, engineState));
}

function storeEngineState(engineState, allState) {
  return EngineStateOper$WonderEditor.storeEngineState(EngineStateOper$WonderEditor.deepCopyStateForRestore(engineState), allState);
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
