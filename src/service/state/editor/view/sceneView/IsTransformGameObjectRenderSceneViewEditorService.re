open EditorType;

open SceneViewType;

let _getData = sceneViewRecord =>
  sceneViewRecord.transformGameObjectData |> OptionService.unsafeGet;

let isTranslationWholeGameObjectRender = editorState =>
  SceneTreeEditorService.hasCurrentSceneTreeNode(editorState);