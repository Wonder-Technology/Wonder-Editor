open NodeAssetType;

let getDefaultName = () => "NoName Texture";

let getName = (~texture, ~engineState) =>
  switch (
    BasicSourceTextureEngineService.getBasicSourceTextureName(
      texture,
      engineState,
    )
  ) {
  | None => getDefaultName()
  | Some(name) => name
  };

let setName = (~texture, ~name, ~engineState) =>
  BasicSourceTextureEngineService.setBasicSourceTextureName(
    name,
    texture,
    engineState,
  );

/* let getNoNameTextureName = () => "NoName Texture"; */

/* let getTextureBaseNameByTextureComponent = (texture, engineState) =>
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
     |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(currentNodeId)
     |> (({textureComponent}: NodeAssetType.textureNodeData) => textureComponent)
     |> getTextureBaseNameByTextureComponent(_)
     |> StateLogicService.getEngineStateToGetData; */

let changeTextureMapAndRefreshEngineState =
    (material, textureComponent, setMapFunc, engineState) => {
  let engineState = engineState |> setMapFunc(textureComponent, material);

  StateLogicService.renderEngineStateAndReturnEngineState(engineState);
};

let _handleMapAndUpdateShaderAndRefreshEngineState =
    (
      material,
      (handleMapFunc, reInitMaterialsAndClearShaderCacheFunc),
      engineState,
    ) =>
  engineState
  |> handleMapFunc(material)
  |> reInitMaterialsAndClearShaderCacheFunc([|material|])
  |> StateLogicService.renderEngineStateAndReturnEngineState;

let handleMaterialComponentFromNoMapToHasMap =
    (
      (material, textureComponent),
      (setMapFunc, reInitMaterialsAndClearShaderCacheFunc),
      engineState,
    ) =>
  _handleMapAndUpdateShaderAndRefreshEngineState(
    material,
    (
      setMapFunc(textureComponent),
      reInitMaterialsAndClearShaderCacheFunc,
    ),
    engineState,
  );

let handleMaterialComponentFromHasMapToNoMap =
    (
      material,
      (removeMapFunc, reInitMaterialsAndClearShaderCacheFunc),
      engineState,
    ) =>
  _handleMapAndUpdateShaderAndRefreshEngineState(
    material,
    (removeMapFunc, reInitMaterialsAndClearShaderCacheFunc),
    engineState,
  );

let handleLightMaterialComponentFromHasDiffuseMapToNoMap =
    (material, engineState) =>
  handleMaterialComponentFromHasMapToNoMap(
    material,
    (
      LightMaterialEngineService.removeLightMaterialDiffuseMap,
      LightMaterialEngineService.reInitLightMaterialsAndClearShaderCache,
    ),
    engineState,
  );