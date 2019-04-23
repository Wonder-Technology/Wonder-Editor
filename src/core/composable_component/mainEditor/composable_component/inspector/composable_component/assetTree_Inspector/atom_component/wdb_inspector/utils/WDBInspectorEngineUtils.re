let rec _iterateCreateNewWDBGameObject =
        (gameObject, engineState, inspectorEngineState) => {
  let (newGameObject, inspectorEngineState) =
    CloneGameObjectLogicService.cloneGameObjectToOtherEngineState(
      gameObject,
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
         ((newGameObject, inspectorEngineState), gameObjectChild) => {
           let (newGameObjectChild, inspectorEngineState) =
             _iterateCreateNewWDBGameObject(
               gameObjectChild,
               engineState,
               inspectorEngineState,
             );

           let inspectorEngineState =
             inspectorEngineState
             |> HierarchyGameObjectEngineService.addChild(
                  newGameObject,
                  newGameObjectChild,
                );

           (newGameObject, inspectorEngineState);
         },
         (newGameObject, inspectorEngineState),
       ) :
    (newGameObject, inspectorEngineState);
};

let _setCameraDistance = (newWDBGameObject, inspectorEngineState) => {
  let camera =
    GameObjectInspectorEngineService.unsafeGetCamera(inspectorEngineState);

  inspectorEngineState
  |> FocusUtils.setEditorCameraFocusTargetGameObject(
       camera,
       newWDBGameObject,
       1.9,
     );
};

let createWDBIntoInspectorCanvas =
    (wdbGameObject, (editorState, engineState), inspectorEngineState) => {
  let containerGameObject =
    editorState
    |> ContainerGameObjectInspectorCanvasEditorService.unsafeGetContainerGameObject;

  let (newWDBGameObject, inspectorEngineState) =
    _iterateCreateNewWDBGameObject(
      wdbGameObject,
      engineState,
      inspectorEngineState,
    );

  inspectorEngineState
  |> HierarchyGameObjectEngineService.addChild(
       containerGameObject,
       newWDBGameObject,
     );

  inspectorEngineState |> _setCameraDistance(newWDBGameObject);
};