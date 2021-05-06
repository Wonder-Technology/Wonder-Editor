'use strict';

var AllProgramService$Wonderjs = require("wonder.js/lib/js/src/service/record/all/program/AllProgramService.js");

function getProgram(shaderIndex, engineState) {
  return AllProgramService$Wonderjs.unsafeGetProgram(shaderIndex, engineState[/* programRecord */30]);
}

exports.getProgram = getProgram;
/* AllProgramService-Wonderjs Not a pure module */
