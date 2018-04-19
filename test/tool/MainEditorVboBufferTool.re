open Wonderjs;

let passBufferShouldExistCheckWhenDisposeGeometry = (geometryIndex, state: MainStateDataType.state) => {
  open VboBufferType;
  let {boxGeometryVertexBufferMap, boxGeometryElementArrayBufferMap} = state.vboBufferRecord;
  WonderCommonlib.SparseMapService.set(geometryIndex, Obj.magic(0), boxGeometryVertexBufferMap);
  WonderCommonlib.SparseMapService.set(geometryIndex, Obj.magic(0), boxGeometryElementArrayBufferMap);
  state
};