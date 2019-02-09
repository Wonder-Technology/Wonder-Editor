let getArrowFromAxisGameObject = (axisGameObject, engineState) =>
  axisGameObject |> GameObjectTool.getChild(_, 0, engineState);

let getArrowGameObject = (editorState, engineState) => {
  let xAxisGameObject =
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo
    |> StateLogicService.getEditorState;

  getArrowFromAxisGameObject(xAxisGameObject, engineState);
};

let getLineFromAxisGameObject = (axisGameObject, engineState) =>
  axisGameObject |> GameObjectTool.getChild(_, 1, engineState);

let getLineGameObject = (editorState, engineState) => {
  let xAxisGameObject =
    OperateTranslationGizmoSceneViewEditorService.unsafeGetTranslationXAxisGizmo
    |> StateLogicService.getEditorState;

  getLineFromAxisGameObject(xAxisGameObject, engineState);
};

let setCoordinateSystem = coordinateSystem => {
  CoordinateSystemTransformGizmoSceneViewEditorService.setCoordinateSystem(
    coordinateSystem,
  )
  |> StateLogicService.getAndSetEditorState;

  StateLogicService.getAndRefreshEngineState();
};