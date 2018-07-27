open InspectorType;

let getComponentTypeMap = inspectorRecord => inspectorRecord.componentTypeMap;

let setComponentTypeMap = (componentTypeMap, inspectorRecord) => {
  ...inspectorRecord,
  componentTypeMap,
};

let setResult = (index, result, inspectorRecord) => {
  ...inspectorRecord,
  componentTypeMap:
    inspectorRecord.componentTypeMap
    |> SparseMapService.immutableSet(index, result),
};