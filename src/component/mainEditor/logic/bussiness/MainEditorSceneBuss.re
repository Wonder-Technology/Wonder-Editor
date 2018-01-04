let getScene = ((editorState, engineState)) => editorState |> MainEditorSceneEdit.getScene;

let getCurrentGameObject = ((editorState, engineState) as stateTuple) =>
  engineState
  |> MainEditorGameObjectOper.getChildren(getScene(stateTuple))
  |> Js.Array.filter((gameObject) => ! MainEditorCameraOper.isCamera(gameObject, engineState))
  |> OperateArrayUtils.getFirst;

let disposeGameObjectChildren = (gameObject, (editorState, engineState)) => (
  editorState,
  engineState
  |> MainEditorGameObjectOper.getChildren(gameObject)
  |> Js.Array.reduce(
       (engineState, gameObject) =>
         engineState |> MainEditorGameObjectOper.disposeGameObject(gameObject),
       engineState
     )
);