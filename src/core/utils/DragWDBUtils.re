open SceneTreeNodeType;

let _checkLightCount = (gameObject, (editorState, engineState)) => {
  let result =
    (
      GameObjectEngineService.getAllDirectionLights(
        GameObjectEngineService.getAllGameObjects(gameObject, engineState),
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
          GameObjectEngineService.getAllGameObjects(gameObject, engineState),
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
      wdbGameObjectUid,
      targetGameObjectUid,
      dragPosition,
      (editorState, engineState),
    ) =>
  switch (_checkLightCount(wdbGameObjectUid, (editorState, engineState))) {
  | (engineState, false) => (false, (editorState, engineState))
  | (engineState, true) =>
    let (cloneGameObjectArr, engineState) =
      engineState
      |> GameObjectEngineService.cloneGameObject(wdbGameObjectUid, 1, true);

    let allClonedGameObjectArr =
      cloneGameObjectArr
      |> CloneGameObjectLogicService.getAllClonedGameObjectArr;

    let clonedWDBGameObject =
      cloneGameObjectArr |> CloneGameObjectLogicService.getClonedGameObject;
    Js.log(clonedWDBGameObject);

    let engineState =
      switch (dragPosition) {
      | DragBeforeTarget =>
        engineState
        |> GameObjectUtils.addChild(
             GameObjectUtils.getParent(targetGameObjectUid, engineState)
             |> OptionService.unsafeGet,
             clonedWDBGameObject,
           )
        |> GameObjectEngineService.changeGameObjectChildOrder(
             wdbGameObjectUid,
             targetGameObjectUid,
             WonderEditor.TransformType.Before,
           )

      | DragIntoTarget =>
        engineState
        |> GameObjectUtils.addChild(targetGameObjectUid, clonedWDBGameObject)
      | DragAfterTarget =>
        engineState
        |> GameObjectUtils.addChild(
             GameObjectUtils.getParent(targetGameObjectUid, engineState)
             |> OptionService.unsafeGet,
             clonedWDBGameObject,
           )
        |> GameObjectEngineService.changeGameObjectChildOrder(
             wdbGameObjectUid,
             targetGameObjectUid,
             WonderEditor.TransformType.After,
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