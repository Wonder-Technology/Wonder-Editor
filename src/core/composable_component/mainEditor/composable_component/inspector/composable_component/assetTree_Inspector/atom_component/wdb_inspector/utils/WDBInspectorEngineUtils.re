let rec _iterateWDBGameObject =
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
  Js.log2("newGame", newGameObject);

  engineState |> HierarchyGameObjectEngineService.hasChildren(gameObject) ?
    engineState
    |> HierarchyGameObjectEngineService.getChildren(gameObject)
    |> Js.Array.reduce(
         ((newGameObject, inspectorEngineState), gameObjectChild) => {
           let (newGameObjectChild, inspectorEngineState) =
             _iterateWDBGameObject(
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

  let (_center, distance) =
    inspectorEngineState |> FocusUtils.calcCenterAndDistance(newWDBGameObject);

  inspectorEngineState
  |> TransformEngineService.setLocalPosition(
       (0., 0., distance),
       GameObjectComponentEngineService.unsafeGetTransformComponent(
         camera,
         inspectorEngineState,
       ),
     );
};

let createWDBIntoInspectorCanvas =
    (wdbGameObject, (editorState, engineState), inspectorEngineState) => {
  let containerGameObject =
    editorState
    |> ContainerGameObjectInspectorCanvasEditorService.unsafeGetContainerGameObject;
  let (newWDBGameObject, inspectorEngineState) =
    _iterateWDBGameObject(wdbGameObject, engineState, inspectorEngineState);

  inspectorEngineState
  |> GameObjectEngineService.initGameObject(newWDBGameObject)
  |> HierarchyGameObjectEngineService.addChild(
       containerGameObject,
       newWDBGameObject,
     );

  inspectorEngineState |> _setCameraDistance(newWDBGameObject);
};