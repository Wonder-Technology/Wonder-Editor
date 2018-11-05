let addTextureNodeToAssetTree =
    (texture, (targetTreeNodeId, newNodeId, imageNodeId), editorState) =>
  editorState
  |> FolderNodeUtils.addTextureIntoNodeMap(
       newNodeId,
       targetTreeNodeId |. Some,
       texture,
       imageNodeId,
     )
  |> AssetTreeUtils.createNodeAndAddToTargetNodeChildren(
       targetTreeNodeId,
       newNodeId,
       AssetNodeType.Texture,
     );

let _getImageNodeIdByBase64 = (imageBase64, editorState) =>
  switch (
    editorState
    |> AssetImageNodeMapEditorService.getImageNodeMap
    |> SparseMapService.getValidDataArr
    |> SparseMapService.find(
         ((imageNodeId, {base64}: AssetNodeType.imageResultType)) =>
         Base64Service.isBase64Equal(Some(imageBase64), base64)
       )
  ) {
  | None => None
  | Some((imageNodeId, _)) => Some(imageNodeId)
  };

let _getImageNodeIdByUint8Array = (imageUint8Array, editorState) =>
  switch (
    editorState
    |> AssetImageNodeMapEditorService.getImageNodeMap
    |> SparseMapService.getValidDataArr
    |> SparseMapService.find(
         ((imageNodeId, {uint8Array}: AssetNodeType.imageResultType)) =>
         Uint8ArrayService.isUint8ArrayEqual(
           Some(imageUint8Array),
           uint8Array,
         )
       )
  ) {
  | None => None
  | Some((imageNodeId, _)) => Some(imageNodeId)
  };

let addImageNodeByBase64 = (base64, fileName, mimeType, editorState) =>
  switch (_getImageNodeIdByBase64(base64, editorState)) {
  | None =>
    let (editorState, imageNodeId) =
      AssetIdUtils.generateAssetId(editorState);

    (
      imageNodeId,
      editorState
      |> AssetImageNodeMapEditorService.setResult(
           imageNodeId,
           AssetImageNodeMapEditorService.buildImageNodeResult(
             Some(base64),
             None,
             fileName,
             mimeType,
           ),
         ),
    );
  | Some(imageNodeId) => (imageNodeId, editorState)
  };

let addImageNodeByUint8Array = (uint8Array, name, mimeType, editorState) =>
  switch (_getImageNodeIdByUint8Array(uint8Array, editorState)) {
  | None =>
    let (editorState, imageNodeId) =
      AssetIdUtils.generateAssetId(editorState);

    (
      imageNodeId,
      editorState
      |> AssetImageNodeMapEditorService.setResult(
           imageNodeId,
           AssetImageNodeMapEditorService.buildImageNodeResult(
             None,
             Some(uint8Array),
             name,
             mimeType,
           ),
         ),
    );
  | Some(imageNodeId) => (imageNodeId, editorState)
  };