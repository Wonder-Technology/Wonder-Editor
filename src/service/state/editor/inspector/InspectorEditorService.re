open EditorType;

let getComponentTypeMap = editorState =>
  editorState.inspectorRecord
  |> ComponentTypeMapInspectorService.getComponentTypeMap;

let setComponentTypeMap = (componentTypeMap, editorState) => {
  ...editorState,
  inspectorRecord:
    editorState.inspectorRecord
    |> ComponentTypeMapInspectorService.setComponentTypeMap(componentTypeMap),
};

let clearComponentTypeMap = editorState => {
  ...editorState,
  inspectorRecord:
    editorState.inspectorRecord
    |> ComponentTypeMapInspectorService.clearComponentTypeMap,
};

let addComponentTypeToMap = (index, componentType, editorState) => {
  ...editorState,
  inspectorRecord:
    editorState.inspectorRecord
    |> ComponentTypeMapInspectorService.addComponentTypeToMap(
         index,
         componentType,
       ),
};

let removeComponentTypeToMap = (index, componentType, editorState) => {
  ...editorState,
  inspectorRecord:
    editorState.inspectorRecord
    |> ComponentTypeMapInspectorService.removeComponentTypeToMap(
         index,
         componentType,
       ),
};

let clearComponentType = editorState => {
  ...editorState,
  inspectorRecord:
    editorState.inspectorRecord
    |> ComponentTypeMapInspectorService.clearComponentType,
};