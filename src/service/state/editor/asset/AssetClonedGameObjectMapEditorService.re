open EditorType;

let getClonedGameObjectMap = editorState =>
  editorState.assetRecord |> ClonedGameObjectMapAssetService.getClonedGameObjectMap;

let setClonedGameObjectMap = (clonedGameObjectMap, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> ClonedGameObjectMapAssetService.setClonedGameObjectMap(clonedGameObjectMap),
};


let setResult = (index, result, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> ClonedGameObjectMapAssetService.setResult(index, result),
};