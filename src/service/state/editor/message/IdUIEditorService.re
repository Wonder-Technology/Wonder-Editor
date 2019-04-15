open EditorType;

let generateNodeId = editorState => {
  let (newIndex, id) =
    IdUIService.generateMessageId(
      IndexUIEditorService.getMessageIndex(editorState),
    );

  (IndexUIEditorService.setMessageIndex(newIndex, editorState), id);
};