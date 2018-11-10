open ConsoleType;

let getConsoleCheckedCount = consoleRecord =>
  consoleRecord.consoleCheckedCount;

let setConsoleCheckedCount = (consoleCheckedCount, consoleRecord) => {
  ...consoleRecord,
  consoleCheckedCount,
};

let clearConsoleCheckedCount = consoleRecord => {
  ...consoleRecord,
  consoleCheckedCount: 0
};
