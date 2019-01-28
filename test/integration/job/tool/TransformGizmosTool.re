let getArrowFromAxisGameObject = (axisGameObject, engineState) =>
  axisGameObject |> GameObjectTool.getChild(_, 0, engineState);

let getArrowGameObject = (editorState, engineState) => {
  let xAxisGameObject =
    TransformGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo
    |> StateLogicService.getEditorState;

  getArrowFromAxisGameObject(xAxisGameObject, engineState);
};

let getLineFromAxisGameObject = (axisGameObject, engineState) =>
  axisGameObject |> GameObjectTool.getChild(_, 1, engineState);

let getLineGameObject = (editorState, engineState) => {
  let xAxisGameObject =
    TransformGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo
    |> StateLogicService.getEditorState;

  getLineFromAxisGameObject(xAxisGameObject, engineState);
};