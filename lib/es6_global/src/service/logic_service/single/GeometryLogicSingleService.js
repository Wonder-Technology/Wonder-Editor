'use strict';

import * as BoxGeometry$Wonderjs    from "../../../../../../node_modules/wonder.js/lib/es6_global/src/ecs/component/api/geometry/BoxGeometry.js";
import * as GeometrySystem$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/ecs/component/system/geometry/GeometrySystem.js";

var getConfigData = GeometrySystem$Wonderjs.getConfigData;

var createBoxGeometry = BoxGeometry$Wonderjs.createBoxGeometry;

var setBoxGeometryConfigData = BoxGeometry$Wonderjs.setBoxGeometryConfigData;

export {
  getConfigData            ,
  createBoxGeometry        ,
  setBoxGeometryConfigData ,
  
}
/* BoxGeometry-Wonderjs Not a pure module */
