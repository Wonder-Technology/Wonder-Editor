

import * as List from "../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as DisposeJob$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/job/no_worker/loop/DisposeJob.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as NoWorkerJobMainService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/job/no_worker/NoWorkerJobMainService.js";

function isJobExistInJobList(targetName, jobList) {
  return List.exists((function (param) {
                return param[0] === targetName;
              }), jobList);
}

function execDisposeJob() {
  return StateLogicService$WonderEditor.getAndSetEditAndRunEngineState((function (param) {
                return DisposeJob$Wonderjs.execJob(undefined, param);
              }));
}

var init = NoWorkerJobMainService$Wonderjs.init;

var execInitJobs = NoWorkerJobMainService$Wonderjs.execNoWorkerInitJobs;

var execLoopJobs = NoWorkerJobMainService$Wonderjs.execNoWorkerLoopJobs;

var getNoWorkerInitJobList = NoWorkerJobMainService$Wonderjs._getNoWorkerInitJobList;

var getNoWorkerLoopJobList = NoWorkerJobMainService$Wonderjs._getNoWorkerLoopJobList;

export {
  init ,
  execInitJobs ,
  execLoopJobs ,
  getNoWorkerInitJobList ,
  getNoWorkerLoopJobList ,
  isJobExistInJobList ,
  execDisposeJob ,
  
}
/* DisposeJob-Wonderjs Not a pure module */
