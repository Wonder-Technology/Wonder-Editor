module InspectorBuss = {
  module TransformBuss = {
    let getLocalPosition = (stateTuple, currentGameObject) => {
      let (_, engineState) = stateTuple;
      let currentGameObjectTransform =
        MainEditorGameObjectOper.getTransformComponent(currentGameObject, engineState);
      MainEditorTransformOper.getLocalPosition(currentGameObjectTransform, engineState)
    };
    let setLocalPosition = (stateTuple, currentGameObject) => {
      let (_, engineState) = stateTuple;
      let currentGameObjectTransform =
        MainEditorGameObjectOper.getTransformComponent(currentGameObject, engineState);
      MainEditorTransformOper.setLocalPosition(
        currentGameObjectTransform,
        (3.8, 2.9, 2.),
        engineState
      )
    };
  };
};