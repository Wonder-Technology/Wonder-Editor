let _reallocateGeometryToNewBuffer = (percent, engineState) =>
  if (ReallocateCPUMemoryJobEngineService.isDisposeTooMany(engineState)
      || ReallocateCPUMemoryJobEngineService.isGeometryBufferNearlyFull(
           percent,
           engineState,
         )) {
    let engineState =
      engineState |> ReallocateCPUMemoryJobEngineService.resetDisposeCount;

    ReallocateCPUMemoryJobEngineService.reAllocateToBuffer(
      ReallocateCPUMemoryJobEngineService.initGeometryBufferData(engineState),
      engineState,
    );
  } else {
    engineState;
  };

let reallocate = (percent, engineState) =>
  engineState
  |> ReallocateCPUMemoryJobEngineService.reallocateGameObjectByDisposeCount
  |> _reallocateGeometryToNewBuffer(percent);

let reallocateEveryTime = engineState => {
  WonderLog.Log.log({j|trigger reallocateEveryTime|j});

  let engineState =
    engineState
    |> ReallocateCPUMemoryJobEngineService.resetDisposeCount
    |> ReallocateCPUMemoryJobEngineService.reallocateGameObjectByDisposeCount;

  ReallocateCPUMemoryJobEngineService.reAllocateToBuffer(
    ReallocateCPUMemoryJobEngineService.initGeometryBufferData(engineState),
    engineState,
  );
};

let reallocateJob = (_, engineState) => reallocate(0.9, engineState);