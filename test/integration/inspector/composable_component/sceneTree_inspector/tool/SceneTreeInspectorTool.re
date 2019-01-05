let renameGameObject =
    (
      ~name,
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  SceneTreeInspector.Method.reNameGameObjectBlurEvent(
    (store, dispatchFunc),
    gameObject,
    name,
  );