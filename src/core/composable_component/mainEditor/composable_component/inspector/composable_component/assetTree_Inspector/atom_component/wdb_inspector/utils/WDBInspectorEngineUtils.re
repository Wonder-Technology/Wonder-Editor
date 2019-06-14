let rec _iterateCreateNewWDBGameObject =
        (gameObject, editorState, engineState, inspectorEngineState) => {
  let (newGameObject, editorState, inspectorEngineState) =
    CloneGameObjectLogicService.cloneGameObjectToOtherEngineState(
      gameObject,
      editorState,
      engineState,
      inspectorEngineState,
    );

  let inspectorEngineState =
    inspectorEngineState
    |> GameObjectEngineService.initGameObject(newGameObject);

  engineState |> HierarchyGameObjectEngineService.hasChildren(gameObject) ?
    engineState
    |> HierarchyGameObjectEngineService.getChildren(gameObject)
    |> Js.Array.reduce(
         (
           (newGameObject, editorState, inspectorEngineState),
           gameObjectChild,
         ) => {
           let (newGameObjectChild, editorState, inspectorEngineState) =
             _iterateCreateNewWDBGameObject(
               gameObjectChild,
               editorState,
               engineState,
               inspectorEngineState,
             );

           let inspectorEngineState =
             inspectorEngineState
             |> HierarchyGameObjectEngineService.addChild(
                  newGameObject,
                  newGameObjectChild,
                );

           (newGameObject, editorState, inspectorEngineState);
         },
         (newGameObject, editorState, inspectorEngineState),
       ) :
    (newGameObject, editorState, inspectorEngineState);
};

let setCameraFocusWDBGameObject = (newWDBGameObject, inspectorEngineState) => {
  let camera =
    GameObjectInspectorEngineService.unsafeGetCamera(inspectorEngineState);

  inspectorEngineState
  |> FocusUtils.setCameraFocusTargetGameObject(camera, newWDBGameObject, 1.9);
};

let createWDBIntoInspectorCanvas =
    (wdbGameObject, editorState, engineState, inspectorEngineState) => {
  let containerGameObject =
    editorState
    |> ContainerGameObjectInspectorCanvasEditorService.unsafeGetContainerGameObject;

  let (newWDBGameObject, editorState, inspectorEngineState) =
    _iterateCreateNewWDBGameObject(
      wdbGameObject,
      editorState,
      engineState,
      inspectorEngineState,
    );

  inspectorEngineState
  |> HierarchyGameObjectEngineService.addChild(
       containerGameObject,
       newWDBGameObject,
     );

  (newWDBGameObject, editorState, inspectorEngineState);
};