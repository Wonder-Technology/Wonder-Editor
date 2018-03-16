open Wonderjs;

let passBufferShouldExistCheckWhenDisposeGeometry = (geometryIndex, state: MainStateDataType.state) => {
  open VboBufferType;
  let {vertexBufferMap, elementArrayBufferMap} = state.vboBufferRecord;
  WonderCommonlib.SparseMapService.set(geometryIndex, Obj.magic(0), vertexBufferMap);
  WonderCommonlib.SparseMapService.set(geometryIndex, Obj.magic(0), elementArrayBufferMap);
  state
};