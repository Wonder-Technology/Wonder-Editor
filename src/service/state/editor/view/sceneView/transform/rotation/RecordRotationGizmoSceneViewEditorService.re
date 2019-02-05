open EditorType;

open SceneViewType;

let getData = editorState =>
  editorState
  |> RecordTransformGizmoSceneViewEditorService.getData
  |> Js.Option.andThen((. data) => Some(data.rotationGizmoData));

let unsafeGetData = editorState =>
  editorState |> getData |> OptionService.unsafeGet;