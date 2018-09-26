open SelectType;

open MainEditorLightType;

let getLightOptions = () => [|
  {key: DirectionLight |> convertLightTypeToInt, value: "direction_light"},
  {key: PointLight |> convertLightTypeToInt, value: "point_light"},
|];

let getLightTypeByGameObject = (gameObject, engineState) =>
  switch (
    GameObjectComponentEngineService.hasDirectionLightComponent(
      gameObject,
      engineState,
    ),
    GameObjectComponentEngineService.hasPointLightComponent(
      gameObject,
      engineState,
    ),
  ) {
  | (true, false) => DirectionLight
  | (false, true) => PointLight
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getLightTypeByGameObject",
        ~description={j|gameObject:$gameObject should has light component|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let handleSpecificFuncByLightType =
    (lightType, (handleDirectionLightFunc, handlePointLightFunc)) => {
  let currentSceneTreeNode =
    SceneEditorService.unsafeGetCurrentSceneTreeNode
    |> StateLogicService.getEditorState;

  switch (lightType) {
  | DirectionLight => currentSceneTreeNode |> handleDirectionLightFunc

  | PointLight => currentSceneTreeNode |> handlePointLightFunc
  };
};

let isLightExceedMaxCountByType = (targetLightType, engineState) =>
  switch (targetLightType) {
  | DirectionLight => (
      "the direction light count is exceed max count!",
      engineState |> DirectionLightEngineService.isMaxCount,
    )

  | PointLight => (
      "the point light count is exceed max count!",
      engineState |> PointLightEngineService.isMaxCount,
    )
  };

let _getOperateSourceLightFunc = (lightType, gameObject, engineState) =>
  switch (lightType) {
  | DirectionLight => (
      engineState
      |> GameObjectComponentEngineService.unsafeGetDirectionLightComponent(
           gameObject,
         ),
      OperateDirectionLightLogicService.disposeDirectionLight,
    )
  | PointLight => (
      engineState
      |> GameObjectComponentEngineService.unsafeGetPointLightComponent(
           gameObject,
         ),
      OperatePointLightLogicService.disposePointLight,
    )
  };

let _getOperateTargetLightFunc = (lightType, engineState) =>
  switch (lightType) {
  | DirectionLight => (
      OperateDirectionLightLogicService.createDirectionLight(engineState),
      OperateDirectionLightLogicService.addDirectionLight,
    )
  | PointLight => (
      OperatePointLightLogicService.createPointLight(engineState),
      OperatePointLightLogicService.addPointLight,
    )
  };

let replaceLightByType = (sourceLightType, targetLightType) => {
  let gameObject =
    SceneEditorService.unsafeGetCurrentSceneTreeNode
    |> StateLogicService.getEditorState;
  let engineState = StateEngineService.unsafeGetState();

  let (message, isMaxCount) =
    isLightExceedMaxCountByType(targetLightType, engineState);

  isMaxCount ?
    { ConsoleUtils.warn(message) } :
    {
      let (sourceLight, disposeSourceLightFunc) =
        _getOperateSourceLightFunc(sourceLightType, gameObject, engineState);

      let ((engineState, targetLight), addTargetLightFunc) =
        _getOperateTargetLightFunc(targetLightType, engineState);

      let engineState =
        engineState
        |> disposeSourceLightFunc(gameObject, sourceLight)
        |> addTargetLightFunc(gameObject, targetLight)
        |> GameObjectEngineService.initGameObject(gameObject);

      StateLogicService.refreshEngineState(engineState);

      SceneEngineService.clearShaderCacheAndReInitSceneAllLightMaterials
      |> StateLogicService.getAndRefreshEngineStateWithFunc;
    };
};

let disposeLightByLightType =
    (lightType, currentSceneTreeNode, (editorState, engineState)) =>
  switch (lightType) {
  | DirectionLight =>
    (editorState, engineState)
    |> GameObjectLogicService.disposeDirectionLight(
         currentSceneTreeNode,
         engineState
         |> GameObjectComponentEngineService.unsafeGetDirectionLightComponent(
              currentSceneTreeNode,
            ),
       )

  | PointLight =>
    (editorState, engineState)
    |> GameObjectLogicService.disposePointLight(
         currentSceneTreeNode,
         engineState
         |> GameObjectComponentEngineService.unsafeGetPointLightComponent(
              currentSceneTreeNode,
            ),
       )
  };