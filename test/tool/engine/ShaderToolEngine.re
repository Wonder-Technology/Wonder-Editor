open Wonderjs;

open StateDataMainType;

let isInitShaderCacheClear = engineState =>
  engineState.shaderRecord.shaderLibShaderIndexMap
  |> WonderCommonlib.MutableHashMapService.length === 0;