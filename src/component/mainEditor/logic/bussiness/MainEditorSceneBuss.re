let getScene = ((editorState, engineState)) => editorState |> MainEditorSceneEdit.getScene;

let getCurrentGameObject = ((editorState, engineState) as stateTuple) => {
  let scene = getScene(stateTuple);
  let currentGameObject =
    engineState
    |> MainEditorGameObjectOper.getChildren(scene)
    |> Js.Array.filter((gameObject) => ! MainEditorCameraOper.isCamera(gameObject, engineState))
    |> OperateArrayUtils.getFirst;
  (editorState, engineState, currentGameObject)
};

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