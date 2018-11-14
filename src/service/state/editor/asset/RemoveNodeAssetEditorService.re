open AssetTreeNodeType;

open AssetNodeType;

let removeFolderNodeEditorData = (nodeId, editorState) =>
  editorState
  |> FolderNodeMapAssetEditorService.getFolderNodeMap
  |> SparseMapService.copy
  |> DomHelper.deleteKeyInMap(nodeId)
  |. FolderNodeMapAssetEditorService.setFolderNodeMap(editorState);

let removeWDBNodeEditorData = (nodeId, editorState) =>
  editorState
  |> WDBNodeMapAssetEditorService.getWDBNodeMap
  |> SparseMapService.copy
  |> DomHelper.deleteKeyInMap(nodeId)
  |. WDBNodeMapAssetEditorService.setWDBNodeMap(editorState);

let removeMaterialNodeEditorData = (nodeId, editorState) => {
  let {materialComponent, type_} =
    editorState |> MaterialNodeMapAssetEditorService.unsafeGetResult(nodeId);

  /* let (defaultMaterial, defaultMaterialType) =
     MaterialDataAssetEditorService.unsafeGetMaterialDataByType(
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
    |> WonderCommonlib.SparseMapService.unsafeGet(nodeId);

  let editorState =
    editorState
    |> TextureNodeMapAssetEditorService.getTextureNodeMap
    |> SparseMapService.copy
    |> DomHelper.deleteKeyInMap(nodeId)
    |. TextureNodeMapAssetEditorService.setTextureNodeMap(editorState);

  TextureNodeMapAssetEditorService.doesAnyTextureUseImage(image, editorState) ?
    editorState :
    editorState
    |> ImageNodeMapAssetEditorService.getImageNodeMap
    |> Js.Array.copy
    |> DomHelper.deleteKeyInMap(image)
    |. ImageNodeMapAssetEditorService.setImageNodeMap(editorState);
};

let deepDisposeAssetTreeRoot = (removedAssetIdArr, editorState) =>
  editorState
  |> RemovedAssetIdArrayAssetEditorService.getRemovedAssetIdArray
  |> Js.Array.concat(removedAssetIdArr)
  |. RemovedAssetIdArrayAssetEditorService.setRemovedAssetIdArray(
       editorState,
     )
  |> TreeRootAssetEditorService.clearAssetTreeRoot
  |> CurrentNodeParentIdAssetEditorService.clearCurrentNodeParentId
  |> CurrentNodeDataAssetEditorService.clearCurrentNodeData;