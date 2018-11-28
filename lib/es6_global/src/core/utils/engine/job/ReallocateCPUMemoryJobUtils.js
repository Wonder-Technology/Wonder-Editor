

import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as BufferSettingService$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/setting/BufferSettingService.js";
import * as QueryCPUMemoryService$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/memory/QueryCPUMemoryService.js";
import * as RecordGeometryMainService$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/geometry/RecordGeometryMainService.js";
import * as ReallocateCPUMemoryJobUtils$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/job/utils/ReallocateCPUMemoryJobUtils.js";
import * as ReallocateGeometryCPUMemoryService$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/memory/ReallocateGeometryCPUMemoryService.js";

function _reallocateGeometryToNewBuffer(percent, engineState) {
  var settingRecord = engineState[/* settingRecord */0];
  var geometryRecord = RecordGeometryMainService$Wonderjs.getRecord(engineState);
  var newrecord = Caml_array.caml_array_dup(engineState);
  var tmp;
  if (QueryCPUMemoryService$Wonderjs.isDisposeTooMany(geometryRecord[/* disposeCount */16], settingRecord) || QueryCPUMemoryService$Wonderjs.isGeometryBufferNearlyFull(percent, geometryRecord)) {
    geometryRecord[/* disposeCount */16] = 0;
    var geometryPointCount = BufferSettingService$Wonderjs.getGeometryPointCount(settingRecord);
    var geometryCount = BufferSettingService$Wonderjs.getGeometryCount(settingRecord);
    var match = RecordGeometryMainService$Wonderjs._initBufferData(geometryPointCount, geometryCount);
    tmp = ReallocateGeometryCPUMemoryService$Wonderjs.reAllocateToBuffer(/* tuple */[
          match[0],
          match[1],
          match[2],
          match[3],
          match[4],
          match[5],
          match[6],
          match[7],
          match[8],
          match[9]
        ], geometryRecord);
  } else {
    tmp = geometryRecord;
  }
  newrecord[/* geometryRecord */22] = tmp;
  return newrecord;
}

function reallocate(percent, engineState) {
  return _reallocateGeometryToNewBuffer(percent, ReallocateCPUMemoryJobUtils$Wonderjs._reallocateGameObjectByDisposeCount(engineState));
}

function reallocateJob(_, engineState) {
  return _reallocateGeometryToNewBuffer(0.9, ReallocateCPUMemoryJobUtils$Wonderjs._reallocateGameObjectByDisposeCount(engineState));
}

export {
  _reallocateGeometryToNewBuffer ,
  reallocate ,
  reallocateJob ,
  
}
/* BufferSettingService-Wonderjs Not a pure module */
