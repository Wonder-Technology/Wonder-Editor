

import * as GeometryEngineService$WonderEditor from "../../state/engine/GeometryEngineService.js";
import * as BasicMaterialEngineService$WonderEditor from "../../state/engine/BasicMaterialEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "../../state/engine/LightMaterialEngineService.js";
import * as GeometryDataAssetEditorService$WonderEditor from "../../state/editor/asset/GeometryDataAssetEditorService.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../state/editor/asset/MaterialDataAssetEditorService.js";

function getDefaultCubeGeometryName() {
  return "Wonder-Default-Cube";
}

function getDefaultSphereGeometryName() {
  return "Wonder-Default-Sphere";
}

function _buildDefaultCubeGeometryComponent(engineState) {
  var match = GeometryEngineService$WonderEditor.createCubeGeometry(engineState);
  var cubeGeometry = match[1];
  return /* tuple */[
          GeometryEngineService$WonderEditor.setGeometryName(cubeGeometry, "Wonder-Default-Cube", match[0]),
          cubeGeometry
        ];
}

function _buildDefaultSphereGeometryComponent(engineState) {
  var match = GeometryEngineService$WonderEditor.createSphereGeometry(0.5, 28, engineState);
  var sphereGeometry = match[1];
  return /* tuple */[
          GeometryEngineService$WonderEditor.setGeometryName(sphereGeometry, "Wonder-Default-Sphere", match[0]),
          sphereGeometry
        ];
}

function buildDefaultCubeGeometryComponent(editorState, engineState) {
  var match = _buildDefaultCubeGeometryComponent(engineState);
  var cubeGeometry = match[1];
  var geometry = GeometryDataAssetEditorService$WonderEditor.getGeometryData(editorState);
  return /* tuple */[
          GeometryDataAssetEditorService$WonderEditor.setGeometryData(/* record */[
                /* defaultCubeGeometryComponent */cubeGeometry,
                /* defaultSphereGeometryComponent */geometry[/* defaultSphereGeometryComponent */1]
              ], editorState),
          match[0],
          cubeGeometry
        ];
}

function buildDefaultSphereGeometryComponent(editorState, engineState) {
  var match = _buildDefaultSphereGeometryComponent(engineState);
  var geometry = GeometryDataAssetEditorService$WonderEditor.getGeometryData(editorState);
  return /* tuple */[
          GeometryDataAssetEditorService$WonderEditor.setGeometryData(/* record */[
                /* defaultCubeGeometryComponent */geometry[/* defaultCubeGeometryComponent */0],
                /* defaultSphereGeometryComponent */match[1]
              ], editorState),
          match[0]
        ];
}

function getDefaultBasicMaterialName() {
  return "Wonder-Default-Basic-Material";
}

function getDefaultLightMaterialName() {
  return "Wonder-Default-Light-Material";
}

function buildDefaultMaterialComponents(editorState, engineState) {
  var match = BasicMaterialEngineService$WonderEditor.create(engineState);
  var basicMaterial = match[1];
  var match$1 = LightMaterialEngineService$WonderEditor.create(match[0]);
  var lightMaterial = match$1[1];
  var engineState$1 = LightMaterialEngineService$WonderEditor.setLightMaterialName(lightMaterial, "Wonder-Default-Light-Material", BasicMaterialEngineService$WonderEditor.setBasicMaterialName(basicMaterial, "Wonder-Default-Basic-Material", match$1[0]));
  var editorState$1 = MaterialDataAssetEditorService$WonderEditor.setDefaultLightMaterialData(lightMaterial, MaterialDataAssetEditorService$WonderEditor.setDefaultBasicMaterialData(basicMaterial, editorState));
  return /* tuple */[
          editorState$1,
          engineState$1
        ];
}

export {
  getDefaultCubeGeometryName ,
  getDefaultSphereGeometryName ,
  _buildDefaultCubeGeometryComponent ,
  _buildDefaultSphereGeometryComponent ,
  buildDefaultCubeGeometryComponent ,
  buildDefaultSphereGeometryComponent ,
  getDefaultBasicMaterialName ,
  getDefaultLightMaterialName ,
  buildDefaultMaterialComponents ,
  
}
/* GeometryEngineService-WonderEditor Not a pure module */
