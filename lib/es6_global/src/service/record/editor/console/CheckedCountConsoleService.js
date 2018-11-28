


function getConsoleCheckedCount(consoleRecord) {
  return consoleRecord[/* consoleCheckedCount */1];
}

function setConsoleCheckedCount(consoleCheckedCount, consoleRecord) {
  return /* record */[
          /* consoleMessageArray */consoleRecord[/* consoleMessageArray */0],
          /* consoleCheckedCount */consoleCheckedCount
        ];
}

function clearConsoleCheckedCount(consoleRecord) {
  return /* record */[
          /* consoleMessageArray */consoleRecord[/* consoleMessageArray */0],
          /* consoleCheckedCount */0
        ];
}

export {
  getConsoleCheckedCount ,
  setConsoleCheckedCount ,
  clearConsoleCheckedCount ,
  
}
/* No side effect */
