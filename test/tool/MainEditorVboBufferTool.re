open Wonderjs;

let passBufferShouldExistCheckWhenDisposeGeometry =
    (geometryIndex, state: StateDataMainType.state) => {
  open VboBufferType;
  let {geometryVertexBufferMap, geometryElementArrayBufferMap} =
    state.vboBufferRecord;
  WonderCommonlib.SparseMapService.set(
    geometryIndex,
    Obj.magic(0),
    geometryVertexBufferMap,
  );
  WonderCommonlib.SparseMapService.set(
    geometryIndex,
    Obj.magic(0),
    geometryElementArrayBufferMap,
  );
  state;
};