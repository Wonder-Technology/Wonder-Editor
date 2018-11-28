

import * as ArrayService$WonderEditor from "../../../atom/ArrayService.js";

function getConsoleMessageArray(consoleRecord) {
  return consoleRecord[/* consoleMessageArray */0];
}

function setConsoleMessageArray(consoleMessageArray, consoleRecord) {
  return /* record */[
          /* consoleMessageArray */consoleMessageArray,
          /* consoleCheckedCount */consoleRecord[/* consoleCheckedCount */1]
        ];
}

function clearConsoleMessageArray(consoleRecord) {
  return /* record */[
          /* consoleMessageArray */ArrayService$WonderEditor.create(/* () */0),
          /* consoleCheckedCount */consoleRecord[/* consoleCheckedCount */1]
        ];
}

function addConsoleMessage(consoleMessage, consoleRecord) {
  return /* record */[
          /* consoleMessageArray */ArrayService$WonderEditor.push(consoleMessage, consoleRecord[/* consoleMessageArray */0]),
          /* consoleCheckedCount */consoleRecord[/* consoleCheckedCount */1]
        ];
}

function getConsoleMessageArrayLen(consoleRecord) {
  return consoleRecord[/* consoleMessageArray */0].length;
}

export {
  getConsoleMessageArray ,
  setConsoleMessageArray ,
  clearConsoleMessageArray ,
  addConsoleMessage ,
  getConsoleMessageArrayLen ,
  
}
/* ArrayService-WonderEditor Not a pure module */
