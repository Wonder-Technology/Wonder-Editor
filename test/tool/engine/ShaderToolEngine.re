open Wonderjs;

open StateDataMainType;

let isShaderCacheClear = engineState =>
  engineState.shaderRecord.shaderIndexMap
  |> WonderCommonlib.HashMapService.length === 0;