

import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as OptionService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/OptionService.js";
import * as GenerateWDBSystem$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/asset/generate/GenerateWDBSystem.js";
import * as GenerateSceneGraphAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/asset/GenerateSceneGraphAPI.js";
import * as IndicesGeometryMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/geometry/IndicesGeometryMainService.js";
import * as NormalsGeometryMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/geometry/NormalsGeometryMainService.js";
import * as VerticesGeometryMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/geometry/VerticesGeometryMainService.js";
import * as TexCoordsGeometryMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/geometry/TexCoordsGeometryMainService.js";

function _writeUint32DataToUint8Array(uint32Data) {
  return new Uint8Array(new Uint32Array(/* array */[uint32Data]).buffer);
}

function isUint8ArrayHasOneUint32Data(uint8Array) {
  return uint8Array.length === 4;
}

function readUint32DataFromUint8Array(uint8Array) {
  return new Uint32Array(uint8Array.buffer)[0];
}

function generateWDBForWPK(sceneGameObject, imageUint8ArrayMap, engineState) {
  return GenerateWDBSystem$Wonderjs.generateWDB(sceneGameObject, OptionService$Wonderjs.unsafeGet((imageUint8ArrayMap == null) ? undefined : Js_primitive.some(imageUint8ArrayMap)), /* tuple */[
              /* tuple */[
                (function (geometry, engineState) {
                    var length = VerticesGeometryMainService$Wonderjs.getVertices(geometry, engineState).length;
                    return new Float32Array(/* array */[
                                length,
                                length,
                                length
                              ]);
                  }),
                (function (geometry, engineState) {
                    var length = NormalsGeometryMainService$Wonderjs.getNormals(geometry, engineState).length;
                    return new Float32Array(/* array */[
                                length,
                                length,
                                length
                              ]);
                  }),
                (function (geometry, engineState) {
                    var length = TexCoordsGeometryMainService$Wonderjs.getTexCoords(geometry, engineState).length;
                    return new Float32Array(/* array */[
                                length,
                                length
                              ]);
                  }),
                (function (geometry, engineState) {
                    return new Uint16Array(/* array */[IndicesGeometryMainService$Wonderjs.getIndices(geometry, engineState).length]);
                  }),
                (function (geometry, engineState) {
                    return new Uint32Array(/* array */[IndicesGeometryMainService$Wonderjs.getIndices32(geometry, engineState).length]);
                  })
              ],
              (function (imageUint8Array) {
                  return _writeUint32DataToUint8Array(imageUint8Array.length);
                })
            ], engineState);
}

var generateGLBData = GenerateSceneGraphAPI$Wonderjs.generateGLBData;

var generateWDB = GenerateSceneGraphAPI$Wonderjs.generateWDB;

export {
  generateGLBData ,
  generateWDB ,
  _writeUint32DataToUint8Array ,
  isUint8ArrayHasOneUint32Data ,
  readUint32DataFromUint8Array ,
  generateWDBForWPK ,
  
}
/* OptionService-Wonderjs Not a pure module */
