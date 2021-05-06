'use strict';

var StringTool$WonderEditor = require("../unit/tool/StringTool.js");

function isTestCoverage(fileContent) {
  return StringTool$WonderEditor.removeNewLinesAndSpaces(fileContent).includes("stanbulignorenext");
}

exports.isTestCoverage = isTestCoverage;
/* No side effect */
