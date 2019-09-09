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

let createMap = () => WonderCommonlib.ImmutableSparseMapService.createEmpty();

let clearMap = editorState => setMap(createMap(), editorState);

let generateEmptyContent = (): NodeAssetType.imguiCustomImageTextureContent => {
  id: "Default Id",
};

let getContent = (index, editorState) =>
  getMap(editorState) |> WonderCommonlib.ImmutableSparseMapService.get(index);

let unsafeGetContent = (index, editorState) =>
  getContent(index, editorState) |> OptionService.unsafeGet;

let setContent = (index, textureContent, editorState) =>
  getMap(editorState)
  |> WonderCommonlib.ImmutableSparseMapService.set(index, textureContent)
  |> setMap(_, editorState);

let removeContent = (index, editorState) =>
  getMap(editorState)
  |> WonderCommonlib.ImmutableSparseMapService.deleteVal(index)
  |> setMap(_, editorState);

let getId = (index, editorState) =>
  getContent(index, editorState)
  |> Js.Option.map((. content: NodeAssetType.imguiCustomImageTextureContent) =>
       content.id
     );

let unsafeGetId = (index, editorState) =>
  getId(index, editorState) |> OptionService.unsafeGet;

let setId = (index, id, editorState) =>
  setContent(
    index,
    {id: id}: NodeAssetType.imguiCustomImageTextureContent,
    editorState,
  );