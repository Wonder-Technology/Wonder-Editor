

import * as Js_option from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Caml_array from "../../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ScriptAPI$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/api/script/ScriptAPI.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as OperateScriptDataMainService$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/script/OperateScriptDataMainService.js";
import * as ImmutableHashMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableHashMapService.js";
import * as ImmutableSparseMapService$WonderCommonlib from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ImmutableSparseMapService.js";

function getScriptAllEventFunctionEntries(script, engineState) {
  var scriptRecord = engineState[/* scriptRecord */25];
  var match = ImmutableSparseMapService$WonderCommonlib.get(script, scriptRecord[/* scriptEventFunctionDataMap */5]);
  if (match !== undefined) {
    return ImmutableHashMapService$WonderCommonlib.getValidEntries(Caml_option.valFromOption(match));
  } else {
    return ArrayService$WonderCommonlib.createEmpty(/* () */0);
  }
}

function hasScriptEventFunctionData(script, scriptEventFunctionName, engineState) {
  var scriptRecord = engineState[/* scriptRecord */25];
  return Js_option.isSome(Js_option.andThen((function (eventFunctionDataMap) {
                    var match = ImmutableHashMapService$WonderCommonlib.has(scriptEventFunctionName, eventFunctionDataMap);
                    if (match) {
                      return /* () */0;
                    }
                    
                  }), ImmutableSparseMapService$WonderCommonlib.get(script, scriptRecord[/* scriptEventFunctionDataMap */5])));
}

function getScriptAllAttributeEntries(script, engineState) {
  var scriptRecord = engineState[/* scriptRecord */25];
  var match = ImmutableSparseMapService$WonderCommonlib.get(script, scriptRecord[/* scriptAttributeMap */6]);
  if (match !== undefined) {
    return ImmutableHashMapService$WonderCommonlib.getValidEntries(Caml_option.valFromOption(match));
  } else {
    return ArrayService$WonderCommonlib.createEmpty(/* () */0);
  }
}

function hasScriptAttributeData(script, scriptAttributeName, engineState) {
  var scriptRecord = engineState[/* scriptRecord */25];
  return Js_option.isSome(Js_option.andThen((function (attributeMap) {
                    var match = ImmutableHashMapService$WonderCommonlib.has(scriptAttributeName, attributeMap);
                    if (match) {
                      return /* () */0;
                    }
                    
                  }), ImmutableSparseMapService$WonderCommonlib.get(script, scriptRecord[/* scriptAttributeMap */6])));
}

function _replaceScriptDataByEntriesMap(script, scriptDataMap, scriptDataEntriesMap, engineState) {
  var match = ImmutableSparseMapService$WonderCommonlib.get(script, scriptDataMap);
  if (match !== undefined) {
    return ImmutableSparseMapService$WonderCommonlib.set(script, ImmutableSparseMapService$WonderCommonlib.reduceValid((function (dataMap, param) {
                      var name = param[0];
                      var match = ImmutableHashMapService$WonderCommonlib.has(name, dataMap);
                      if (match) {
                        return ImmutableHashMapService$WonderCommonlib.set(name, param[1], dataMap);
                      } else {
                        return dataMap;
                      }
                    }), Caml_option.valFromOption(match), scriptDataEntriesMap), scriptDataMap);
  } else {
    return scriptDataMap;
  }
}

function replaceScriptEventFunctionDataByEntriesMap(script, scriptEventFunctionEntriesMap, engineState) {
  var scriptRecord = engineState[/* scriptRecord */25];
  var newrecord = Caml_array.caml_array_dup(engineState);
  newrecord[/* scriptRecord */25] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */_replaceScriptDataByEntriesMap(script, scriptRecord[/* scriptEventFunctionDataMap */5], scriptEventFunctionEntriesMap, engineState),
    /* scriptAttributeMap */scriptRecord[/* scriptAttributeMap */6]
  ];
  return newrecord;
}

