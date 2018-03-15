'use strict';

import * as Geometry$Wonderjs    from "../../../../../../node_modules/wonder.js/lib/es6_global/src/ecs/component/api/geometry/Geometry.js";
import * as BoxGeometry$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/ecs/component/api/geometry/BoxGeometry.js";

var getConfigData = Geometry$Wonderjs.getGeometryConfigData;

var createBoxGeometry = BoxGeometry$Wonderjs.createBoxGeometry;

var setBoxGeometryConfigData = BoxGeometry$Wonderjs.setBoxGeometryConfigData;

export {
  getConfigData            ,
  createBoxGeometry        ,
  setBoxGeometryConfigData ,
  
}
/* Geometry-Wonderjs Not a pure module */
