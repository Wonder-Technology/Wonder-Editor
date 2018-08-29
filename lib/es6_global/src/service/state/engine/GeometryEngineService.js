

import * as GeometryAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/geometry/GeometryAPI.js";
import * as ArrayService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/ArrayService.js";
import * as GameObjectAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as ArrayService$WonderEditor from "../../atom/ArrayService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as GameObjectUtils$WonderEditor from "../../../core/utils/engine/GameObjectUtils.js";
import * as NameGeometryMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/geometry/NameGeometryMainService.js";
import * as GameObjectLogicService$WonderEditor from "../../stateTuple/logic/GameObjectLogicService.js";
import * as GameObjectEngineService$WonderEditor from "./GameObjectEngineService.js";
import * as RenderGroupEngineService$WonderEditor from "./RenderGroupEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "./MeshRendererEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "./BasicMaterialEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./GameObjectComponentEngineService.js";

function getDefaultGeometryNameIfNotExistName(geometry, state) {
  var match = NameGeometryMainService$Wonderjs.getName(geometry, state);
  if (match !== undefined) {
    return match;
  } else {
    return "New Geometry";
  }
}

function getAllUniqueGeometrys(gameObject, engineState) {
  var _iterateGameObjectArr = function (gameObjectArr, resultArr, engineState) {
    return ArrayService$WonderCommonlib.reduceOneParam((function (resultArr, gameObject) {
                  var match = GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(gameObject, engineState);
                  var resultArr$1 = match ? ArrayService$Wonderjs.push(GameObjectComponentEngineService$WonderEditor.unsafeGetGeometryComponent(gameObject, engineState), resultArr) : resultArr;
                  return _iterateGameObjectArr(GameObjectUtils$WonderEditor.getChildren(gameObject, engineState), resultArr$1, engineState);
                }), resultArr, gameObjectArr);
  };
  return ArrayService$Wonderjs.removeDuplicateItems((function (id) {
                return String(id);
              }), _iterateGameObjectArr(/* array */[gameObject], /* array */[], engineState));
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
  var match = GameObjectLogicService$WonderEditor.createGameObjectForEditEngineState(engineState);
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
  var engineState$3 = GameObjectLogicService$WonderEditor.addRenderGroupForEditEngineState(gameObject, renderGroup, /* tuple */[
        GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent,
        GameObjectAPI$Wonderjs.addGameObjectBasicMaterialComponent
      ], GameObjectLogicService$WonderEditor.addGeometryForEditEngineState(gameObject, geometry, BasicMaterialEngineService$WonderEditor.setColor(color, renderGroup[/* material */1], MeshRendererEngineService$WonderEditor.setDrawMode(/* Lines */1, renderGroup[/* meshRenderer */0], match$3[0]))));
  return /* tuple */[
          engineState$3,
          gameObject
        ];
}

var create = GeometryAPI$Wonderjs.createGeometry;

var getGeometryName = NameGeometryMainService$Wonderjs.getName;

var unsafeGetGeometryName = GeometryAPI$Wonderjs.unsafeGetGeometryName;

var setGeometryName = GeometryAPI$Wonderjs.setGeometryName;

var createCubeGeometry = GeometryAPI$Wonderjs.createBoxGeometry;

var createSphereGeometry = GeometryAPI$Wonderjs.createSphereGeometry;

var getGeometryVertices = GeometryAPI$Wonderjs.getGeometryVertices;

var setGeometryVertices = GeometryAPI$Wonderjs.setGeometryVertices;

var getGeometryIndices = GeometryAPI$Wonderjs.getGeometryIndices;

var setGeometryIndices = GeometryAPI$Wonderjs.setGeometryIndices;

var getGeometryTexCoords = GeometryAPI$Wonderjs.getGeometryTexCoords;

export {
  create ,
  getGeometryName ,
  unsafeGetGeometryName ,
  getDefaultGeometryNameIfNotExistName ,
  setGeometryName ,
  createCubeGeometry ,
  createSphereGeometry ,
  getGeometryVertices ,
  setGeometryVertices ,
  getGeometryIndices ,
  setGeometryIndices ,
  getAllUniqueGeometrys ,
  _generateGridPlanePoints ,
  createGridPlaneGameObject ,
  getGeometryTexCoords ,
  
}
/* GeometryAPI-Wonderjs Not a pure module */
