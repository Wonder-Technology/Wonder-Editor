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

let reallocateJob = (_, engineState) => reallocate(0.9, engineState);