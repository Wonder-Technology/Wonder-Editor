open SceneTreeNodeType;

let _checkLightCount = (gameObject, (editorState, engineState)) => {
  let result =
    (
      GameObjectEngineService.getAllDirectionLights(
        HierarchyGameObjectEngineService.getAllGameObjects(gameObject, engineState),
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
          HierarchyGameObjectEngineService.getAllGameObjects(gameObject, engineState),
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
      switch (dragPosition) {
      | DragBeforeTarget =>
        engineState
        |> HierarchyGameObjectEngineService.addChild(
             HierarchyGameObjectEngineService.getParentGameObject(
               targetGameObject,
               engineState,
             )
             |> OptionService.unsafeGet,
             clonedWDBGameObject,
           )
        |> HierarchyGameObjectEngineService.changeGameObjectChildOrder(
             clonedWDBGameObject,
             targetGameObject,
             Wonderjs.TransformType.Before,
           )

      | DragIntoTarget =>
        engineState
        |> HierarchyGameObjectEngineService.addChild(targetGameObject, clonedWDBGameObject)

      | DragAfterTarget =>
        engineState
        |> HierarchyGameObjectEngineService.addChild(
             HierarchyGameObjectEngineService.getParentGameObject(
               targetGameObject,
               engineState,
             )
             |> OptionService.unsafeGet,
             clonedWDBGameObject,
           )
        |> HierarchyGameObjectEngineService.changeGameObjectChildOrder(
             clonedWDBGameObject,
             targetGameObject,
             Wonderjs.TransformType.After,
           )
      };

    let engineState =
      SceneEngineService.isNeedReInitSceneAllLightMaterials(
        allClonedGameObjectArr,
        engineState,
      ) ?
        engineState
        |> SceneEngineService.clearShaderCacheAndReInitSceneAllLightMaterials :
        engineState;

    let editorState =
      editorState
      |> GameObjectComponentLogicService.setGameObjectArrComponentTypeMap(
           [|clonedWDBGameObject|],
           GameObjectComponentLogicService.buildAllComponentArray(),
           engineState,
         );

    let engineState =
      StateLogicService.refreshEngineStateAndReturnEngineState(engineState);

    (true, (editorState, engineState));
  };