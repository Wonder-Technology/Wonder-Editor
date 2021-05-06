'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var ExtendIMGUIEngineService$WonderEditor = require("../../../src/service/state/engine/imgui/ExtendIMGUIEngineService.js");

function unsafeGetButtonSkinData(skinName, engineState) {
  return Curry._2(ExtendIMGUIEngineService$WonderEditor.unsafeGetSkinData, skinName, engineState)[/* buttonSkinData */0];
}

function unsafeGetAllCustomStyleData(skinName, engineState) {
  return Curry._2(ExtendIMGUIEngineService$WonderEditor.unsafeGetSkinData, skinName, engineState)[/* allCustomStyleData */1];
}

exports.unsafeGetButtonSkinData = unsafeGetButtonSkinData;
exports.unsafeGetAllCustomStyleData = unsafeGetAllCustomStyleData;
/* ExtendIMGUIEngineService-WonderEditor Not a pure module */
