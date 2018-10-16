let addBox =
    (
      ~store=TestTool.buildAppStateSceneGraphFromEngine(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorSceneTreeHeader.Method.addGameObjectByType(
    (store, dispatchFunc),
    AddGameObjectType.Box,
    (),
  );

let addEmptyGameObject =
    (
      ~store=TestTool.buildAppStateSceneGraphFromEngine(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorSceneTreeHeader.Method.addGameObjectByType(
    (store, dispatchFunc),
    AddGameObjectType.EmptyGameObject,
    (),
  );

let disposeCurrentSceneTreeNode =
    (
      ~store=TestTool.buildAppStateSceneGraphFromEngine(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorSceneTreeHeader.Method.disposeCurrentSceneTreeNode(
    (store, dispatchFunc |> Obj.magic),
    (),
    (),
  );