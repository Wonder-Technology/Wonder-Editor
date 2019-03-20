open EditorType;

let getMessageArray = editorState =>
  editorState.uiRecord |> MessageArrayUIService.getMessageArray;

let setMessageArray = (messageArray, editorState) => {
  ...editorState,
  uiRecord:
    editorState.uiRecord
    |> MessageArrayUIService.setMessageArray(messageArray),
};

let addMessage = (message, editorState) => {
  ...editorState,
  uiRecord: editorState.uiRecord |> MessageArrayUIService.addMessage(message),
};

let removeMessage = (message, editorState) => {
  ...editorState,
  uiRecord:
    editorState.uiRecord |> MessageArrayUIService.removeMessage(message),
};