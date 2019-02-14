open EditorType;

open SceneViewType;

let _getData = sceneViewRecord =>
  sceneViewRecord.transformGizmoData |> OptionService.unsafeGet;

let _isCurrentGizmoTranslation = editorState =>
  switch (
    RecordTransformGizmoSceneViewEditorService.unsafeGetData(editorState).
      currentGizmoType
  ) {
  | Translation => true
  | _ => false
  };

let isTransformGizmoRender = editorState =>
  SceneTreeEditorService.hasCurrentSceneTreeNode(editorState);

let isTranslationWholeGizmoRender = editorState =>
  SceneTreeEditorService.hasCurrentSceneTreeNode(editorState)
  && _isCurrentGizmoTranslation(editorState);