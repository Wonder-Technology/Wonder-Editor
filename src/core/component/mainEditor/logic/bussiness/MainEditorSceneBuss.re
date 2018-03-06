/* let addBox = ((editorState, engineState) as stateTuple) => {
  let (engineState, box) = MainEditorPrimitiveOper.createBox(engineState);
  (
    box,
    (
      editorState,
      engineState
      |> MainEditorGameObjectOper.initGameObject(box)
      |> MainEditorGameObjectOper.addChild(stateTuple |> SceneFacade.unsafeGetScene, box)
    )
  )
}; */

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