

import * as GeometryAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/geometry/GeometryAPI.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as ArrayService$WonderEditor from "../../atom/ArrayService.js";
import * as BufferGeometryService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/geometry/BufferGeometryService.js";
import * as NameGeometryMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/geometry/NameGeometryMainService.js";
import * as RecordGeometryMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/geometry/RecordGeometryMainService.js";
import * as GameObjectEngineService$WonderEditor from "./GameObjectEngineService.js";
import * as RenderGroupEngineService$WonderEditor from "./RenderGroupEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "./MeshRendererEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "./BasicMaterialEngineService.js";
import * as ComputeBoxPointsGeometryService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/geometry/ComputeBoxPointsGeometryService.js";
import * as ReallocatedPointsGeometryService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/primitive/geometry/ReallocatedPointsGeometryService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./GameObjectComponentEngineService.js";
import * as CreateDefaultGeometryGeometryMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/geometry/CreateDefaultGeometryGeometryMainService.js";

function createCubeGeometry(engineState) {
  return CreateDefaultGeometryGeometryMainService$Wonderjs.create(ComputeBoxPointsGeometryService$Wonderjs.generateAllFaces(/* tuple */[
                  0.5,
                  0.5,
                  0.5,
                  1,
                  1,
                  1
                ]), engineState);
}

function hasGeometryTexCoords(geometry, engineState) {
  return GeometryAPI$Wonderjs.getGeometryTexCoords(geometry, engineState).length > 0;
}

function _generateGridPlanePoints(_param, _param$1, _vertices, _indices) {
  while(true) {
    var param = _param$1;
    var param$1 = _param;
    var indices = _indices;
    var vertices = _vertices;
    var index = param[1];
    var num = param[0];
    var y = param$1[2];
    var step = param$1[1];
    var size = param$1[0];
    var match = num > size;
    if (match) {
      return /* tuple */[
              vertices,
              indices
            ];
    } else {
      _indices = ArrayService$WonderEditor.pushMany(/* array */[
            index,
            index + 1 | 0,
            index + 2 | 0,
            index + 3 | 0
          ], indices);
      _vertices = ArrayService$WonderEditor.pushMany(/* array */[
            num,
            y,
            size
          ], ArrayService$WonderEditor.pushMany(/* array */[
                num,
                y,
                -size
              ], ArrayService$WonderEditor.pushMany(/* array */[
                    size,
                    y,
                    num
                  ], ArrayService$WonderEditor.pushMany(/* array */[
                        -size,
                        y,
                        num
                      ], vertices))));
      _param$1 = /* tuple */[
        num + step,
        index + 4 | 0
      ];
      _param = /* tuple */[
        size,
        step,
        y
      ];
      continue ;
    }
  };
}

function createGridPlaneGameObject(param, color, engineState) {
  var size = param[0];
  var match = GameObjectEngineService$WonderEditor.create(engineState);
  var gameObject = match[1];
  var match$1 = GeometryAPI$Wonderjs.createGeometry(match[0]);
  var geometry = match$1[1];
  var match$2 = _generateGridPlanePoints(/* tuple */[
        size,
        param[1],
        param[2]
      ], /* tuple */[
        -size,
        0
      ], /* array */[], /* array */[]);
  var engineState$1 = GeometryAPI$Wonderjs.setGeometryIndices(geometry, new Uint16Array(match$2[1]), GeometryAPI$Wonderjs.setGeometryVertices(geometry, new Float32Array(match$2[0]), match$1[0]));
  var engineState$2 = GameObjectEngineService$WonderEditor.setGameObjectName("gridPlane", gameObject, engineState$1);
  var match$3 = RenderGroupEngineService$WonderEditor.createRenderGroup(/* tuple */[
        MeshRendererEngineService$WonderEditor.create,
        BasicMaterialEngineService$WonderEditor.create
      ], engineState$2);
  var renderGroup = match$3[1];
  var engineState$3 = RenderGroupEngineService$WonderEditor.addRenderGroupComponents(gameObject, renderGroup, /* tuple */[
        GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent,
        GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent
      ], GameObjectComponentEngineService$WonderEditor.addGeometryComponent(gameObject, geometry, BasicMaterialEngineService$WonderEditor.setColor(color, renderGroup[/* material */1], MeshRendererEngineService$WonderEditor.setDrawMode(/* Lines */1, renderGroup[/* meshRenderer */0], match$3[0]))));
  return /* tuple */[
          engineState$3,
          gameObject
        ];
}

function getIndicesCount(geometry, engineState) {
  var match = RecordGeometryMainService$Wonderjs.getRecord(engineState);
  var match$1 = ReallocatedPointsGeometryService$Wonderjs.getInfo(BufferGeometryService$Wonderjs.getInfoIndex(geometry), match[/* indicesInfos */10]);
  return match$1[1] - match$1[0] | 0;
}

function hasIndices(indices) {
  return indices.length > 0;
}

function hasIndices32(indices32) {
  return indices32.length > 0;
}

var create = GeometryAPI$Wonderjs.createGeometry;

var getGeometryName = NameGeometryMainService$Wonderjs.getName;

var unsafeGetGeometryName = GeometryAPI$Wonderjs.unsafeGetGeometryName;

var setGeometryName = GeometryAPI$Wonderjs.setGeometryName;

var createSphereGeometry = GeometryAPI$Wonderjs.createSphereGeometry;

var getGeometryVertices = GeometryAPI$Wonderjs.getGeometryVertices;

var setGeometryVertices = GeometryAPI$Wonderjs.setGeometryVertices;

var getGeometryNormals = GeometryAPI$Wonderjs.getGeometryNormals;

var setGeometryNormals = GeometryAPI$Wonderjs.setGeometryNormals;

var setGeometryTexCoords = GeometryAPI$Wonderjs.setGeometryTexCoords;

var getGeometryIndices = GeometryAPI$Wonderjs.getGeometryIndices;

var setGeometryIndices = GeometryAPI$Wonderjs.setGeometryIndices;

var getGeometryIndices32 = GeometryAPI$Wonderjs.getGeometryIndices32;

var setGeometryIndices32 = GeometryAPI$Wonderjs.setGeometryIndices32;

var unsafeGetGeometryGameObjects = GeometryAPI$Wonderjs.unsafeGetGeometryGameObjects;

var getGeometryTexCoords = GeometryAPI$Wonderjs.getGeometryTexCoords;

var batchDisposeGeometry = GeometryAPI$Wonderjs.batchDisposeGeometry;

export {
  create ,
  getGeometryName ,
  unsafeGetGeometryName ,
  setGeometryName ,
  createCubeGeometry ,
  createSphereGeometry ,
  getGeometryVertices ,
  setGeometryVertices ,
  getGeometryNormals ,
  setGeometryNormals ,
  setGeometryTexCoords ,
  getGeometryIndices ,
  setGeometryIndices ,
  getGeometryIndices32 ,
  setGeometryIndices32 ,
  hasGeometryTexCoords ,
  unsafeGetGeometryGameObjects ,
  _generateGridPlanePoints ,
  createGridPlaneGameObject ,
  getGeometryTexCoords ,
  batchDisposeGeometry ,
  getIndicesCount ,
  hasIndices ,
  hasIndices32 ,
  
}
/* GeometryAPI-Wonderjs Not a pure module */
