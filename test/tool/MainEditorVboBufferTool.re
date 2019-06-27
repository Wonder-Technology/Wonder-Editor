open Wonderjs;

let passBufferShouldExistCheckWhenDisposeGeometry =
    (geometryIndex, state: StateDataMainType.state) => {
  open AllVboBufferType;
  let {geometryVertexBufferMap, geometryElementArrayBufferMap} =
    state.vboBufferRecord;
  WonderCommonlib.ImmutableSparseMapService.set(
    geometryIndex,
    Obj.magic(0),
    geometryVertexBufferMap,
  );
  WonderCommonlib.ImmutableSparseMapService.set(
    geometryIndex,
    Obj.magic(0),
    geometryElementArrayBufferMap,
  );
  state;
};