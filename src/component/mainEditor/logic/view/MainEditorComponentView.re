open MainEditorComponentBuss;

module InspectorView = {
  open InspectorBuss;
  module TransformView = {
    let getLocalPosition = (stateTuple) => {
      let (_, _, currentGameObject) = stateTuple |> MainEditorSceneBuss.getCurrentGameObject;
      TransformBuss.getLocalPosition(stateTuple, currentGameObject)
    };
    let setLocalPosition = (stateTuple) => {
      let (editorState, _) = stateTuple;
      let (_, _, currentGameObject) = stateTuple |> MainEditorSceneBuss.getCurrentGameObject;
      let engineState = TransformBuss.setLocalPosition(stateTuple, currentGameObject);
      (editorState, engineState)
    };
  };
};