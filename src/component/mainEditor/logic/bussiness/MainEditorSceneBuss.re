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

let clearCurrentGameObject = ((editorState, engineState)) => (
  editorState |> MainEditorSceneEdit.clearCurrentGameObject,
  engineState
);

let addBoxGameObject = ((editorState, engineState) as stateTuple) => {
  let (engineState, box) = MainEditorPrimitiveOper.createBox(engineState);
  (
    editorState,
    engineState
    |> MainEditorGameObjectOper.initGameObject(box)
    |> MainEditorGameObjectOper.addChild(stateTuple |> unsafeGetScene, box)
  )
};

let disposeCurrentGameObject = (gameObject, (editorState, engineState)) => (
  editorState,
  engineState |> MainEditorGameObjectOper.disposeGameObject(gameObject)
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