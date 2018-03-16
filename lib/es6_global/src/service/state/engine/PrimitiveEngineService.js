'use strict';

import * as GeometryEngineService$WonderEditor            from "./GeometryEngineService.js";
import * as GameObjectEngineService$WonderEditor          from "./GameObjectEngineService.js";
import * as MeshRendererEngineService$WonderEditor        from "./MeshRendererEngineService.js";
import * as BasicMaterialEngineService$WonderEditor       from "./BasicMaterialEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./GameObjectComponentEngineService.js";

function createBox(state) {
  var match = BasicMaterialEngineService$WonderEditor.create(state);
  var match$1 = MeshRendererEngineService$WonderEditor.create(match[0]);
  var match$2 = GameObjectEngineService$WonderEditor.create(match$1[0]);
  var obj = match$2[1];
  var match$3 = GeometryEngineService$WonderEditor.createBoxGeometry(match$2[0]);
  var geometry = match$3[1];
  var state$1 = GameObjectComponentEngineService$WonderEditor.addBoxGeometryComponent(obj, geometry, GameObjectComponentEngineService$WonderEditor.addMeshRendererComponent(obj, match$1[1], GameObjectComponentEngineService$WonderEditor.addBasicMaterialComponent(obj, match[1], GeometryEngineService$WonderEditor.setBoxGeometryConfigData(geometry, {
                    width: 5,
                    height: 5,
                    depth: 5,
                    widthSegment: undefined,
                    heightSegment: undefined,
                    depthSegment: undefined
                  }, match$3[0]))));
  return /* tuple */[
          state$1,
          obj
        ];
}

export {
  createBox ,
  
}
/* GeometryEngineService-WonderEditor Not a pure module */
