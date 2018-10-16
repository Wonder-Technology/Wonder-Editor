let renameGameObject =
    (
      ~name,
      ~gameObject=GameObjectTool.unsafeGetCurrentSceneTreeNode(),
      ~store=TestTool.buildAppStateSceneGraphFromEngine(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  SceneTreeInspector.Method.reNameGameObjectBlurEvent(
    (store, dispatchFunc),
    gameObject,
    name,
  );