open EditorType;

open SceneViewType;

let getData = ({sceneViewRecord}) => sceneViewRecord.transformGizmoData;

let unsafeGetData = editorState =>
  editorState |> getData |> OptionService.unsafeGet;