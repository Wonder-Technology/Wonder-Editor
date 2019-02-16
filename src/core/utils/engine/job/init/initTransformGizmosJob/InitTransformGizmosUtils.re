let getCurrentSceneTreeNodePosition = (editorState, engineState) =>
  TransformEngineService.getPosition(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    ),
    engineState,
  );

let getCurrentSceneTreeNodeLocalPosition = (editorState, engineState) =>
  TransformEngineService.getLocalPosition(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    ),
    engineState,
  );

let getCurrentSceneTreeNodeLocalEulerAngles = (editorState, engineState) =>
  TransformEngineService.getLocalEulerAngles(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    ),
    engineState,
  );

let getCurrentSceneTreeNodeEulerAngles = (editorState, engineState) =>
  TransformEngineService.getEulerAngles(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    ),
    engineState,
  );

let getCurrentSceneTreeNodeLocalScale = (editorState, engineState) =>
  TransformEngineService.getLocalScale(
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState),
      engineState,
    ),
    engineState,
  );

let refreshInspector = (editorState, engineState) => {
  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  let dispatchFunc = UIStateService.getDispatch();

  dispatchFunc(AppStore.UpdateAction(Update([|UpdateStore.Inspector|])))
  |> ignore;

  (StateEditorService.getState(), StateEngineService.unsafeGetState());
};

let pushUndoStack =
    (
      startData,
      pushUndoStackWithCopiedEngineStateFunc,
      editorState,
      engineState,
    ) => {
  let currentSceneTreeNode =
    SceneTreeEditorService.unsafeGetCurrentSceneTreeNode(editorState);

  let transform =
    GameObjectComponentEngineService.unsafeGetTransformComponent(
      currentSceneTreeNode,
      engineState,
    );

  editorState |> StateEditorService.setState |> ignore;
  engineState |> StateEngineService.setState |> ignore;

  pushUndoStackWithCopiedEngineStateFunc(
    (UIStateService.getState(), UIStateService.getDispatch()),
    transform,
    startData,
  );

  StateEngineService.unsafeGetState();
};