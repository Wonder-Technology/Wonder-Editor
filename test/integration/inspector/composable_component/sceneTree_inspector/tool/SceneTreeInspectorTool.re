let renameGameObject =
    (
      ~name,
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  SceneTreeInspector.Method.reNameGameObjectBlurEvent(
    (uiState, dispatchFunc),
    gameObject,
    name,
  );