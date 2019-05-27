open EditorType;

let _error = (textureInEngineState, editorState) =>
  ConsoleUtils.error(
    LogUtils.buildErrorMessage(
      ~description=
        {j|textureInEngineState:$textureInEngineState should be basicSourceTexture|j},
      ~reason="",
      ~solution={j||j},
      ~params={j||j},
    ),
    editorState,
  );

let addCache =
    (
      textureInEngineState,
      textureInInspectorEngineState,
      engineState,
      editorState,
    ) =>
  SourceTextureEngineService.isBasicSourceTextureIndex(
    textureInEngineState,
    engineState,
  ) ?
    {
      ...editorState,
      inspectorCanvasRecord: {
        ...editorState.inspectorCanvasRecord,
        basicSourceTextureCacheMap:
          editorState.inspectorCanvasRecord.basicSourceTextureCacheMap
          |> WonderCommonlib.ImmutableSparseMapService.set(
               textureInEngineState,
               textureInInspectorEngineState,
             ),
      },
    } :
    {
      _error(textureInEngineState, editorState);

      editorState;
    };

let removeCache = (textureInEngineState, engineState, editorState) =>
  SourceTextureEngineService.isBasicSourceTextureIndex(
    textureInEngineState,
    engineState,
  ) ?
    {
      ...editorState,
      inspectorCanvasRecord: {
        ...editorState.inspectorCanvasRecord,
        basicSourceTextureCacheMap:
          editorState.inspectorCanvasRecord.basicSourceTextureCacheMap
          |> WonderCommonlib.ImmutableSparseMapService.deleteVal(
               textureInEngineState,
             ),
      },
    } :
    {
      _error(textureInEngineState, editorState);

      editorState;
    };

let getCache = (textureInEngineState, (editorState, engineState)) =>
  SourceTextureEngineService.isBasicSourceTextureIndex(
    textureInEngineState,
    engineState,
  ) ?
    editorState.inspectorCanvasRecord.basicSourceTextureCacheMap
    |> WonderCommonlib.ImmutableSparseMapService.get(textureInEngineState) :
    {
      _error(textureInEngineState, editorState);

      None;
    };