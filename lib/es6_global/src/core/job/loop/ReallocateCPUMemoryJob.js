

import * as ReallocateCPUMemoryJobEngineService$WonderEditor from "../../../service/state/engine/job/ReallocateCPUMemoryJobEngineService.js";

function _reallocateGeometryToNewBuffer(percent, engineState) {
  if (ReallocateCPUMemoryJobEngineService$WonderEditor.isDisposeTooMany(engineState) || ReallocateCPUMemoryJobEngineService$WonderEditor.isGeometryBufferNearlyFull(percent, engineState)) {
    var engineState$1 = ReallocateCPUMemoryJobEngineService$WonderEditor.resetDisposeCount(engineState);
    return ReallocateCPUMemoryJobEngineService$WonderEditor.reAllocateToBuffer(ReallocateCPUMemoryJobEngineService$WonderEditor.initGeometryBufferData(engineState$1), engineState$1);
  } else {
    return engineState;
  }
}

function reallocate(percent, engineState) {
  return _reallocateGeometryToNewBuffer(percent, ReallocateCPUMemoryJobEngineService$WonderEditor.reallocateGameObjectByDisposeCount(engineState));
}

function reallocateJob(param, engineState) {
  return _reallocateGeometryToNewBuffer(0.9, ReallocateCPUMemoryJobEngineService$WonderEditor.reallocateGameObjectByDisposeCount(engineState));
}

export {
  _reallocateGeometryToNewBuffer ,
  reallocate ,
  reallocateJob ,
  
}
/* ReallocateCPUMemoryJobEngineService-WonderEditor Not a pure module */
