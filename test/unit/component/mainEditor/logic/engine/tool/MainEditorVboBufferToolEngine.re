open Wonderjs;

let passBufferShouldExistCheckWhenDisposeGeometry = (geometryIndex, state: StateDataType.state) => {
    open VboBufferType;
    let {vertexBufferMap, elementArrayBufferMap} =
      VboBufferStateUtils.getVboBufferData(state);
    WonderCommonlib.SparseMapSystem.set(geometryIndex, Obj.magic(0), vertexBufferMap);
    WonderCommonlib.SparseMapSystem.set(geometryIndex, Obj.magic(0), elementArrayBufferMap);
    state
  };