open MainEditorTransformBuss;

let getLocalPosition = (stateTuple) => {
  let (_, _, currentGameObject) = stateTuple |> MainEditorSceneBuss.getCurrentGameObject;
  getLocalPosition(stateTuple, currentGameObject)
};

let setLocalPosition = (positionTuple, stateTuple) => {
  let (editorState, _) = stateTuple;
  let (_, _, currentGameObject) = stateTuple |> MainEditorSceneBuss.getCurrentGameObject;
  let engineState = stateTuple |> setLocalPosition(currentGameObject, positionTuple);
  (editorState, engineState)
};