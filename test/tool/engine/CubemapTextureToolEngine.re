let getIsNeedUpdate = (texture, engineState) =>
  CubemapTextureEngineService.getIsNeedUpdate(texture, engineState)
  === Wonderjs.BufferTextureService.getNeedUpdate() ?
    true : false;

let getNewCubemap = (~engineState=StateEngineService.unsafeGetState(), ()) => {
  open Wonderjs.CubemapTextureType;

  let {disposedIndexArray, index} as geometryRecord =
    Wonderjs.RecordCubemapTextureMainService.getRecord(engineState);

  let (index, newIndex, disposedIndexArray) =
    ComponentToolEngine.computeGeneratedIndex(index, disposedIndexArray);

  index;
};

let isAlive = (texture, engineState) =>
  Wonderjs.DisposeCubemapTextureMainService.isAlive(
    texture,
    Wonderjs.RecordCubemapTextureMainService.getRecord(engineState),
  );