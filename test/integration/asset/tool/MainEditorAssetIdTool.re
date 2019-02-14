/* let getFirstIdIfHasUsableAssetId = editorState =>
   editorState |> RemovedAssetIdArrayAssetEditorService.hasUsableAssetId ?
     editorState
     |> RemovedAssetIdArrayAssetEditorService.getRemovedAssetIdArray
     |> (removedAssetIdArr => Some(Array.unsafe_get(removedAssetIdArr, 0))) :
     None; */

let getNewAssetId = (~editorState=StateEditorService.getState(), ()) =>
  /* switch (editorState |> getFirstIdIfHasUsableAssetId) {
     | None => IndexAssetEditorService.getNodeIndex(editorState) |> succ
     | Some(assetId) => assetId
     }; */
  IndexAssetEditorService.getNodeIndex(editorState) |> succ;