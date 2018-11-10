open EditorType;

let getConsoleCheckedCount = editorState =>
  editorState.consoleRecord
  |> CheckedCountConsoleService.getConsoleCheckedCount;

let setConsoleCheckedCount = (consoleCheckedCount, editorState) => {
  ...editorState,
  consoleRecord:
    editorState.consoleRecord
    |> CheckedCountConsoleService.setConsoleCheckedCount(
         consoleCheckedCount,
       ),
};

let clearConsoleCheckedCount = editorState => {
  ...editorState,
  consoleRecord:
    editorState.consoleRecord
    |> CheckedCountConsoleService.clearConsoleCheckedCount,
};

let unreadConsoleMessage = editorState =>
  (
    editorState.consoleRecord
    |> MessageArrayConsoleService.getConsoleMessageArrayLen
  )
  - (
    editorState.consoleRecord
    |> CheckedCountConsoleService.getConsoleCheckedCount
  );