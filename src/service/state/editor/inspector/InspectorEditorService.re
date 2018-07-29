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

let addComponentTypeToMap = (index, result, editorState) => {
  ...editorState,
  inspectorRecord:
    editorState.inspectorRecord
    |> ComponentTypeMapInspectorService.addComponentTypeToMap(index, result),
};