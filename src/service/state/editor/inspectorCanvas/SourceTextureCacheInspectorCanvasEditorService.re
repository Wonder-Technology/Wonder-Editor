open EditorType;

let clearCache = editorState => {
  ...editorState,
  inspectorCanvasRecord: {
    ...editorState.inspectorCanvasRecord,
    basicSourceTextureCacheMap:
      WonderCommonlib.ImmutableSparseMapService.createEmpty(),
  },
};