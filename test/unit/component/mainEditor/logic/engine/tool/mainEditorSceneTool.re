let getScene = MainEditorSceneEdit.getScene;

let _isBox = (gameObject, engineState) =>
  MainEditorGameObjectAdaptor.hasGeometry(gameObject, engineState);

let getBoxInDefaultScene = (editorState, engineState) =>{
   MainEditorGameObjectTool.getChildren(getScene(editorState), engineState)
  |> Js.Array.filter((gameObject) => _isBox(gameObject, engineState))
  |> Js.Array.pop |> Js.Option.getExn;
}
  /* MainEditorGameObjectTool.getChildren(getScene(editorState), engineState)
  |> Js.Array.filter((gameObject) => _isBox(gameObject, engineState))
  /* use wonder-commonlib */
  |> Js.Array.unsafePop; */