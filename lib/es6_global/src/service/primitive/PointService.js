

import * as Vector3Service$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/Vector3Service.js";
import * as Vector3Service$WonderEditor from "./Vector3Service.js";

function projectPointToLine(point, lineStartPos, lineDirection) {
  return Vector3Service$Wonderjs.add(/* Float */0, lineStartPos, Vector3Service$WonderEditor.projectOnVector(Vector3Service$Wonderjs.sub(/* Float */0, point, lineStartPos), lineDirection));
}

export {
  projectPointToLine ,
  
}
/* Vector3Service-WonderEditor Not a pure module */
