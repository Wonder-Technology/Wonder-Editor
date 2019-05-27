let getIsNeedUpdate = (texture, engineState) =>
  BasicSourceTextureEngineService.getIsNeedUpdate(texture, engineState)
  === Wonderjs.BufferSourceTextureService.getNeedUpdate() ?
    true : false;

let isAlive = (texture, engineState) =>
  Wonderjs.DisposeBasicSourceTextureMainService.isAlive(
    texture,
    Wonderjs.RecordBasicSourceTextureMainService.getRecord(engineState),
  );