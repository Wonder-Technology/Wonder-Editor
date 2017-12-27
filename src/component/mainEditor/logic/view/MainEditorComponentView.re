module InspectorView = {
  open MainEditorComponentBuss.InspectorBuss;
  module TransformView = {
    let getLocalPosition = (stateTuple) => {
      let (_, _, currentGameObject) = stateTuple |> MainEditorSceneBuss.getCurrentGameObject;
      TransformBuss.getLocalPosition(stateTuple, currentGameObject)
    };
    let setLocalPosition = (positionTuple, stateTuple) => {
      let (editorState, _) = stateTuple;
      let (_, _, currentGameObject) = stateTuple |> MainEditorSceneBuss.getCurrentGameObject;
      let engineState =
        stateTuple |> TransformBuss.setLocalPosition(currentGameObject, positionTuple);
      (editorState, engineState)
    };
  };
};

module SceneTreeView = {
  open MainEditorComponentBuss.SceneTreeBuss;
  let getDragedSceneGraphData = getDragedSceneGraphData;
  let getSceneTree = getSceneTree;
};