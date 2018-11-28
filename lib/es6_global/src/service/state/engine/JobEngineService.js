

import * as JobAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/JobAPI.js";
import * as DisposeJob$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/job/no_worker/loop/DisposeJob.js";

function execDisposeJob(engineState) {
  return DisposeJob$Wonderjs.execJob(undefined, engineState);
}

var registerNoWorkerInitJob = JobAPI$Wonderjs.registerNoWorkerInitJob;

var registerNoWorkerLoopJob = JobAPI$Wonderjs.registerNoWorkerLoopJob;

export {
  registerNoWorkerInitJob ,
  registerNoWorkerLoopJob ,
  execDisposeJob ,
  
}
/* JobAPI-Wonderjs Not a pure module */
