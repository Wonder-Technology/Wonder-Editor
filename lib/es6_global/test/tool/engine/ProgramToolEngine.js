

import * as ProgramService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/all/program/ProgramService.js";

function getProgram(shaderIndex, engineState) {
  return ProgramService$Wonderjs.unsafeGetProgram(shaderIndex, engineState[/* programRecord */27]);
}

export {
  getProgram ,
  
}
/* ProgramService-Wonderjs Not a pure module */
