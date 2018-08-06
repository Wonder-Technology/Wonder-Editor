open SelectType;

open MainEditorMaterialType;

let getMaterialOptions = () => [|
  {key: BasicMaterial |> convertMaterialTypeToInt, value: "basic_material"},
  {key: LightMaterial |> convertMaterialTypeToInt, value: "light_material"},
|];

let getMaterialTypeByGameObject = (gameObject, engineState) =>
  switch (
    GameObjectComponentEngineService.hasBasicMaterialComponent(
      gameObject,
      engineState,
    ),
    GameObjectComponentEngineService.hasLightMaterialComponent(
      gameObject,
      engineState,
    ),
  ) {
  | (true, false) => BasicMaterial
  | (false, true) => LightMaterial
  | _ =>
    WonderLog.Log.fatal(
      WonderLog.Log.buildFatalMessage(
        ~title="getMaterialTypeByGameObject",
        ~description=
          {j|gameObject:$gameObject should has material component|j},
        ~reason="",
        ~solution={j||j},
        ~params={j||j},
      ),
    )
  };

let handleSpecificFuncByMaterialType =
    (materialType, (handleBasicMaterialFunc, handleLightMaterialFunc)) => {
  let currentSceneTreeNode =
    SceneEditorService.unsafeGetCurrentSceneTreeNode
    |> StateLogicService.getEditorState;

  switch (materialType) {
  | BasicMaterial => currentSceneTreeNode |> handleBasicMaterialFunc

  | LightMaterial => currentSceneTreeNode |> handleLightMaterialFunc
  };
};
