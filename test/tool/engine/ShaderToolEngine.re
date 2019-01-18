open Wonderjs;

open StateDataMainType;

let isInitShaderCacheClear = engineState =>
  engineState.shaderRecord.shaderLibShaderIndexMap
  |> WonderCommonlib.HashMapService.length === 0;