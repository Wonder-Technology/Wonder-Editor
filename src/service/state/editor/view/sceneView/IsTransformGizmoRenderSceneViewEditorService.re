open EditorType;

open SceneViewType;

let _getData = sceneViewRecord =>
  sceneViewRecord.transformGizmoData |> OptionService.unsafeGet;

let isTranslationWholeGizmoRender = editorState =>
  SceneTreeEditorService.hasCurrentSceneTreeNode(editorState);