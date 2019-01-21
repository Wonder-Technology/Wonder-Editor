let addCube =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorLeftHeader.Method.addGameObjectByType(
    (uiState, dispatchFunc),
    AddGameObjectType.Cude,
    (),
  );

let addSphere =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorLeftHeader.Method.addGameObjectByType(
    (uiState, dispatchFunc),
    AddGameObjectType.Sphere,
    (),
  );

let addEmptyGameObject =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorLeftHeader.Method.addGameObjectByType(
    (uiState, dispatchFunc),
    AddGameObjectType.EmptyGameObject,
    (),
  );

let disposeCurrentSceneTreeNode =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorLeftHeader.Method.disposeCurrentSceneTreeNode(
    (uiState, dispatchFunc |> Obj.magic),
    (),
    (),
  );

let cloneCurrentSceneTreeNode =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      (),
    ) =>
  MainEditorLeftHeader.Method.cloneCurrentSceneTreeNode(
    (uiState, dispatchFunc |> Obj.magic),
    (),
    (),
  );