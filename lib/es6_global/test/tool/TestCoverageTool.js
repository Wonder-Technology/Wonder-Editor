

import * as StringTool$WonderEditor from "../unit/tool/StringTool.js";

function isTestCoverage(fileContent) {
  return StringTool$WonderEditor.removeNewLinesAndSpaces(fileContent).includes("stanbulignorenext");
}

export {
  isTestCoverage ,
  
}
/* No side effect */
