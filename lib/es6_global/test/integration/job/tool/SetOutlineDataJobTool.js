

import * as SetOutlineDataJob$WonderEditor from "../../../../src/core/job/loop/SetOutlineDataJob.js";
import * as OperateOutlineDataJobDataService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/jobData/outlineData/OperateOutlineDataJobDataService.js";

function getGameObjectsNeedDrawOutline(engineState) {
  return OperateOutlineDataJobDataService$Wonderjs.getGameObjectsNeedDrawOutline(engineState[/* jobDataRecord */43]);
}

var getOutlineColor = SetOutlineDataJob$WonderEditor._getOutlineColor;

export {
  getOutlineColor ,
  getGameObjectsNeedDrawOutline ,
  
}
/* SetOutlineDataJob-WonderEditor Not a pure module */
