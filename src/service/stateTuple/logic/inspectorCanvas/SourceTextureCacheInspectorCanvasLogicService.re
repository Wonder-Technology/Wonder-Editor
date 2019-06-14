open EditorType;

let _error = (textureInMainEngineState, editorState) =>
  ConsoleUtils.error(
    LogUtils.buildErrorMessage(
      ~description=
        {j|textureInMainEngineState:$textureInMainEngineState should be basicSourceTexture|j},
      ~reason="",
      ~solution={j||j},
      ~params={j||j},
    ),
    editorState,
  );

let addCache =
    (
      textureInMainEngineState,
      textureInInspectorEngineState,
      mainEngineState,
      editorState,
    ) =>
  SourceTextureEngineService.isBasicSourceTextureIndex(
    textureInMainEngineState,
    mainEngineState,
  ) ?
    {
      ...editorState,
      inspectorCanvasRecord: {
        ...editorState.inspectorCanvasRecord,
        basicSourceTextureCacheMap:
          editorState.inspectorCanvasRecord.basicSourceTextureCacheMap
          |> WonderCommonlib.ImmutableSparseMapService.set(
               textureInMainEngineState,
               textureInInspectorEngineState,
             ),
      },
    } :
    {
      _error(textureInMainEngineState, editorState);

      editorState;
    };

let removeCache = (textureInMainEngineState, mainEngineState, editorState) =>
  SourceTextureEngineService.isBasicSourceTextureIndex(
    textureInMainEngineState,
    mainEngineState,
  ) ?
    {
      ...editorState,
      inspectorCanvasRecord: {
        ...editorState.inspectorCanvasRecord,
        basicSourceTextureCacheMap:
          editorState.inspectorCanvasRecord.basicSourceTextureCacheMap
          |> WonderCommonlib.ImmutableSparseMapService.deleteVal(
               textureInMainEngineState,
             ),
      },
    } :
    {
      _error(textureInMainEngineState, editorState);

      editorState;
    };

let getCache = (textureInMainEngineState, (editorState, mainEngineState)) =>
  SourceTextureEngineService.isBasicSourceTextureIndex(
    textureInMainEngineState,
    mainEngineState,
  ) ?
    editorState.inspectorCanvasRecord.basicSourceTextureCacheMap
    |> WonderCommonlib.ImmutableSparseMapService.get(textureInMainEngineState) :
    {
      _error(textureInMainEngineState, editorState);

      None;
    };