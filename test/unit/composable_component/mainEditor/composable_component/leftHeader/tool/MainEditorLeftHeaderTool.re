let addCube =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorLeftHeader.Method.addGameObjectByType(
    (store, dispatchFunc),
    AddGameObjectType.Cude,
    (),
  );

let addSphere =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorLeftHeader.Method.addGameObjectByType(
    (store, dispatchFunc),
    AddGameObjectType.Sphere,
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