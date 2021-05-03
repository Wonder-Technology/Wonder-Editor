

import * as AllStateData$WonderEditor from "../../../../src/service/stateTuple/data/AllStateData.js";

function clearAllState() {
  return AllStateData$WonderEditor.setHistoryState(AllStateData$WonderEditor.createHistoryState(/* () */0));
}

export {
  clearAllState ,
  
}
/* No side effect */
