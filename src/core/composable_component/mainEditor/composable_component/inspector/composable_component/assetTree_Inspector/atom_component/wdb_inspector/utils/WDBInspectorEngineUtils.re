let rec _iterateWDBGameObject =
        (gameObject, engineState, inspectorEngineState) => {
  let (newGameObject, inspectorEngineState) =
    CloneGameObjectLogicService.cloneGameObjectToOtherEngineState(
      gameObject,
      engineState,
      inspectorEngineState,
    );
    Js.log2("newGame", newGameObject );

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

let createWDBIntoInspectorCanvas =
    (wdbGameObject, (editorState, engineState), inspectorEngineState) => {
  let (newGameObject, inspectorEngineState) =
    _iterateWDBGameObject(wdbGameObject, engineState, inspectorEngineState);

  inspectorEngineState
  |> HierarchyGameObjectEngineService.getChildren(7)
  |> Js.log;

  inspectorEngineState;
};