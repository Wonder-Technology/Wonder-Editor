

import * as AllStateData$WonderEditor from "../../../../service/stateTuple/data/AllStateData.js";
import * as AllHistoryService$WonderEditor from "../../../../service/stateTuple/history/AllHistoryService.js";

function storeHistoryStateWithCopiedEngineState(store, param) {
  return AllStateData$WonderEditor.setHistoryState(AllHistoryService$WonderEditor.storeCopiedEngineHistoryState(store, /* tuple */[
                  param[0],
                  param[1]
                ], AllStateData$WonderEditor.getHistoryState(/* () */0)));
}

function storeHistoryStateWithNoCopyEngineState(store, param) {
  return AllStateData$WonderEditor.setHistoryState(AllHistoryService$WonderEditor.storeHistoryState(store, /* tuple */[
                  param[0],
                  param[1]
                ], AllStateData$WonderEditor.getHistoryState(/* () */0)));
}

export {
  storeHistoryStateWithCopiedEngineState ,
  storeHistoryStateWithNoCopyEngineState ,
  
}
/* AllStateData-WonderEditor Not a pure module */
