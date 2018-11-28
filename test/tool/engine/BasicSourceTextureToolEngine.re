let getIsNeedUpdate = (texture, engineState) =>
  BasicSourceTextureEngineService.getIsNeedUpdate(texture, engineState)
  === Wonderjs.BufferSourceTextureService.getNeedUpdate() ?
    true : false;