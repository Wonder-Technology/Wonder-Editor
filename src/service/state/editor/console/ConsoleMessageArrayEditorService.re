open EditorType;

let getConsoleMessageArray = editorState =>
  editorState.consoleRecord
  |> ConsoleMessageArrayConsoleService.getConsoleMessageArray;

let setConsoleMessageArray = (consoleMessageArray, editorState) => {
  ...editorState,
  consoleRecord:
    editorState.consoleRecord
    |> ConsoleMessageArrayConsoleService.setConsoleMessageArray(
         consoleMessageArray,
       ),
};

let clearConsoleMessageArray = editorState => {
  ...editorState,
  consoleRecord:
    editorState.consoleRecord
    |> ConsoleMessageArrayConsoleService.clearConsoleMessageArray,
};

let addConsoleMessage = (consoleMessage, editorState) => {
  ...editorState,
  consoleRecord:
    editorState.consoleRecord
    |> ConsoleMessageArrayConsoleService.addConsoleMessage(consoleMessage),
};