open EditorType;

let getConsoleMessageArray = editorState =>
  editorState.consoleRecord
  |> MessageArrayConsoleService.getConsoleMessageArray;

let setConsoleMessageArray = (consoleMessageArray, editorState) => {
  ...editorState,
  consoleRecord:
    editorState.consoleRecord
    |> MessageArrayConsoleService.setConsoleMessageArray(
         consoleMessageArray,
       ),
};

let clearConsoleMessageArray = editorState => {
  ...editorState,
  consoleRecord:
    editorState.consoleRecord
    |> MessageArrayConsoleService.clearConsoleMessageArray,
};

let addConsoleMessage = (consoleMessage, editorState) => {
  ...editorState,
  consoleRecord:
    editorState.consoleRecord
    |> MessageArrayConsoleService.addConsoleMessage(consoleMessage),
};

let getConsoleMessageArrayLen = editorState =>
  editorState.consoleRecord
  |> MessageArrayConsoleService.getConsoleMessageArrayLen;