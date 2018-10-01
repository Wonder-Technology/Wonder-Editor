open AssetNodeType;

let getTextureBaseName = (currentNodeId, textureNodeMap) =>
  textureNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({textureIndex}) => textureIndex)
  |> BasicSourceTextureEngineService.unsafeGetBasicSourceTextureName
  |> StateLogicService.getEngineStateToGetData;

let renameTextureToEngine = (texture, newName) =>
  BasicSourceTextureEngineService.setBasicSourceTextureName(newName, texture)
  |> StateLogicService.getAndSetEngineState;

let changeTextureMapAndRefreshEngineState =
    (material, textureIndex, setMapFunc, engineState) => {
  let engineState = engineState |> setMapFunc(textureIndex, material);

  StateLogicService.refreshEngineStateAndReturnEngineState(engineState);
};

let _handleMapAndUpdateShaderAndRefreshEngineState =
    (
      material,
      (handleMapFunc, reInitAllMaterialsAndClearShaderCacheFunc),
      engineState,
    ) =>
  engineState
  |> handleMapFunc(material)
  |> reInitAllMaterialsAndClearShaderCacheFunc([|material|])
  |> StateLogicService.refreshEngineStateAndReturnEngineState;

let handleMaterialComponentFromNoMapToHasMap =
    (
      (material, textureIndex),
      (setMapFunc, reInitAllMaterialsAndClearShaderCacheFunc),
      engineState,
    ) =>
  _handleMapAndUpdateShaderAndRefreshEngineState(
    material,
    (setMapFunc(textureIndex), reInitAllMaterialsAndClearShaderCacheFunc),
    engineState,
  );

let handleMaterialComponentFromHasMapToNoMap =
    (
      material,
      (removeMapFunc, reInitAllMaterialsAndClearShaderCacheFunc),
      engineState,
    ) =>
  _handleMapAndUpdateShaderAndRefreshEngineState(
    material,
    (removeMapFunc, reInitAllMaterialsAndClearShaderCacheFunc),
    engineState,
  );

let handleBasicMaterialComponentFromHasMapToNoMap =
    (material, engineState) =>
  handleMaterialComponentFromHasMapToNoMap(
    material,
    (
      BasicMaterialEngineService.removeBasicMaterialMap,
      BasicMaterialEngineService.reInitAllBasicMaterialsAndClearShaderCache,
    ),
    engineState,
  );

let handleLightMaterialComponentFromHasDiffuseMapToNoMap =
    (material, engineState) =>
  handleMaterialComponentFromHasMapToNoMap(
    material,
    (
      LightMaterialEngineService.removeLightMaterialDiffuseMap,
      LightMaterialEngineService.reInitAllLightMaterialsAndClearShaderCache,
    ),
    engineState,
  );
