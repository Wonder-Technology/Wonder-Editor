open EditorType;

let increaseIndex = ({assetRecord} as state) => {
  ...state,
  assetRecord: IndexAssetService.increaseIndex(assetRecord)
};

let getIndex = (editorState) => editorState.assetRecord |> IndexAssetService.getIndex;