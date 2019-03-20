open EditorType;

let getIntervalId = editorState =>
  editorState.uiRecord |> IntervalIdUIService.getIntervalId;

let setIntervalId = (intervalId, editorState) => {
  ...editorState,
  uiRecord:
    editorState.uiRecord |> IntervalIdUIService.setIntervalId(intervalId),
};