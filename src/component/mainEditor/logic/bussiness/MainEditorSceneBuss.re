let unsafeGetScene = ((editorState, _engineState)) =>
  editorState |> MainEditorSceneEdit.unsafeGetScene;

let unsafeGetCurrentGameObject = ((editorState, _engineState)) =>
  MainEditorSceneEdit.unsafeGetCurrentGameObject(editorState);

let getCurrentGameObject = ((editorState, _engineState)) =>
  MainEditorSceneEdit.getCurrentGameObject(editorState);

let hasCurrentGameObject = ((editorState, _engineState)) =>
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