let getCurrentGameObjectLocalPosition = ((_, engineState), currentGameObject) =>
  MainEditorTransformOper.getLocalPosition(
    MainEditorGameObjectOper.getTransformComponent(currentGameObject, engineState),
    engineState
  );

let setCurrentGameObjectLocalPosition =
    (currentGameObject, positionTuple, (editorState, engineState)) => (
  editorState,
  MainEditorTransformOper.setLocalPosition(
    MainEditorGameObjectOper.getTransformComponent(currentGameObject, engineState),
    positionTuple,
    engineState
  )
);