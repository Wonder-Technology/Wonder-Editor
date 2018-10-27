open EditorType;

let getConsoleCheckedCount = editorState =>
  editorState.consoleRecord
  |> ConsoleCheckedCountConsoleService.getConsoleCheckedCount;

let setConsoleCheckedCount = (consoleCheckedCount, editorState) => {
  ...editorState,
  consoleRecord:
    editorState.consoleRecord
    |> ConsoleCheckedCountConsoleService.setConsoleCheckedCount(
         consoleCheckedCount,
       ),
};

let clearConsoleCheckedCount = editorState => {
  ...editorState,
  consoleRecord:
    editorState.consoleRecord
    |> ConsoleCheckedCountConsoleService.clearConsoleCheckedCount,
};

let unreadConsoleMessage = editorState =>
  (
    editorState.consoleRecord
    |> ConsoleMessageArrayConsoleService.getConsoleMessageArrayLen
  )
  - (
    editorState.consoleRecord
    |> ConsoleCheckedCountConsoleService.getConsoleCheckedCount
  );