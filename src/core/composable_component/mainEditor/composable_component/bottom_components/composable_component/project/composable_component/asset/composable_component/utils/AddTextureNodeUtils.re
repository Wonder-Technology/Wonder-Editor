let addTextureNodeToAssetTree =
    (
      texture,
      isInWDB,
      (targetTreeNodeId, newNodeId, imageNodeId),
      editorState,
    ) =>
  editorState
  |> FolderNodeUtils.addTextureIntoNodeMap(
       newNodeId,
       targetTreeNodeId |. Some,
       texture,
       imageNodeId,
       isInWDB,
     )
  |> AssetTreeUtils.createNodeAndAddToTargetNodeChildren(
       targetTreeNodeId,
       newNodeId,
       AssetNodeType.Texture,
     );

let _getImageNodeIdByBase64 = (imageBase64, editorState) =>
  switch (
    editorState
    |> ImageNodeMapAssetEditorService.getImageNodeMap
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
    |> ImageNodeMapAssetEditorService.getImageNodeMap
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

let addImageNodeByBase64 = (base64, fileName, mimeType, isInWDB, editorState) =>
  switch (_getImageNodeIdByBase64(base64, editorState)) {
  | None =>
    let (editorState, imageNodeId) =
      AssetIdUtils.generateAssetId(editorState);

    (
      imageNodeId,
      editorState
      |> ImageNodeMapAssetEditorService.setResult(
           imageNodeId,
           ImageNodeMapAssetEditorService.buildImageNodeResult(
             ~base64=Some(base64),
             ~uint8Array=None,
             ~name=fileName,
             ~mimeType,
             ~isInWDB,
             (),
           ),
         ),
    );
  | Some(imageNodeId) => (imageNodeId, editorState)
  };

let addImageNodeByUint8Array =
    (uint8Array, name, mimeType, isInWDB, editorState) =>
  switch (_getImageNodeIdByUint8Array(uint8Array, editorState)) {
  | None =>
    let (editorState, imageNodeId) =
      AssetIdUtils.generateAssetId(editorState);

    (
      imageNodeId,
      editorState
      |> ImageNodeMapAssetEditorService.setResult(
           imageNodeId,
           ImageNodeMapAssetEditorService.buildImageNodeResult(
             ~base64=None,
             ~uint8Array=Some(uint8Array),
             ~name,
             ~mimeType,
             ~isInWDB,
             (),
           ),
         ),
    );
  | Some(imageNodeId) => (imageNodeId, editorState)
  };