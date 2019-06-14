

import * as OptionService$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/OptionService.js";
import * as ScriptAttributeAPI$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/api/script/ScriptAttributeAPI.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";
import * as OperateScriptAttributeDataMainService$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/script/OperateScriptAttributeDataMainService.js";

var hasScriptAttributeField = ImmutableHashMapService$WonderCommonlib.has;

function replaceScriptAttributeField(fieldName, attributeFieldJsObj, attribute) {
  return OperateScriptAttributeDataMainService$Wonderjs.addScriptAttributeFieldJsObj(fieldName, attributeFieldJsObj, OperateScriptAttributeDataMainService$Wonderjs.removeScriptAttributeField(fieldName, attribute));
}

function unsafeGetScriptAttributeField(fieldName, attribute) {
  return OptionService$Wonderjs.unsafeGet(OperateScriptAttributeDataMainService$Wonderjs.getScriptAttributeField(fieldName, attribute));
}

var _addScriptAttributeField = ImmutableHashMapService$WonderCommonlib.set;

function renameScriptAttributeField(oldFieldName, newFieldName, attribute) {
  var attributeField = OptionService$Wonderjs.unsafeGet(OperateScriptAttributeDataMainService$Wonderjs.getScriptAttributeField(oldFieldName, attribute));
  var attribute$1 = OperateScriptAttributeDataMainService$Wonderjs.removeScriptAttributeField(oldFieldName, attribute);
  return ImmutableHashMapService$WonderCommonlib.set(newFieldName, attributeField, attribute$1);
}

function unsafeGetScriptAttributeFieldType(fieldName, attribute) {
  return OptionService$Wonderjs.unsafeGet(OperateScriptAttributeDataMainService$Wonderjs.getScriptAttributeField(fieldName, attribute))[/* type_ */0];
}

var unsafeGetScriptAttributeFieldDefaultValue = OperateScriptAttributeDataMainService$Wonderjs.unsafeGetScriptAttributeFieldDefaultValue;

var createScriptAttribute = ScriptAttributeAPI$Wonderjs.createScriptAttribute;

var addScriptAttributeFieldJsObj = ScriptAttributeAPI$Wonderjs.addScriptAttributeFieldJsObj;

var removeScriptAttributeField = ScriptAttributeAPI$Wonderjs.removeScriptAttributeField;

var getScriptAttributeEntries = ScriptAttributeAPI$Wonderjs.getScriptAttributeEntries;

export {
  createScriptAttribute ,
  addScriptAttributeFieldJsObj ,
  removeScriptAttributeField ,
  getScriptAttributeEntries ,
  hasScriptAttributeField ,
  replaceScriptAttributeField ,
  unsafeGetScriptAttributeField ,
  _addScriptAttributeField ,
  renameScriptAttributeField ,
  unsafeGetScriptAttributeFieldType ,
  unsafeGetScriptAttributeFieldDefaultValue ,
  
}
/* OptionService-Wonderjs Not a pure module */
