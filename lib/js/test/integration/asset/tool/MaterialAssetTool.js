'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var MainEditorAssetIdTool$WonderEditor = require("./MainEditorAssetIdTool.js");
var MaterialInspectorTool$WonderEditor = require("../../inspector/composable_component/asset_inspector/atom_component/material_inspector/tool/MaterialInspectorTool.js");
var MainEditorAssetTreeTool$WonderEditor = require("./MainEditorAssetTreeTool.js");
var MainEditorAssetMaterialNodeTool$WonderEditor = require("./MainEditorAssetMaterialNodeTool.js");
var MainEditorAssetHeaderOperateNodeTool$WonderEditor = require("./MainEditorAssetHeaderOperateNodeTool.js");

function addOneLightMaterial(param) {
  Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
  var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
  return addedMaterialNodeId;
}

function addOneBasicMaterial(param) {
  Curry._1(MainEditorAssetTreeTool$WonderEditor.BuildAssetTree[/* Material */3][/* buildOneMaterialAssetTree */0], /* () */0);
  var addedMaterialNodeId = MainEditorAssetIdTool$WonderEditor.getNewAssetId(undefined, /* () */0);
  MainEditorAssetHeaderOperateNodeTool$WonderEditor.addMaterial(undefined, undefined, /* () */0);
  var materialComponent = MainEditorAssetMaterialNodeTool$WonderEditor.getMaterialComponent(addedMaterialNodeId, undefined, /* () */0);
  MaterialInspectorTool$WonderEditor.changeMaterialType(materialComponent, /* LightMaterial */1, /* BasicMaterial */0, addedMaterialNodeId, undefined, undefined, /* () */0);
  return addedMaterialNodeId;
}

exports.addOneLightMaterial = addOneLightMaterial;
exports.addOneBasicMaterial = addOneBasicMaterial;
/* MainEditorAssetIdTool-WonderEditor Not a pure module */
