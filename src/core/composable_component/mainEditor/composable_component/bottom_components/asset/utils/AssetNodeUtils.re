open AssetNodeType;

let handleSpeficFuncByAssetNodeType =
    (
      type_,
      (
        handleFolderFunc,
        handleTextureFunc,
        handleMaterialFunc,
        handleWDBFunc,
      ),
      editorState,
    ) =>
  switch (type_) {
  | Folder =>
    editorState
    |> FolderNodeMapAssetEditorService.getFolderNodeMap
    |> handleFolderFunc
  | Texture =>
    editorState
    |> TextureNodeMapAssetEditorService.getTextureNodeMap
    |> handleTextureFunc
  | Material =>
    editorState
    |> MaterialNodeMapAssetEditorService.getMaterialNodeMap
    |> handleMaterialFunc
  | WDB =>
    editorState |> WDBNodeMapAssetEditorService.getWDBNodeMap |> handleWDBFunc
  };

let getAssetNodeTotalName =
    (type_, currentNodeId, (editorState, engineState)) =>
  editorState
  |> handleSpeficFuncByAssetNodeType(
       type_,
       (
         FolderNodeMapAssetEditorService.getFolderName(currentNodeId),
         OperateTextureLogicService.getTextureBaseName(currentNodeId),
         AssetMaterialNodeMapLogicService.getMaterialBaseName(
           currentNodeId,
           engineState,
         ),
         WDBNodeMapAssetEditorService.getWDBTotalName(currentNodeId),
       ),
     );

let getAssetNodeParentId = (type_, currentNodeId, editorState) =>
  editorState
  |> handleSpeficFuncByAssetNodeType(
       type_,
       (
         FolderNodeMapAssetEditorService.getFolderParentId(currentNodeId),
         TextureNodeMapAssetEditorService.getParentFolderNodeId(
           currentNodeId,
         ),
         MaterialNodeMapAssetEditorService.getParentFolderNodeId(
           currentNodeId,
         ),
         WDBNodeMapAssetEditorService.getWDBParentId(currentNodeId),
       ),
     );