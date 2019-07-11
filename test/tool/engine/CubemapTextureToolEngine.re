let getIsNeedUpdate = (texture, engineState) =>
  CubemapTextureEngineService.getIsNeedUpdate(texture, engineState);

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

let unsafeGetGlTexture = (texture, state) =>
  Wonderjs.OperateGlTextureMapService.unsafeGetTexture(
    texture,
    Wonderjs.RecordCubemapTextureMainService.getRecord(state).glTextureMap,
  );