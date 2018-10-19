open ConsoleType;

let getConsoleMessageArray = consoleRecord =>
  consoleRecord.consoleMessageArray;

let setConsoleMessageArray = (consoleMessageArray, consoleRecord) => {
  ...consoleRecord,
  consoleMessageArray,
};

let clearConsoleMessageArray = consoleRecord => {
  ...consoleRecord,
  consoleMessageArray: ArrayService.create(),
};

let addConsoleMessage = (consoleMessage, consoleRecord) => {
  ...consoleRecord,
  consoleMessageArray:
    consoleRecord.consoleMessageArray |> ArrayService.push(consoleMessage),
};

let getConsoleMessageArrayLen = consoleRecord =>
  consoleRecord.consoleMessageArray |> Js.Array.length;