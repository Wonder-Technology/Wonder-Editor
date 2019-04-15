open NodeAssetType;

/* let _removeNodeEditorData =
       (nodeId, (getNodeMapFunc, setNodeMapFunc), editorState) =>
     editorState
     |> getNodeMapFunc
     |> WonderCommonlib.ImmutableSparseMapService.copy
     |> DomHelper.deleteKeyInMap(nodeId)
     |. setNodeMapFunc(editorState);

   let removeFolderNodeEditorData = (nodeId, editorState) =>
     _removeNodeEditorData(
       nodeId,
       (
         FolderNodeMapAssetEditorService.getFolderNodeMap,
         FolderNodeMapAssetEditorService.setFolderNodeMap,
       ),
       editorState,
     );

   let removeWDBNodeEditorData = (nodeId, editorState) =>
     _removeNodeEditorData(
       nodeId,
       (
         WDBNodeMapAssetEditorService.getWDBNodeMap,
         WDBNodeMapAssetEditorService.setWDBNodeMap,
       ),
       editorState,
     );

   let removeMaterialNodeEditorData = (nodeId, editorState) => {
     let {materialComponent, type_} =
       editorState |> MaterialNodeMapAssetEditorService.unsafeGetResult(nodeId);

     /* let (defaultMaterial, defaultMaterialType) =
        MaterialDataAssetEditorService.unsafeGetDefaultMaterialDataByType(
          type_,
          editorState,
        ); */

     /* let engineState =
        InspectorRenderGroupUtils.Dispose.replaceGameObjectsMaterialsOfTheMaterial(
          ((materialComponent, defaultMaterial), (type_, defaultMaterialType)),
          engineState,
        ); */

     MaterialNodeMapAssetEditorService.remove(nodeId, editorState)
     |> MaterialNodeIdMapAssetEditorService.remove(materialComponent);
   };

   let removeTextureNodeEditorData = (nodeId, editorState) => {
     let {textureComponent, image} =
       editorState
       |> TextureNodeMapAssetEditorService.getTextureNodeMap
       |> WonderCommonlib.ImmutableSparseMapService.unsafeGet(nodeId);

     _removeNodeEditorData(
       nodeId,
       (
         TextureNodeMapAssetEditorService.getTextureNodeMap,
         TextureNodeMapAssetEditorService.setTextureNodeMap,
       ),
       editorState,
     );

     TextureNodeMapAssetEditorService.doesAnyTextureUseImage(image, editorState) ?
       editorState :
       editorState
       |> ImageDataMapAssetEditorService.getImageDataMap
       |> Js.Array.copy
       |> DomHelper.deleteKeyInMap(image)
       |. ImageDataMapAssetEditorService.setImageDataMap(editorState);
   };

   let deepDisposeAssetTreeRoot = (removedAssetIdArr, editorState) =>
     editorState
     |> RemovedAssetIdArrayAssetEditorService.getRemovedAssetIdArray
     |> Js.Array.concat(removedAssetIdArr)
     |. RemovedAssetIdArrayAssetEditorService.setRemovedAssetIdArray(
          editorState,
        )
     |> TreeRootAssetEditorService.clearAssetTreeRoot
     |> SelectedFolderNodeIdInAssetTreeAssetEditorService.clearSelectedFolderNodeIdInAssetTree
     |> CurrentNodeIdAssetEditorService.clearCurrentNodeId; */

/* _iterateRemovedTreeNode(
     [|removedTreeNode|],
     [||],
     (editorState, engineState),
   ); */