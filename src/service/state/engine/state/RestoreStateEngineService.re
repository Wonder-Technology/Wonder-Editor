let _isBasicSourceTextureParametersDifferent =
    (texture, currentState, targetState) =>
  BasicSourceTextureEngineService.getWrapS(texture, currentState)
  !== BasicSourceTextureEngineService.getWrapS(texture, targetState)
  || BasicSourceTextureEngineService.getWrapT(texture, currentState)
  !== BasicSourceTextureEngineService.getWrapT(texture, targetState)
  || BasicSourceTextureEngineService.getMagFilter(texture, currentState)
  !== BasicSourceTextureEngineService.getMagFilter(texture, targetState)
  || BasicSourceTextureEngineService.getMinFilter(texture, currentState)
  !== BasicSourceTextureEngineService.getMinFilter(texture, targetState);

let _getBasicSourceTexturesNeedUpdate = (currentState, targetState) =>
  ArrayService.intersect(
    BasicSourceTextureEngineService.getAllTextures(currentState),
    BasicSourceTextureEngineService.getAllTextures(targetState),
  )
  |> Js.Array.filter(texture =>
       _isBasicSourceTextureParametersDifferent(
         texture,
         currentState,
         targetState,
       )
     );

let _markBasicSourceTextureNeedUpdate =
    (basicSourceTexturesNeedUpdate, restoredState) =>
  basicSourceTexturesNeedUpdate
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. restoredState, texture) =>
         BasicSourceTextureEngineService.setIsNeedUpdate(
           true,
           texture,
           restoredState,
         ),
       restoredState,
     );

let _isCubemapTextureParametersDifferent =
    (texture, currentState, targetState) =>
  CubemapTextureEngineService.getWrapS(texture, currentState)
  !== CubemapTextureEngineService.getWrapS(texture, targetState)
  || CubemapTextureEngineService.getWrapT(texture, currentState)
  !== CubemapTextureEngineService.getWrapT(texture, targetState)
  || CubemapTextureEngineService.getMagFilter(texture, currentState)
  !== CubemapTextureEngineService.getMagFilter(texture, targetState)
  || CubemapTextureEngineService.getMinFilter(texture, currentState)
  !== CubemapTextureEngineService.getMinFilter(texture, targetState);

let _getCubemapTexturesNeedUpdate = (currentState, targetState) =>
  ArrayService.intersect(
    CubemapTextureEngineService.getAllTextures(currentState),
    CubemapTextureEngineService.getAllTextures(targetState),
  )
  |> Js.Array.filter(texture =>
       _isCubemapTextureParametersDifferent(
         texture,
         currentState,
         targetState,
       )
     );

let _markCubemapTextureNeedUpdate = (cubemapTexturesNeedUpdate, restoredState) =>
  cubemapTexturesNeedUpdate
  |> WonderCommonlib.ArrayService.reduceOneParam(
       (. restoredState, texture) =>
         CubemapTextureEngineService.setIsNeedUpdate(
           true,
           texture,
           restoredState,
         ),
       restoredState,
     );

let restoreState = (currentState, targetState) => {
  let basicSourceTexturesNeedUpdate =
    _getBasicSourceTexturesNeedUpdate(currentState, targetState);

  let cubemapTexturesNeedUpdate =
    _getCubemapTexturesNeedUpdate(currentState, targetState);

  Wonderjs.StateAPI.restoreState(currentState, targetState)
  |> _markBasicSourceTextureNeedUpdate(basicSourceTexturesNeedUpdate)
  |> _markCubemapTextureNeedUpdate(cubemapTexturesNeedUpdate);
};