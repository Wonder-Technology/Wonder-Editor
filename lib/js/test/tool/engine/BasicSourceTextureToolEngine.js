'use strict';

var BasicSourceTextureEngineService$WonderEditor = require("../../../src/service/state/engine/texture/BasicSourceTextureEngineService.js");
var RecordBasicSourceTextureMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/texture/source/basic_source/RecordBasicSourceTextureMainService.js");
var DisposeBasicSourceTextureMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/texture/source/basic_source/DisposeBasicSourceTextureMainService.js");

var getIsNeedUpdate = BasicSourceTextureEngineService$WonderEditor.getIsNeedUpdate;

function isAlive(texture, engineState) {
  return DisposeBasicSourceTextureMainService$Wonderjs.isAlive(texture, RecordBasicSourceTextureMainService$Wonderjs.getRecord(engineState));
}

function hasDisposedTexture(engineState) {
  return RecordBasicSourceTextureMainService$Wonderjs.getRecord(engineState)[/* disposedIndexArray */11].length > 0;
}

function buildSource($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, param) {
  var width = $staropt$star !== undefined ? $staropt$star : 2;
  var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 4;
  var src = $staropt$star$2 !== undefined ? $staropt$star$2 : "";
  var name = $staropt$star$3 !== undefined ? $staropt$star$3 : "basicSourceTexture_Source";
  return {
          width: width,
          height: height,
          src: src,
          name: name
        };
}

exports.getIsNeedUpdate = getIsNeedUpdate;
exports.isAlive = isAlive;
exports.hasDisposedTexture = hasDisposedTexture;
exports.buildSource = buildSource;
/* BasicSourceTextureEngineService-WonderEditor Not a pure module */
