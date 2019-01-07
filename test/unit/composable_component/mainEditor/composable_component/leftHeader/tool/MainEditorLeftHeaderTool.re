let addCube =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorLeftHeader.Method.addGameObjectByType(
    (store, dispatchFunc),
    AddGameObjectType.Box,
    (),
  );

let addEmptyGameObject =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorLeftHeader.Method.addGameObjectByType(
    (store, dispatchFunc),
    AddGameObjectType.EmptyGameObject,
    (),
  );

let disposeCurrentSceneTreeNode =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorLeftHeader.Method.disposeCurrentSceneTreeNode(
    (store, dispatchFunc |> Obj.magic),
    (),
    (),
  );

let cloneCurrentSceneTreeNode =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorLeftHeader.Method.cloneCurrentSceneTreeNode(
    (store, dispatchFunc |> Obj.magic),
    (),
    (),
  );