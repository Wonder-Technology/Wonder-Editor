open InspectorType;

let getComponentTypeMap = inspectorRecord => inspectorRecord.componentTypeMap;

let setComponentTypeMap = (componentTypeMap, inspectorRecord) => {
  ...inspectorRecord,
  componentTypeMap,
};

let _getAddedComponentTypeArr = (index, componentType, inspectorRecord) =>
  switch (
    inspectorRecord.componentTypeMap
    |> WonderCommonlib.SparseMapService.get(index)
  ) {
  | None => ArrayService.create() |> ArrayService.push(componentType)
  | Some(map) => map |> Js.Array.copy |> ArrayService.push(componentType)
  };

let addComponentTypeToMap = (index, componentType, inspectorRecord) => {
  ...inspectorRecord,
  componentTypeMap:
    inspectorRecord.componentTypeMap
    |> SparseMapService.immutableSet(
         index,
         _getAddedComponentTypeArr(index, componentType, inspectorRecord),
       ),
};