open EditorType;

let getRemovedAssetIdArray = editorState =>
  editorState.assetRecord
  |> RemovedAssetIdArrayAssetService.getRemovedAssetIdArray;

let hasUsableAssetId = editorState =>
  editorState.assetRecord |> RemovedAssetIdArrayAssetService.hasUsableAssetId;

let setRemovedAssetIdArray = (removedAssetIdArray, editorState) => {
  ...editorState,
  assetRecord:
    editorState.assetRecord
    |> RemovedAssetIdArrayAssetService.setRemovedAssetIdArray(
         removedAssetIdArray,
       ),
};

let getFirstIdIfHasUsableAssetId = editorState =>
  editorState |> hasUsableAssetId ?
    editorState
    |> getRemovedAssetIdArray
    |> (
      removedAssetIdArr =>
        removedAssetIdArr
        |> Js.Array.copy
        |> Js.Array.shift
        |> Js.Option.getExn
        |. Some
    ) :
    None;