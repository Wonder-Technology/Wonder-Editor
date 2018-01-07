let getScene = ((editorState, engineState)) => editorState |> MainEditorSceneEdit.getScene;

let getCurrentGameObject = ((editorState, engineState)) =>
  MainEditorSceneEdit.getCurrentGameObject(editorState);

let hasCurrentGameObject = ((editorState, engineState)) =>
  MainEditorSceneEdit.hasCurrentGameObject(editorState);

let setCurrentGameObject = (gameObject, (editorState, engineState)) => (
  editorState |> MainEditorSceneEdit.setCurrentGameObject(gameObject),
  engineState
);

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
/* let getCurrentGameObject = ((editorState, engineState) as stateTuple) =>
   engineState
   |> MainEditorGameObjectOper.getChildren(getScene(stateTuple))
   |> Js.Array.filter((gameObject) => ! MainEditorCameraOper.isCamera(gameObject, engineState))
   |> OperateArrayUtils.getFirst; */