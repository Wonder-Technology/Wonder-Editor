open SelectType;

open MainEditorMaterialType;

open AssetMaterialDataType;

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

let getNewMaterilaAssetName = () => "New Material";

let getMaterilaDefaultName = () => getNewMaterilaAssetName();

let getName = (material, materialType, engineState) =>
  switch (materialType) {
  | BasicMaterial =>
    switch (
      BasicMaterialEngineService.getBasicMaterialName(material, engineState)
    ) {
    | None => getMaterilaDefaultName()
    | Some(name) => name
    }
  | LightMaterial =>
    switch (
      LightMaterialEngineService.getLightMaterialName(material, engineState)
    ) {
    | None => getMaterilaDefaultName()
    | Some(name) => name
    }
  };

let setName = (material, materialType, name, engineState) =>
  switch (materialType) {
  | BasicMaterial =>
    BasicMaterialEngineService.setBasicMaterialName(
      material,
      name,
      engineState,
    )
  | LightMaterial =>
    LightMaterialEngineService.setLightMaterialName(
      material,
      name,
      engineState,
    )
  };

let getMaterialCompnentByType = (gameObject, materialType, engineState) =>
  switch (materialType) {
  | BasicMaterial =>
    GameObjectComponentEngineService.unsafeGetBasicMaterialComponent(
      gameObject,
      engineState,
    )
  | LightMaterial =>
    GameObjectComponentEngineService.unsafeGetLightMaterialComponent(
      gameObject,
      engineState,
    )
  };