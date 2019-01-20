open InspectorType;

let getComponentTypeMap = inspectorRecord => inspectorRecord.componentTypeMap;

let setComponentTypeMap = (componentTypeMap, inspectorRecord) => {
  ...inspectorRecord,
  componentTypeMap,
};

let clearComponentTypeMap = inspectorRecord => {
  ...inspectorRecord,
  componentTypeMap: WonderCommonlib.ImmutableSparseMapService.createEmpty(),
};

let _addComponentType = (index, componentType, componentTypeMap) =>
  switch (componentTypeMap |> WonderCommonlib.ImmutableSparseMapService.get(index)) {
  | None => ArrayService.create() |> ArrayService.push(componentType)
  | Some(map) => map |> Js.Array.copy |> ArrayService.push(componentType)
  };

let addComponentTypeToMap = (index, componentType, inspectorRecord) => {
  ...inspectorRecord,
  componentTypeMap:
    inspectorRecord.componentTypeMap
    |> WonderCommonlib.ImmutableSparseMapService.set(
         index,
         _addComponentType(
           index,
           componentType,
           inspectorRecord.componentTypeMap,
         ),
       ),
};

let removeComponentTypeToMap = (index, componentType, inspectorRecord) => {
  ...inspectorRecord,
  componentTypeMap:
    switch (
      inspectorRecord.componentTypeMap
      |> WonderCommonlib.ImmutableSparseMapService.get(index)
    ) {
    | Some(componentTypeArr) =>
      inspectorRecord.componentTypeMap
      |> WonderCommonlib.ImmutableSparseMapService.set(
           index,
           componentTypeArr
           |> Js.Array.filter(componentTypeItem =>
                componentTypeItem != componentType
              ),
         )
    | None => inspectorRecord.componentTypeMap
    },
};

let clearComponentType = inspectorRecord => {
  ...inspectorRecord,
  componentTypeMap: WonderCommonlib.ImmutableSparseMapService.createEmpty(),
};