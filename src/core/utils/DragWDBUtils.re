let _checkLightCount = (gameObject, engineState) => {
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
          );

          false;
        } :
        true;

  (engineState, result);
};

let dragWDB =
    (wdbGameObjectUid, targetGameObjectUid, (editorState, engineState)) =>
  switch (_checkLightCount(wdbGameObjectUid, engineState)) {
  | (engineState, false) => (false, (editorState, engineState))
  | (engineState, true) =>
    let (cloneGameObjectArr, engineState) =
      engineState
      |> OperateGameObjectLogicService.cloneGameObject(
           wdbGameObjectUid,
           1,
           true,
         );
    let flatCloneGameObjectArr =
      cloneGameObjectArr
      |> OperateGameObjectLogicService.getFlattenClonedGameObjectArr;

    let clonedWDBGameObject =
      flatCloneGameObjectArr |> ArrayService.unsafeGetFirst;

    let engineState =
      engineState
      |> GameObjectUtils.addChild(targetGameObjectUid, clonedWDBGameObject);

    let engineState =
      SceneEngineService.doesNeedReInitSceneAllLightMaterials(
        flatCloneGameObjectArr,
        engineState,
      ) ?
        engineState
        |> SceneEngineService.clearShaderCacheAndReInitSceneAllLightMaterials :
        engineState;

    let editorState =
      editorState
      |> GameObjectComponentLogicService.getGameObjectComponentStoreInComponentTypeMap(
           [|clonedWDBGameObject|],
           engineState,
         );

    let engineState =
      StateLogicService.refreshEngineStateAndReturnEngineState(engineState);

    (true, (editorState, engineState));
  };