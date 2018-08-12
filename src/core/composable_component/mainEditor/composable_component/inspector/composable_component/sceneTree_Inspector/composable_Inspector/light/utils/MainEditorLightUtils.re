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

let _isLightExceedMaxCountByType = (targetLightType, engineState) =>
  switch (targetLightType) {
  | DirectionLight => (
      "the point light count is exceed max count !",
      engineState |> DirectionLightEngineService.isMaxCount,
    )

  | PointLight => (
      "the point light count is exceed max count !",
      engineState |> PointLightEngineService.isMaxCount,
    )
  };

let _getOperateSourceLightFunc = (lightType, gameObject, engineStateToGetData) =>
  switch (lightType) {
  | DirectionLight => (
      engineStateToGetData
      |> GameObjectComponentEngineService.getDirectionLightComponent(
           gameObject,
         ),
      OperateDirectionLightLogicService.disposeDirectionLight,
    )
  | PointLight => (
      engineStateToGetData
      |> GameObjectComponentEngineService.getPointLightComponent(gameObject),
      OperatePointLightLogicService.disposePointLight,
    )
  };

let _getOperateTargetLightFunc = (lightType, editEngineState, runEngineState) =>
  switch (lightType) {
  | DirectionLight => (
      OperateDirectionLightLogicService.createDirectionLight(
        editEngineState,
        runEngineState,
      ),
      OperateDirectionLightLogicService.addDirectionLight,
    )
  | PointLight => (
      OperatePointLightLogicService.createPointLight(
        editEngineState,
        runEngineState,
      ),
      OperatePointLightLogicService.addPointLight,
    )
  };

let replaceLightByType = (sourceLightType, targetLightType) => {
  let gameObject =
    SceneEditorService.unsafeGetCurrentSceneTreeNode
    |> StateLogicService.getEditorState;
  let editEngineState = StateLogicService.getEditEngineState();
  let runEngineState = StateLogicService.getRunEngineState();

  let (message, isMaxCount) =
    _isLightExceedMaxCountByType(targetLightType, runEngineState);

  isMaxCount ?
    Antd.Message.message
    |> Antd.Message.convertToJsObj
    |> (messageObj => messageObj##warn(message, 4))
    |> ignore :
    {
      let (sourceLight, disposeSourceLightFunc) =
        _getOperateSourceLightFunc(
          sourceLightType,
          gameObject,
          runEngineState,
        );

      let (
        (targetLight, editEngineState, runEngineState),
        addTargetLightFunc,
      ) =
        _getOperateTargetLightFunc(
          targetLightType,
          editEngineState,
          runEngineState,
        );

      let (editEngineState, runEngineState) =
        (editEngineState, runEngineState)
        |> disposeSourceLightFunc(gameObject, sourceLight)
        |> addTargetLightFunc(gameObject, targetLight)
        |> StateLogicService.handleFuncWithDiff(
             [|{arguments: [|gameObject|], type_: GameObject}|],
             GameObjectEngineService.initGameObject,
           );

      editEngineState
      |> DirectorEngineService.loopBody(0.)
      |> StateLogicService.setEditEngineState;

      runEngineState
      |> DirectorEngineService.loopBody(0.)
      |> StateLogicService.setRunEngineState;

      OperateLightMaterialLogicService.reInitAllMaterials();

      StateLogicService.getAndRefreshEditAndRunEngineState();
    };
};

let disposeLightByLightType =
    (lightType, currentSceneTreeNode, (editorState, engineState)) =>
  switch (lightType) {
  | DirectionLight =>
    (editorState, engineState)
    |> GameObjectLogicService.disposeDirectionLightComponent(
         currentSceneTreeNode,
         engineState
         |> GameObjectComponentEngineService.getDirectionLightComponent(
              currentSceneTreeNode,
            ),
       )

  | PointLight =>
    (editorState, engineState)
    |> GameObjectLogicService.disposePointLightComponent(
         currentSceneTreeNode,
         engineState
         |> GameObjectComponentEngineService.getPointLightComponent(
              currentSceneTreeNode,
            ),
       )
  };