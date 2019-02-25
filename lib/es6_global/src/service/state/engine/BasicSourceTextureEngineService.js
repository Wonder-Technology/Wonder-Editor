

import * as BasicSourceTextureAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/texture/BasicSourceTextureAPI.js";
import * as BufferSourceTextureService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/texture/BufferSourceTextureService.js";
import * as InitSourceTextureMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/texture/InitSourceTextureMainService.js";
import * as NameBasicSourceTextureMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/texture/basic_source/NameBasicSourceTextureMainService.js";
import * as OperateBasicSourceTextureMainService$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/texture/basic_source/OperateBasicSourceTextureMainService.js";

function setSource(source, texture, engineState) {
  return BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureSource(texture, source, engineState);
}

function setBasicSourceTextureName(name, texture, engineState) {
  return BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureName(texture, name, engineState);
}

function setWrapS(wrapS, texture, engineState) {
  return BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapS(texture, wrapS, engineState);
}

function setWrapT(wrapT, texture, engineTtate) {
  return BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureWrapT(texture, wrapT, engineTtate);
}

function setMagFilter(filter, texture, engineState) {
  return BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMagFilter(texture, filter, engineState);
}

function setMinFilter(filter, texture, engineState) {
  return BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureMinFilter(texture, filter, engineState);
}

function setFormat(format, texture, engineState) {
  return BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFormat(texture, format, engineState);
}

function setType(type_, texture, engineState) {
  return BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureType(texture, type_, engineState);
}

function setFlipY(filpY, texture, engineState) {
  return BasicSourceTextureAPI$Wonderjs.setBasicSourceTextureFlipY(texture, filpY, engineState);
}

var getIsNeedUpdate = OperateBasicSourceTextureMainService$Wonderjs.getIsNeedUpdate;

function setIsNeedUpdate(isNeedUpdate, texture, state) {
  return OperateBasicSourceTextureMainService$Wonderjs.setIsNeedUpdate(texture, isNeedUpdate ? BufferSourceTextureService$Wonderjs.getNeedUpdate(/* () */0) : BufferSourceTextureService$Wonderjs.getNotNeedUpdate(/* () */0), state);
}

function initTexture(texture, state) {
  return InitSourceTextureMainService$Wonderjs.initTexture(texture, state);
}

var create = BasicSourceTextureAPI$Wonderjs.createBasicSourceTexture;

var unsafeGetSource = BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureSource;

var getBasicSourceTextureName = NameBasicSourceTextureMainService$Wonderjs.getName;

var unsafeGetBasicSourceTextureName = BasicSourceTextureAPI$Wonderjs.unsafeGetBasicSourceTextureName;

var getWidth = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWidth;

var getHeight = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureHeight;

var getWrapS = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapS;

var getWrapT = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureWrapT;

var getMagFilter = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMagFilter;

var getMinFilter = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureMinFilter;

var getFormat = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFormat;

var getType = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureType;

var getFlipY = BasicSourceTextureAPI$Wonderjs.getBasicSourceTextureFlipY;

var getAllTextures = BasicSourceTextureAPI$Wonderjs.getAllTextures;

export {
  create ,
  unsafeGetSource ,
  setSource ,
  getBasicSourceTextureName ,
  unsafeGetBasicSourceTextureName ,
  setBasicSourceTextureName ,
  getWidth ,
  getHeight ,
  getWrapS ,
  setWrapS ,
  getWrapT ,
  setWrapT ,
  getMagFilter ,
  setMagFilter ,
  getMinFilter ,
  setMinFilter ,
  getFormat ,
  setFormat ,
  getType ,
  setType ,
  getFlipY ,
  setFlipY ,
  getIsNeedUpdate ,
  setIsNeedUpdate ,
  initTexture ,
  getAllTextures ,
  
}
/* BasicSourceTextureAPI-Wonderjs Not a pure module */
