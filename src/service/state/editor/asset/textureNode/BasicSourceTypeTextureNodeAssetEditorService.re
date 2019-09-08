let findAllBasicSourceTypeTextureNodes = editorState =>
  TextureNodeAssetEditorService.findAllTextureNodesByType(
    TextureNodeAssetService.isBasicSourceType,
    editorState,
  );

let findTextureComponentsOfBasicSourceTypeTextureNode = editorState =>
  editorState
  |> findAllBasicSourceTypeTextureNodes
  |> TextureNodeAssetEditorService.getTextureComponents;