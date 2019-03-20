open EditorType;

let getMessageIndex = editorState =>
  editorState.uiRecord |> IndexUIService.getMessageIndex;

let setMessageIndex = (messageIndex, editorState) => {
  ...editorState,
  uiRecord:
    editorState.uiRecord |> IndexUIService.setMessageIndex(messageIndex),
};