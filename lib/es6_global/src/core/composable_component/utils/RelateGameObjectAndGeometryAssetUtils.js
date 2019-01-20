

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as GeometryEngineService$WonderEditor from "../../../service/state/engine/GeometryEngineService.js";
import * as ConverterEngineService$WonderEditor from "../../../service/state/engine/ConverterEngineService.js";
import * as GeometryAssetLogicService$WonderEditor from "../../../service/stateTuple/logic/asset/GeometryAssetLogicService.js";
import * as GeometryDataAssetEditorService$WonderEditor from "../../../service/state/editor/asset/GeometryDataAssetEditorService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/GameObjectComponentEngineService.js";
import * as PrepareDefaultComponentLogicService$WonderEditor from "../../../service/stateTuple/logic/PrepareDefaultComponentLogicService.js";

function _isGeometryNameEqual(name1, name2) {
  var match = ConverterEngineService$WonderEditor.isDefaultGeometryName(name1) && ConverterEngineService$WonderEditor.isDefaultGeometryName(name2);
  if (match) {
    return true;
  } else {
    return name1 === name2;
  }
}

function isGeometryNameEqual(name1, name2) {
  if (name1 !== undefined) {
    if (name2 !== undefined) {
      return _isGeometryNameEqual(name1, name2);
    } else {
      return false;
    }
  } else {
    return name2 === undefined;
  }
}

function isGeometryDataEqualForDefaultGeometry(param, param$1, _) {
  return isGeometryNameEqual(param[0], param$1[0]);
}

function isDefaultGeometry(geometry, param) {
  var engineState = param[1];
  var editorState = param[0];
  var defaultCubeGeometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState);
  var defaultCubeGeometryName = PrepareDefaultComponentLogicService$WonderEditor.getDefaultCubeGeometryName(/* () */0);
  var defaultSphereGeometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultSphereGeometryComponent(editorState);
  var defaultSphereGeometryName = PrepareDefaultComponentLogicService$WonderEditor.getDefaultSphereGeometryName(/* () */0);
  if (GeometryAssetLogicService$WonderEditor.isGeometryEqualDefaultGeometryData(geometry, defaultCubeGeometry, defaultCubeGeometryName, engineState)) {
    return true;
  } else {
    return GeometryAssetLogicService$WonderEditor.isGeometryEqualDefaultGeometryData(geometry, defaultSphereGeometry, defaultSphereGeometryName, engineState);
  }
}

function getTargetGeometryByJudgeDefaultGeometry(geometryData, param, isGeometryDataEqualFunc, engineState) {
  var match = param[1];
  var match$1 = param[0];
  var match$2 = Curry._3(isGeometryDataEqualFunc, geometryData, match$1[2], engineState);
  if (match$2) {
    return Js_primitive.some(match$1[0]);
  } else {
    var match$3 = Curry._3(isGeometryDataEqualFunc, geometryData, match[2], engineState);
    if (match$3) {
      return Js_primitive.some(match[0]);
    } else {
      return undefined;
    }
  }
}

function replaceGeometryComponent(gameObject, sourceGeomtry, targetGeometry, engineState) {
  if (targetGeometry !== undefined) {
    return GameObjectComponentEngineService$WonderEditor.addGeometryComponent(gameObject, targetGeometry, GameObjectComponentEngineService$WonderEditor.disposeGeometryComponent(gameObject, sourceGeomtry, engineState));
  } else {
    return engineState;
  }
}

function getGeometryData(geometry, engineState) {
  return /* tuple */[
          GeometryEngineService$WonderEditor.getGeometryName(geometry, engineState),
          GeometryEngineService$WonderEditor.getGeometryVertices(geometry, engineState),
          GeometryEngineService$WonderEditor.getGeometryNormals(geometry, engineState),
          GeometryEngineService$WonderEditor.getGeometryTexCoords(geometry, engineState)
        ];
}

function replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent(gameObject, param, engineState) {
  var match = param[1];
  var match$1 = param[0];
  var match$2 = GameObjectComponentEngineService$WonderEditor.getGeometryComponent(gameObject, engineState);
  if (match$2 !== undefined) {
    var geometry = match$2;
    var targetGeometry = getTargetGeometryByJudgeDefaultGeometry(getGeometryData(geometry, engineState), /* tuple */[
          /* tuple */[
            match$1[0],
            match$1[1],
            match$1[2]
          ],
          /* tuple */[
            match[0],
            match[1],
            match[2]
          ]
        ], isGeometryDataEqualForDefaultGeometry, engineState);
    return replaceGeometryComponent(gameObject, geometry, targetGeometry, engineState);
  } else {
    return engineState;
  }
}

function getDefaultGeometryData(editorState, engineState) {
  var defaultGeometry = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultCubeGeometryComponent(editorState);
  var defaultCubeGeometryData_001 = PrepareDefaultComponentLogicService$WonderEditor.getDefaultCubeGeometryName(/* () */0);
  var defaultCubeGeometryData_002 = getGeometryData(defaultGeometry, engineState);
  var defaultCubeGeometryData = /* tuple */[
    defaultGeometry,
    defaultCubeGeometryData_001,
    defaultCubeGeometryData_002
  ];
  var defaultGeometry$1 = GeometryDataAssetEditorService$WonderEditor.unsafeGetDefaultSphereGeometryComponent(editorState);
  var defaultSphereGeometryData_001 = PrepareDefaultComponentLogicService$WonderEditor.getDefaultSphereGeometryName(/* () */0);
  var defaultSphereGeometryData_002 = getGeometryData(defaultGeometry$1, engineState);
  var defaultSphereGeometryData = /* tuple */[
    defaultGeometry$1,
    defaultSphereGeometryData_001,
    defaultSphereGeometryData_002
  ];
  return /* tuple */[
          defaultCubeGeometryData,
          defaultSphereGeometryData
        ];
}

export {
  _isGeometryNameEqual ,
  isGeometryNameEqual ,
  isGeometryDataEqualForDefaultGeometry ,
  isDefaultGeometry ,
  getTargetGeometryByJudgeDefaultGeometry ,
  replaceGeometryComponent ,
  getGeometryData ,
  replaceWDBAssetGameObjectGeometryComponentToDefaultGeometryComponent ,
  getDefaultGeometryData ,
  
}
/* GeometryEngineService-WonderEditor Not a pure module */
