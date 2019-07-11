let getIsNeedUpdate = (texture, engineState) =>
  BasicSourceTextureEngineService.getIsNeedUpdate(texture, engineState);

let isAlive = (texture, engineState) =>
  Wonderjs.DisposeBasicSourceTextureMainService.isAlive(
    texture,
    Wonderjs.RecordBasicSourceTextureMainService.getRecord(engineState),
  );

let hasDisposedTexture = engineState =>
  Wonderjs.RecordBasicSourceTextureMainService.getRecord(engineState).
    disposedIndexArray
  |> Js.Array.length > 0;