

import * as ArrayService$WonderEditor from "../../../service/atom/ArrayService.js";
import * as LanguageAssetData$WonderEditor from "../../config/data/LanguageAssetData.js";
import * as LanguageHeaderData$WonderEditor from "../../config/data/LanguageHeaderData.js";
import * as LanguageMessageData$WonderEditor from "../../config/data/LanguageMessageData.js";
import * as LanguageInspectorData$WonderEditor from "../../config/data/LanguageInspectorData.js";
import * as LanguageSceneTreeData$WonderEditor from "../../config/data/LanguageSceneTreeData.js";
import * as LanguageControllerData$WonderEditor from "../../config/data/LanguageControllerData.js";

function _getLanguageDataByType(languageDataArray, itemName, type_) {
  var match = ArrayService$WonderEditor.unsafeGetFirst(languageDataArray.filter((function (param) {
              return param[/* title */0] === itemName;
            })));
  var language = match[/* language */1];
  if (type_) {
    return language[/* en */1];
  } else {
    return language[/* zh */0];
  }
}

function getHeaderLanguageDataByType(itemName, type_) {
  return _getLanguageDataByType(LanguageHeaderData$WonderEditor.header_language_array, itemName, type_);
}

function getHeaderVersionUpgradeContentLanguageDataByType(newVersion, type_) {
  if (type_) {
    return "Upgrade to " + (String(newVersion) + " Version, We are here to serve you~ Thanks for your trust~");
  } else {
    return "升级到" + (String(newVersion) + "版本，我们为您服务～感谢您的信任和支持～");
  }
}

function getControllerLanguageDataByType(itemName, type_) {
  return _getLanguageDataByType(LanguageControllerData$WonderEditor.controller_language_array, itemName, type_);
}

function getAssetLanguageDataByType(itemName, type_) {
  return _getLanguageDataByType(LanguageAssetData$WonderEditor.asset_language_array, itemName, type_);
}

function getSceneTreeLanguageDataByType(itemName, type_) {
  return _getLanguageDataByType(LanguageSceneTreeData$WonderEditor.sceneTree_language_array, itemName, type_);
}

function getInspectorLanguageDataByType(itemName, type_) {
  return _getLanguageDataByType(LanguageInspectorData$WonderEditor.inspector_language_array, itemName, type_);
}

function getMessageLanguageDataByType(itemName, type_) {
  return _getLanguageDataByType(LanguageMessageData$WonderEditor.message_language_array, itemName, type_);
}

export {
  _getLanguageDataByType ,
  getHeaderLanguageDataByType ,
  getHeaderVersionUpgradeContentLanguageDataByType ,
  getControllerLanguageDataByType ,
  getAssetLanguageDataByType ,
  getSceneTreeLanguageDataByType ,
  getInspectorLanguageDataByType ,
  getMessageLanguageDataByType ,
  
}
/* ArrayService-WonderEditor Not a pure module */
