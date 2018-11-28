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
         removedAssetIdArray
         |> Js.Array.sortInPlaceWith((pre, next) => pre - next),
       ),
};

let getFirstIdIfHasUsableAssetId = editorState =>
  editorState |> hasUsableAssetId ?
    editorState
    |> getRemovedAssetIdArray
    |> (
      removedAssetIdArr => {
        let id =
          removedAssetIdArr |> Js.Array.shift |> Js.Option.getExn |. Some;

        (id, setRemovedAssetIdArray(removedAssetIdArr, editorState));
      }
    ) :
    (None, editorState);