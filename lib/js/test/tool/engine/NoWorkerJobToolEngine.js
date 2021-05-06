'use strict';

var List = require("bs-platform/lib/js/list.js");
var DisposeJob$Wonderjs = require("wonder.js/lib/js/src/job/no_worker/loop/DisposeJob.js");
var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var NoWorkerJobMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/job/no_worker/NoWorkerJobMainService.js");

function isJobExistInJobList(targetName, jobList) {
  return List.exists((function (param) {
                return param[0] === targetName;
              }), jobList);
}

function execDisposeJob(param) {
  return StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                return DisposeJob$Wonderjs.execJob(undefined, param);
              }));
}

var init = NoWorkerJobMainService$Wonderjs.init;

var execInitJobs = NoWorkerJobMainService$Wonderjs.execNoWorkerInitJobs;

var execLoopJobs = NoWorkerJobMainService$Wonderjs.execNoWorkerLoopJobs;

var getNoWorkerInitJobList = NoWorkerJobMainService$Wonderjs._getNoWorkerInitJobList;

var getNoWorkerLoopJobList = NoWorkerJobMainService$Wonderjs._getNoWorkerLoopJobList;

exports.init = init;
exports.execInitJobs = execInitJobs;
exports.execLoopJobs = execLoopJobs;
exports.getNoWorkerInitJobList = getNoWorkerInitJobList;
exports.getNoWorkerLoopJobList = getNoWorkerLoopJobList;
exports.isJobExistInJobList = isJobExistInJobList;
exports.execDisposeJob = execDisposeJob;
/* DisposeJob-Wonderjs Not a pure module */
