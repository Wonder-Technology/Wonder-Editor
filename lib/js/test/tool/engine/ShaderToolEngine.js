'use strict';

var MutableHashMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/MutableHashMapService.js");

function isInitShaderCacheClear(engineState) {
  return MutableHashMapService$WonderCommonlib.length(engineState[/* shaderRecord */28][/* shaderLibShaderIndexMap */2]) === 0;
}

exports.isInitShaderCacheClear = isInitShaderCacheClear;
/* No side effect */
