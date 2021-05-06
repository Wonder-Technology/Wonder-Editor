'use strict';

var Caml_option = require("bs-platform/lib/js/caml_option.js");
var OptionService$WonderEditor = require("../../../src/service/primitive/OptionService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var AssetIMGUIEngineService$WonderEditor = require("../../../src/service/state/engine/imgui/AssetIMGUIEngineService.js");

function buildFakeBitmapArrayBuffer(param) {
  return new ArrayBuffer(20);
}

function setSettedAssetBitmapData($staropt$star, $staropt$star$1, $staropt$star$2, param) {
  var name = $staropt$star !== undefined ? $staropt$star : "bitmap";
  var arrayBuffer = $staropt$star$1 !== undefined ? Caml_option.valFromOption($staropt$star$1) : new ArrayBuffer(20);
  var engineState = $staropt$star$2 !== undefined ? $staropt$star$2 : StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  return AssetIMGUIEngineService$WonderEditor.setSettedAssetBitmapData(name, arrayBuffer, engineState);
}

var addSettedAssetCustomImageData = AssetIMGUIEngineService$WonderEditor.addSettedAssetCustomImageData;

function buildFakeCustomImageArrayBuffer(param) {
  return new ArrayBuffer(10);
}

function buildFakeCustomImageData($staropt$star, param) {
  var imageId = $staropt$star !== undefined ? $staropt$star : "i1";
  return /* tuple */[
          new ArrayBuffer(10),
          imageId,
          "image/png"
        ];
}

function findSettedAssetCustomImageDataById(customImageId, engineState) {
  return OptionService$WonderEditor.unsafeGet(Caml_option.undefined_to_opt(AssetIMGUIEngineService$WonderEditor.getSettedAssetCustomImageDataArr(engineState).find((function (param) {
                        return param[1] === customImageId;
                      }))));
}

exports.buildFakeBitmapArrayBuffer = buildFakeBitmapArrayBuffer;
exports.setSettedAssetBitmapData = setSettedAssetBitmapData;
exports.addSettedAssetCustomImageData = addSettedAssetCustomImageData;
exports.buildFakeCustomImageArrayBuffer = buildFakeCustomImageArrayBuffer;
exports.buildFakeCustomImageData = buildFakeCustomImageData;
exports.findSettedAssetCustomImageDataById = findSettedAssetCustomImageDataById;
/* OptionService-WonderEditor Not a pure module */
