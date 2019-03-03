

import * as GeometryEngineService$WonderEditor from "../../../../../../../../../../service/state/engine/GeometryEngineService.js";

function getNoNameGeometryName(param) {
  return "NoName Geometery";
}

function getName(geometry, state) {
  var match = GeometryEngineService$WonderEditor.getGeometryName(geometry, state);
  if (match !== undefined) {
    return match;
  } else {
    return "NoName Geometery";
  }
}

export {
  getNoNameGeometryName ,
  getName ,
  
}
/* GeometryEngineService-WonderEditor Not a pure module */
