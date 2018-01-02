let getScene = MainEditorSceneEdit.getScene;

let _isBox = (gameObject, engineState) =>
  MainEditorGameObjectAdaptor.hasGeometry(gameObject, engineState);

let getBoxInDefaultScene = (editorState, engineState) =>
  MainEditorGameObjectToolEngine.getChildren(getScene(editorState), engineState)
  |> Js.Array.filter((gameObject) => _isBox(gameObject, engineState))
  |> WonderCommonlib.ArraySystem.unsafePop;