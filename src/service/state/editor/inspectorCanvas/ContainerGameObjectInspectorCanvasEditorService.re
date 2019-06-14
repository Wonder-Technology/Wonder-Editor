open EditorType;

let getContainerGameObject = editorState =>
  editorState.inspectorCanvasRecord
  |> ContainerGameObjectInspectorCanvasService.getContainerGameObject;

let unsafeGetContainerGameObject = editorState =>
  editorState.inspectorCanvasRecord
  |> ContainerGameObjectInspectorCanvasService.getContainerGameObject
  |> OptionService.unsafeGet;

let setContainerGameObject = (containerGameObject, editorState) => {
  ...editorState,
  inspectorCanvasRecord:
    editorState.inspectorCanvasRecord
    |> ContainerGameObjectInspectorCanvasService.setContainerGameObject(
         containerGameObject,
       ),
};