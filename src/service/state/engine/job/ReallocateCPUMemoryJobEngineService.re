open Wonderjs;

let reallocateGameObjectByDisposeCount = ReallocateCPUMemoryJobAPI.reallocateGameObjectByDisposeCount;

/* TODO remove */
let reallocateGameObject = (engineState: StateDataMainType.state) => {
  ...engineState,
  gameObjectRecord:
    ReallocateGameObjectCPUMemoryService.reAllocate(
      engineState.gameObjectRecord,
    ),
};

let isDisposeTooMany = ReallocateCPUMemoryJobAPI.isDisposeTooMany;

let isGeometryBufferNearlyFull = ReallocateCPUMemoryJobAPI.isGeometryBufferNearlyFull;

let initGeometryBufferData = ReallocateCPUMemoryJobAPI.initGeometryBufferData;

let resetDisposeCount = ReallocateCPUMemoryJobAPI.resetDisposeCount;

let reAllocateToBuffer = ReallocateCPUMemoryJobAPI.reAllocateToBuffer;

let initGeometryBufferData = ReallocateCPUMemoryJobAPI.initGeometryBufferData;

let reallocateGeometry = ReallocateCPUMemoryJobAPI.reallocateGeometry;