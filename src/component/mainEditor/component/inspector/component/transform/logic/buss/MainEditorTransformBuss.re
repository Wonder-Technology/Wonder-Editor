let getCurrentGameObjectLocalPosition = (currentGameObjectTransform, (_, engineState)) =>
  MainEditorTransformOper.getLocalPosition(currentGameObjectTransform, engineState);

let setCurrentGameObjectLocalPosition =
    (currentGameObjectTransform, positionTuple, (editorState, engineState)) => (
  editorState,
  MainEditorTransformOper.setLocalPosition(currentGameObjectTransform, positionTuple, engineState)
);