'use strict';

import * as GeometryLogicSingleService$WonderEditor      from "../single/GeometryLogicSingleService.js";
import * as GameObjectLogicSingleService$WonderEditor    from "../single/GameObjectLogicSingleService.js";
import * as MeshRendererLogicSingleService$WonderEditor  from "../single/MeshRendererLogicSingleService.js";
import * as BasicMaterialLogicSingleService$WonderEditor from "../single/BasicMaterialLogicSingleService.js";

function createBox(state) {
  var match = BasicMaterialLogicSingleService$WonderEditor.create(state);
  var match$1 = MeshRendererLogicSingleService$WonderEditor.create(match[0]);
  var match$2 = GameObjectLogicSingleService$WonderEditor.create(match$1[0]);
  var obj = match$2[1];
  var match$3 = GeometryLogicSingleService$WonderEditor.createBoxGeometry(match$2[0]);
  var geometry = match$3[1];
  var state$1 = GameObjectLogicSingleService$WonderEditor.addGeometryComponent(obj, geometry, GameObjectLogicSingleService$WonderEditor.addMeshRendererComponent(obj, match$1[1], GameObjectLogicSingleService$WonderEditor.addMaterialComponent(obj, match[1], GeometryLogicSingleService$WonderEditor.setBoxGeometryConfigData(geometry, {
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
/* GeometryLogicSingleService-WonderEditor Not a pure module */
