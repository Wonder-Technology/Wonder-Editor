open EditorType;

let getIsHasMessage = editorState =>
  editorState.uiRecord |> IsHasMessageUIService.getIsHasMessage;

let setIsHasMessage = (isHasMessage, editorState) => {
  ...editorState,
  uiRecord:
    editorState.uiRecord
    |> IsHasMessageUIService.setIsHasMessage(isHasMessage),
};