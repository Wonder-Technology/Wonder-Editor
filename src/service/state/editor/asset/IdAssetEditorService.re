open EditorType;

let generateNodeId = editorState => {
  let (newIndex, id) =
    IdAssetService.generateNodeId(
      IndexAssetEditorService.getNodeIndex(editorState),
    );

  (IndexAssetEditorService.setNodeIndex(newIndex, editorState), id);
};