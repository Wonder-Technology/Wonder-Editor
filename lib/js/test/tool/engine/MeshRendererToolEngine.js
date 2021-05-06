'use strict';

var StateLogicService$WonderEditor = require("../../../src/service/stateTuple/logic/StateLogicService.js");
var RecordMeshRendererMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/meshRenderer/RecordMeshRendererMainService.js");
var RenderArrayMeshRendererService$Wonderjs = require("wonder.js/lib/js/src/service/record/main/meshRenderer/RenderArrayMeshRendererService.js");

function getBasicMaterialRenderGameObjectArray(state) {
  return RenderArrayMeshRendererService$Wonderjs.getBasicMaterialRenderGameObjectArray(RecordMeshRendererMainService$Wonderjs.getRecord(state));
}

function getLightMaterialRenderGameObjectArray(state) {
  return RenderArrayMeshRendererService$Wonderjs.getLightMaterialRenderGameObjectArray(RecordMeshRendererMainService$Wonderjs.getRecord(state));
}

function getAllRenderArrayCount(param) {
  return /* tuple */[
          StateLogicService$WonderEditor.getEngineStateToGetData(getBasicMaterialRenderGameObjectArray).length,
          StateLogicService$WonderEditor.getEngineStateToGetData(getLightMaterialRenderGameObjectArray).length
        ];
}

exports.getBasicMaterialRenderGameObjectArray = getBasicMaterialRenderGameObjectArray;
exports.getLightMaterialRenderGameObjectArray = getLightMaterialRenderGameObjectArray;
exports.getAllRenderArrayCount = getAllRenderArrayCount;
/* StateLogicService-WonderEditor Not a pure module */
