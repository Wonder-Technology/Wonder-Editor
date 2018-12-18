let isDefaultBasicMaterial = (material, defaultMaterialName, engineState) =>
  engineState
  |>
  BasicMaterialEngineService.getBasicMaterialName(material) === defaultMaterialName;

let isDefaultLightMaterial = (material, defaultMaterialName, engineState) =>
  engineState
  |>
  LightMaterialEngineService.getLightMaterialName(material) === defaultMaterialName;

let isDefaultMaterial = (material, type_, (editorState, engineState)) =>
  switch (type_) {
  | AssetMaterialDataType.BasicMaterial =>
    isDefaultBasicMaterial(
      material,
      MaterialDataAssetEditorService.unsafeGetDefaultBasicMaterial(
        editorState,
      )
      |> BasicMaterialEngineService.getBasicMaterialName(_, engineState),
      engineState,
    )

  | AssetMaterialDataType.LightMaterial =>
    isDefaultLightMaterial(
      material,
      MaterialDataAssetEditorService.unsafeGetDefaultLightMaterial(
        editorState,
      )
      |> LightMaterialEngineService.getLightMaterialName(_, engineState),
      engineState,
    )
  };

/* let getGameObjectMaterialType = (gameObject, engineState) => {
       GameObjectComponentEngineService.hasBasicMaterialComponent(gameObject, engineState) ? AssetMaterialDataType.BasicMaterial :
   GameObjectComponentEngineService.hasBasicMaterialComponent(gameObject, engineState)
     } */