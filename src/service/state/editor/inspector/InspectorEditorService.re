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

let setResult = (index, result, editorState) => {
  ...editorState,
  inspectorRecord:
    editorState.inspectorRecord
    |> ComponentTypeMapInspectorService.setResult(index, result),
};