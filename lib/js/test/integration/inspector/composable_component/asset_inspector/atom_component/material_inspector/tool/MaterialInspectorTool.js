'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var TestTool$WonderEditor = require("../../../../../../../tool/TestTool.js");
var MaterialInspector$WonderEditor = require("../../../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/atom_component/material_Inspector/ui/MaterialInspector.js");

function changeMaterialType(material, sourceMaterialType, targetMaterialType, materialNodeId, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(MaterialInspector$WonderEditor.Method[/* changeMaterialType */0], /* tuple */[
              uiState,
              dispatchFunc
            ], /* tuple */[
              materialNodeId,
              material
            ], /* tuple */[
              sourceMaterialType,
              targetMaterialType
            ]);
}

var didMount = MaterialInspector$WonderEditor.Method[/* didMount */1];

var willUnmount = MaterialInspector$WonderEditor.Method[/* willUnmount */3];

exports.changeMaterialType = changeMaterialType;
exports.didMount = didMount;
exports.willUnmount = willUnmount;
/* TestTool-WonderEditor Not a pure module */
