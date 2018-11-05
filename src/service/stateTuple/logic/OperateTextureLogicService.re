open AssetNodeType;

let getNoNameTextureName = () => "NoName Texture";

let getTextureBaseNameByTextureComponent = (texture, engineState) =>
  switch (
    BasicSourceTextureEngineService.getBasicSourceTextureName(
      texture,
      engineState,
    )
  ) {
  | None => getNoNameTextureName()
  | Some(name) => name
  };

let getTextureBaseName = (currentNodeId, textureNodeMap) =>
  textureNodeMap
  |> WonderCommonlib.SparseMapService.unsafeGet(currentNodeId)
  |> (({textureComponent}) => textureComponent)
  |> getTextureBaseNameByTextureComponent(_)
  |> StateLogicService.getEngineStateToGetData;

let changeTextureMapAndRefreshEngineState =
    (material, textureComponent, setMapFunc, engineState) => {
  let engineState = engineState |> setMapFunc(textureComponent, material);

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
      (material, textureComponent),
      (setMapFunc, reInitAllMaterialsAndClearShaderCacheFunc),
      engineState,
    ) =>
  _handleMapAndUpdateShaderAndRefreshEngineState(
    material,
    (
      setMapFunc(textureComponent),
      reInitAllMaterialsAndClearShaderCacheFunc,
    ),
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