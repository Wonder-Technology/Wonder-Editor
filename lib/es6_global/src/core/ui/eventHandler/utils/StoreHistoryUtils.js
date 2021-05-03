

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as AllStateData$WonderEditor from "../../../../service/stateTuple/data/AllStateData.js";
import * as AllHistoryService$WonderEditor from "../../../../service/stateTuple/history/AllHistoryService.js";

function _storeHistoryState(uiState, storeHistoryStateFunc, param) {
  return AllStateData$WonderEditor.setHistoryState(Curry._3(storeHistoryStateFunc, uiState, /* tuple */[
                  param[0],
                  param[1]
                ], AllStateData$WonderEditor.getHistoryState(/* () */0)));
}

function storeHistoryStateWithCopiedEngineState(uiState, param) {
  return _storeHistoryState(uiState, AllHistoryService$WonderEditor.storeCopiedEngineHistoryState, /* tuple */[
              param[0],
              param[1]
            ]);
}

function storeHistoryStateWithNoCopyEngineState(uiState, param) {
  return _storeHistoryState(uiState, AllHistoryService$WonderEditor.storeHistoryState, /* tuple */[
              param[0],
              param[1]
            ]);
}

export {
  _storeHistoryState ,
  storeHistoryStateWithCopiedEngineState ,
  storeHistoryStateWithNoCopyEngineState ,
  
}
/* AllHistoryService-WonderEditor Not a pure module */
