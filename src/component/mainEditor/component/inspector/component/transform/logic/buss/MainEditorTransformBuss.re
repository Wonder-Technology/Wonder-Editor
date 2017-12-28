let getLocalPosition = (stateTuple, currentGameObject) => {
  let (_, engineState) = stateTuple;
  let currentGameObjectTransform =
    MainEditorGameObjectOper.getTransformComponent(currentGameObject, engineState);
  MainEditorTransformOper.getLocalPosition(currentGameObjectTransform, engineState)
};

let setLocalPosition = (currentGameObject, positionTuple, stateTuple) => {
  let (editorState, engineState) = stateTuple;
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