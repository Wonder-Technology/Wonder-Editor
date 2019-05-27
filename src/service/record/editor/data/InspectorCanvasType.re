type clonedBasicSourceTextureInInspectorEngineState = Wonderjs.BasicSourceTextureType.basicSourceTexture;

type inspectorCanvasRecord = {
  containerGameObject: option(int),
  basicSourceTextureCacheMap:
    WonderCommonlib.ImmutableSparseMapService.t(clonedBasicSourceTextureInInspectorEngineState),
};