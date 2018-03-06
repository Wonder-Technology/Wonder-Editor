'use strict';

import * as GeometryLogicService$WonderEditor           from "../single/GeometryLogicService.js";
import * as GameObjectLogicService$WonderEditor         from "../single/GameObjectLogicService.js";
import * as BasicMaterialLogicService$WonderEditor      from "../single/BasicMaterialLogicService.js";
import * as MeshRendererLogicSingleService$WonderEditor from "../single/MeshRendererLogicSingleService.js";

function createBox(state) {
  var match = BasicMaterialLogicService$WonderEditor.create(state);
  var match$1 = MeshRendererLogicSingleService$WonderEditor.create(match[0]);
  var match$2 = GameObjectLogicService$WonderEditor.create(match$1[0]);
  var obj = match$2[1];
  var match$3 = GeometryLogicService$WonderEditor.createBoxGeometry(match$2[0]);
  var geometry = match$3[1];
  var state$1 = GameObjectLogicService$WonderEditor.addGeometryComponent(obj, geometry, GameObjectLogicService$WonderEditor.addMeshRendererComponent(obj, match$1[1], GameObjectLogicService$WonderEditor.addMaterialComponent(obj, match[1], GeometryLogicService$WonderEditor.setBoxGeometryConfigData(geometry, {
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
/* GeometryLogicService-WonderEditor Not a pure module */
