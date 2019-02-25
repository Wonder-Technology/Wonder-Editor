let _isTextureParametersDifferent = (texture, currentState, targetState) =>
  BasicSourceTextureEngineService.getWrapS(texture, currentState)
  !== BasicSourceTextureEngineService.getWrapS(texture, targetState)
  ||
  BasicSourceTextureEngineService.getWrapT(texture, currentState) !== BasicSourceTextureEngineService.getWrapT(
                                                                    texture,
                                                                    targetState,
                                                                    )
  ||
  BasicSourceTextureEngineService.getMagFilter(texture, currentState) !== BasicSourceTextureEngineService.getMagFilter(
                                                                    texture,
                                                                    targetState,
                                                                    )
  ||
  BasicSourceTextureEngineService.getMinFilter(texture, currentState) !== BasicSourceTextureEngineService.getMinFilter(
                                                                    texture,
                                                                    targetState,
                                                                    );

let _getBasicSourceTexturesNeedUpdate = (currentState, targetState) =>
  ArrayService.intersect(
    BasicSourceTextureEngineService.getAllTextures(currentState),
    BasicSourceTextureEngineService.getAllTextures(targetState),
  )
  |> Js.Array.filter(texture =>
       _isTextureParametersDifferent(texture, currentState, targetState)
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

let restoreState = (currentState, targetState) => {
  let basicSourceTexturesNeedUpdate =
    _getBasicSourceTexturesNeedUpdate(currentState, targetState);

  Wonderjs.StateAPI.restoreState(currentState, targetState)
  |> _markBasicSourceTextureNeedUpdate(basicSourceTexturesNeedUpdate);
};