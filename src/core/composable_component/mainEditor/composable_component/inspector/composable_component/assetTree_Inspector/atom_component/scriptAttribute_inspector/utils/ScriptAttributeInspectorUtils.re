let updateScriptAttributeNode =
    (nodeId, attributeName, attribute, editorState) =>
  ScriptAttributeNodeAssetEditorService.setNodeData(
    nodeId,
    ScriptAttributeNodeAssetService.buildNodeData(
      ~name=attributeName,
      ~attribute,
    ),
    editorState,
  );