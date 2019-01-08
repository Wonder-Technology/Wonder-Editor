open EditorType;

open PickingType;

let getSphereShape = (geometry, {pickingRecord}) =>
  WonderCommonlib.SparseMapService.get(
    geometry,
    pickingRecord.sphereShapeMap,
  );

let unsafeGetSphereShape = (geometry, editorState) =>
  getSphereShape(geometry, editorState) |> OptionService.unsafeGet;

let setSphereShape = (geometry, sphereShape, {pickingRecord} as editorState) => {
  ...editorState,
  pickingRecord: {
    sphereShapeMap:
      WonderCommonlib.SparseMapService.set(
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
      WonderCommonlib.SparseMapService.deleteVal(
        geometry,
        pickingRecord.sphereShapeMap |> Obj.magic,
      )
      |> Obj.magic,
  },
};