function replaceScriptAttributeByEntriesMap(script, scriptAttributeEntriesMap, engineState) {
  var scriptRecord = engineState[/* scriptRecord */25];
  var newrecord = Caml_array.caml_array_dup(engineState);
  newrecord[/* scriptRecord */25] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */scriptRecord[/* scriptEventFunctionDataMap */5],
    /* scriptAttributeMap */_replaceScriptDataByEntriesMap(script, scriptRecord[/* scriptAttributeMap */6], scriptAttributeEntriesMap, engineState)
  ];
  return newrecord;
}

function _updateScriptDataMapInAllScriptComponents(dataName, newData, scriptDataMap) {
  return ImmutableSparseMapService$WonderCommonlib.mapValid((function (dataMap) {
                var match = ImmutableHashMapService$WonderCommonlib.has(dataName, dataMap);
                if (match) {
                  return ImmutableHashMapService$WonderCommonlib.set(dataName, newData, dataMap);
                } else {
                  return dataMap;
                }
              }), scriptDataMap);
}

function updateAttributeInAllScriptComponents(attributeName, newAttribute, engineState) {
  var scriptRecord = engineState[/* scriptRecord */25];
  var newrecord = Caml_array.caml_array_dup(engineState);
  newrecord[/* scriptRecord */25] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */scriptRecord[/* scriptEventFunctionDataMap */5],
    /* scriptAttributeMap */_updateScriptDataMapInAllScriptComponents(attributeName, newAttribute, scriptRecord[/* scriptAttributeMap */6])
  ];
  return newrecord;
}

function updateEventFunctionInAllScriptComponents(eventFunctionName, newEventFunctionData, engineState) {
  var scriptRecord = engineState[/* scriptRecord */25];
  var newrecord = Caml_array.caml_array_dup(engineState);
  newrecord[/* scriptRecord */25] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */_updateScriptDataMapInAllScriptComponents(eventFunctionName, newEventFunctionData, scriptRecord[/* scriptEventFunctionDataMap */5]),
    /* scriptAttributeMap */scriptRecord[/* scriptAttributeMap */6]
  ];
  return newrecord;
}

function _removeScriptDataMapInAllScriptComponents(dataName, scriptDataMap) {
  return ImmutableSparseMapService$WonderCommonlib.filterValid((function (dataMap) {
                return !ImmutableHashMapService$WonderCommonlib.has(dataName, dataMap);
              }), scriptDataMap);
}

function removeEventFunctionInAllScriptComponents(eventFunctionName, engineState) {
  var scriptRecord = engineState[/* scriptRecord */25];
  var newrecord = Caml_array.caml_array_dup(engineState);
  newrecord[/* scriptRecord */25] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */_removeScriptDataMapInAllScriptComponents(eventFunctionName, scriptRecord[/* scriptEventFunctionDataMap */5]),
    /* scriptAttributeMap */scriptRecord[/* scriptAttributeMap */6]
  ];
  return newrecord;
}

function removeAttributeInAllScriptComponents(attributeName, engineState) {
  var scriptRecord = engineState[/* scriptRecord */25];
  var newrecord = Caml_array.caml_array_dup(engineState);
  newrecord[/* scriptRecord */25] = /* record */[
    /* index */scriptRecord[/* index */0],
    /* isScriptEventFunctionEnable */scriptRecord[/* isScriptEventFunctionEnable */1],
    /* disposedIndexArray */scriptRecord[/* disposedIndexArray */2],
    /* gameObjectMap */scriptRecord[/* gameObjectMap */3],
    /* isActiveMap */scriptRecord[/* isActiveMap */4],
    /* scriptEventFunctionDataMap */scriptRecord[/* scriptEventFunctionDataMap */5],
    /* scriptAttributeMap */_removeScriptDataMapInAllScriptComponents(attributeName, scriptRecord[/* scriptAttributeMap */6])
  ];
  return newrecord;
}

