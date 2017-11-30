module InspectorBuss = {
  module TransformBuss = {
    let getLocalPosition = (stateTuple, currentGameObject) => {
      let (_, engineState) = stateTuple;
      let currentGameObjectTransform =
        MainEditorGameObjectOper.getTransformComponent(currentGameObject, engineState);
      MainEditorTransformOper.getLocalPosition(currentGameObjectTransform, engineState)
    };
    let setLocalPosition = (currentGameObject, positionTuple, stateTuple) => {
      let (_, engineState) = stateTuple;
      let currentGameObjectTransform =
        MainEditorGameObjectOper.getTransformComponent(currentGameObject, engineState);
      MainEditorTransformOper.setLocalPosition(
        currentGameObjectTransform,
        positionTuple,
        engineState
      )
    };
  };
};