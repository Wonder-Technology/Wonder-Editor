open InspectorComponentType;

type inspectorRecord = {
  componentTypeMap: WonderCommonlib.SparseMapService.t(array(componentType)),
  defaultGeometryMap: WonderCommonlib.SparseMapService.t(int),
  defaultMaterialMap: WonderCommonlib.SparseMapService.t(int),
};