open SceneTreeNodeType;

let _checkLightCount = (gameObject, (editorState, engineState)) => {
  let result =
    (
      GameObjectEngineService.getAllDirectionLights(
        HierarchyGameObjectEngineService.getAllGameObjects(
          gameObject,
          engineState,
        ),
        engineState,
      )
      |> Js.Array.length
    )
    +
    DirectionLightEngineService.getLightCount(engineState) > DirectionLightEngineService.getBufferMaxCount() ?
      {
        ConsoleUtils.warn(
          MainEditorLightUtils.getDirectionLightExceedMaxCountMessage(),
          editorState,
        );

        false;
      } :
      (
        GameObjectEngineService.getAllPointLights(
          HierarchyGameObjectEngineService.getAllGameObjects(
            gameObject,
            engineState,
          ),
          engineState,
        )
        |> Js.Array.length
      )
      +
      PointLightEngineService.getLightCount(engineState) > PointLightEngineService.getBufferMaxCount() ?
        {
          ConsoleUtils.warn(
            MainEditorLightUtils.getPointLightExceedMaxCountMessage(),
            editorState,
          );

          false;
        } :
        true;

  (engineState, result);
};

let dragWDB =
    (
      wdbGameObject,
      targetGameObject,
      dragPosition,
      (editorState, engineState),
    ) =>
  switch (_checkLightCount(wdbGameObject, (editorState, engineState))) {
  | (engineState, false) => (false, (editorState, engineState))
  | (engineState, true) =>
    let (cloneGameObjectArr, engineState) =
      engineState
      |> GameObjectEngineService.cloneGameObject(wdbGameObject, 1, true);

    let allClonedGameObjectArr =
      cloneGameObjectArr
      |> CloneGameObjectLogicService.getAllClonedGameObjectArr;

    let clonedWDBGameObject =
      cloneGameObjectArr |> CloneGameObjectLogicService.getClonedGameObject;

    let engineState =
      SceneEngineService.isSceneGameObject(targetGameObject)
      |> StateLogicService.getEngineStateToGetData ?
        DragGameObjectUtils.handleDragToBeSceneGameObjectChild(
          dragPosition,
          targetGameObject,
          clonedWDBGameObject,
          engineState,
        ) :
        DragGameObjectUtils.handleDragToBeTargetGameObjectSib(
          dragPosition,
          targetGameObject,
          clonedWDBGameObject,
          engineState,
        );

    let engineState =
      SceneEngineService.isNeedReInitAllLightMaterials(
        allClonedGameObjectArr,
        engineState,
      ) ?
        engineState
        |> SceneEngineService.clearShaderCacheAndReInitAllLightMaterials :
        engineState;

    let editorState =
      editorState
      |> GameObjectComponentLogicService.setGameObjectArrComponentTypeMap(
           [|clonedWDBGameObject|],
           GameObjectComponentLogicService.buildAllComponentArray(),
           engineState,
         );

    editorState |> StateEditorService.setState |> ignore;

    let engineState =
      StateLogicService.refreshEngineStateAndReturnEngineState(engineState);

    (true, (StateEditorService.getState(), engineState));
  };