function getAllScriptsWithAttribute(engineState) {
  var scriptRecord = engineState[/* scriptRecord */25];
  return ImmutableSparseMapService$WonderCommonlib.getValidKeys(scriptRecord[/* scriptAttributeMap */6]);
}

function replaceAttributeInAllScriptComponents(param, newAttribute, engineState) {
  var newAttributeName = param[1];
  var oldAttributeName = param[0];
  return ArrayService$WonderCommonlib.reduceOneParam((function (engineState, script) {
                return ScriptAPI$Wonderjs.replaceScriptAttribute(script, /* tuple */[
                            oldAttributeName,
                            newAttributeName
                          ], newAttribute, engineState);
              }), engineState, getAllScriptsWithAttribute(engineState));
}

var create = ScriptAPI$Wonderjs.createScript;

var unsafeGetScriptGameObject = ScriptAPI$Wonderjs.unsafeGetScriptGameObject;

var addScriptEventFunctionData = ScriptAPI$Wonderjs.addScriptEventFunctionData;

var removeScriptEventFunctionData = ScriptAPI$Wonderjs.removeScriptEventFunctionData;

var replaceScriptEventFunctionData = ScriptAPI$Wonderjs.replaceScriptEventFunctionData;

var getScriptEventFunctionDataEntries = OperateScriptDataMainService$Wonderjs.getScriptEventFunctionDataEntries;

var unsafeGetScriptEventFunctionDataEntries = ScriptAPI$Wonderjs.unsafeGetScriptEventFunctionDataEntries;

var addScriptAttribute = ScriptAPI$Wonderjs.addScriptAttribute;

var removeScriptAttribute = ScriptAPI$Wonderjs.removeScriptAttribute;

var replaceScriptAttribute = ScriptAPI$Wonderjs.replaceScriptAttribute;

var getScriptAttributeEntries = OperateScriptDataMainService$Wonderjs.getScriptAttributeEntries;

var unsafeGetScriptAttributeEntries = ScriptAPI$Wonderjs.unsafeGetScriptAttributeEntries;

var unsafeGetScriptAttribute = ScriptAPI$Wonderjs.unsafeGetScriptAttribute;

var unsafeGetScriptAttributeFieldDefaultValue = ScriptAPI$Wonderjs.unsafeGetScriptAttributeFieldDefaultValue;

var setScriptAttributeFieldDefaultValueAndValue = ScriptAPI$Wonderjs.setScriptAttributeFieldDefaultValueAndValue;

export {
  create ,
  unsafeGetScriptGameObject ,
  addScriptEventFunctionData ,
  removeScriptEventFunctionData ,
  replaceScriptEventFunctionData ,
  getScriptEventFunctionDataEntries ,
  unsafeGetScriptEventFunctionDataEntries ,
  addScriptAttribute ,
  removeScriptAttribute ,
  replaceScriptAttribute ,
  getScriptAttributeEntries ,
  unsafeGetScriptAttributeEntries ,
  unsafeGetScriptAttribute ,
  unsafeGetScriptAttributeFieldDefaultValue ,
  setScriptAttributeFieldDefaultValueAndValue ,
  getScriptAllEventFunctionEntries ,
  hasScriptEventFunctionData ,
  getScriptAllAttributeEntries ,
  hasScriptAttributeData ,
  _replaceScriptDataByEntriesMap ,
  replaceScriptEventFunctionDataByEntriesMap ,
  replaceScriptAttributeByEntriesMap ,
  _updateScriptDataMapInAllScriptComponents ,
  updateAttributeInAllScriptComponents ,
  updateEventFunctionInAllScriptComponents ,
  _removeScriptDataMapInAllScriptComponents ,
  removeEventFunctionInAllScriptComponents ,
  removeAttributeInAllScriptComponents ,
  getAllScriptsWithAttribute ,
  replaceAttributeInAllScriptComponents ,
  
}
/* ScriptAPI-Wonderjs Not a pure module */
