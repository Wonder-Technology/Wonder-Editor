open EditorType;

let getMap = editorState =>
  editorState.assetRecord.imguiCustomImageTextureContentMap;

let setMap = (map, editorState) => {
  ...editorState,
  assetRecord: {
    ...editorState.assetRecord,
    imguiCustomImageTextureContentMap: map,
  },
};

let getContent = (index, editorState) =>
  getMap(editorState) |> WonderCommonlib.ImmutableSparseMapService.get(index);

let unsafeGetContent = (index, editorState) =>
  getContent(index, editorState) |> OptionService.unsafeGet;

let setContent = (index, textureContent, editorState) =>
  getMap(editorState)
  |> WonderCommonlib.ImmutableSparseMapService.set(index, textureContent)
  |> setMap(_, editorState);

let unsafeGetId = (index, editorState) =>
  unsafeGetContent(index, editorState).id;

let setId = (index, id, editorState) =>
  setContent(index, {id: id}, editorState);