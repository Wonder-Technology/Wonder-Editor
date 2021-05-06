'use strict';

var SetOutlineDataJob$WonderEditor = require("../../../../src/core/job/loop/SetOutlineDataJob.js");
var OperateOutlineDataJobDataService$Wonderjs = require("wonder.js/lib/js/src/service/record/main/jobData/outlineData/OperateOutlineDataJobDataService.js");

function getGameObjectsNeedDrawOutline(engineState) {
  return OperateOutlineDataJobDataService$Wonderjs.getGameObjectsNeedDrawOutline(engineState[/* jobDataRecord */46]);
}

var getOutlineColor = SetOutlineDataJob$WonderEditor._getOutlineColor;

exports.getOutlineColor = getOutlineColor;
exports.getGameObjectsNeedDrawOutline = getGameObjectsNeedDrawOutline;
/* SetOutlineDataJob-WonderEditor Not a pure module */
