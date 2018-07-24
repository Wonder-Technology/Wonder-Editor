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
        ~description=
          {j|gameObject:$gameObject should has light component|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let handleSpecificFuncByLightType =
    (materialType, (handleDirectionLightFunc, handlePointLightFunc)) => {
  let currentSceneTreeNode =
    SceneEditorService.unsafeGetCurrentSceneTreeNode
    |> StateLogicService.getEditorState;

  switch (materialType) {
  | DirectionLight => currentSceneTreeNode |> handleDirectionLightFunc 

  | PointLight => currentSceneTreeNode |> handlePointLightFunc 
  };
};
