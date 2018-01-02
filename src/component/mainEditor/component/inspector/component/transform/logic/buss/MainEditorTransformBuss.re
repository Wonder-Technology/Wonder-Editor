let getLocalPosition = ((_, engineState), currentGameObject) => {
  let currentGameObjectTransform =
    MainEditorGameObjectOper.getTransformComponent(currentGameObject, engineState);
  MainEditorTransformOper.getLocalPosition(currentGameObjectTransform, engineState)
};

let setLocalPosition = (currentGameObject, positionTuple, (editorState, engineState)) => {
  let currentGameObjectTransform =
    MainEditorGameObjectOper.getTransformComponent(currentGameObject, engineState);
  let engineState =
    MainEditorTransformOper.setLocalPosition(
      currentGameObjectTransform,
      positionTuple,
      engineState
    );
  (editorState, engineState)
};