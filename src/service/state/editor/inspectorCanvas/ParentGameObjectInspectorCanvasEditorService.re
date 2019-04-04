open EditorType;

let getParentGameObject = editorState =>
  editorState.inspectorCanvasRecord
  |> ParentGameObjectInspectorCanvasService.getParentGameObject;

let unsafeGetParentGameObject = editorState =>
  editorState.inspectorCanvasRecord
  |> ParentGameObjectInspectorCanvasService.getParentGameObject
  |> OptionService.unsafeGet;

let setParentGameObject = (parentGameObject, editorState) => {
  ...editorState,
  inspectorCanvasRecord:
    editorState.inspectorCanvasRecord
    |> ParentGameObjectInspectorCanvasService.setParentGameObject(
         parentGameObject,
       ),
};