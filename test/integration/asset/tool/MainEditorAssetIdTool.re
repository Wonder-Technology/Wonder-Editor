/* let getFirstIdIfHasUsableAssetId = editorState =>
   editorState |> RemovedAssetIdArrayAssetEditorService.hasUsableAssetId ?
     editorState
     |> RemovedAssetIdArrayAssetEditorService.getRemovedAssetIdArray
     |> (removedAssetIdArr => Some(Array.unsafe_get(removedAssetIdArr, 0))) :
     None; */

let getNewAssetId = (~editorState=StateEditorService.getState(), ()) =>
  IndexAssetEditorService.getNodeIndex(editorState) |> succ;