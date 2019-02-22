open EditorType;

open PickingType;

let getSphereShape = (geometry, {pickingRecord}) =>
  WonderCommonlib.ImmutableSparseMapService.get(
    geometry,
    pickingRecord.sphereShapeMap,
  );

let unsafeGetSphereShape = (geometry, editorState) =>
  getSphereShape(geometry, editorState) |> OptionService.unsafeGet;

let setSphereShape = (geometry, sphereShape, {pickingRecord} as editorState) => {
  ...editorState,
  pickingRecord: {
    sphereShapeMap:
      WonderCommonlib.ImmutableSparseMapService.set(
        geometry,
        sphereShape,
        pickingRecord.sphereShapeMap,
      ),
  },
};

let removeSphereShape = (geometry, {pickingRecord} as editorState) => {
  ...editorState,
  pickingRecord: {
    sphereShapeMap:
      WonderCommonlib.ImmutableSparseMapService.deleteVal(
        geometry,
        pickingRecord.sphereShapeMap,
      ),
  },
};

let clearSphereShape = editorState => {
  ...editorState,
  pickingRecord: {
    sphereShapeMap: WonderCommonlib.ImmutableSparseMapService.createEmpty(),
  },
};