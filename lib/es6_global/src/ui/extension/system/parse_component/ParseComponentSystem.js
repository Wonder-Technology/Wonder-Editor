'use strict';

import * as $$Array                               from "../../../../../../../node_modules/bs-platform/lib/es6/array.js";
import * as React                                 from "react";
import * as Log$WonderLog                         from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog                    from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as DomHelper$WonderEditor                from "../../../../external/DomHelper.js";
import * as AtomParseSystem$WonderEditor          from "../../data/atom_component/AtomParseSystem.js";
import * as HashMapSystem$WonderCommonlib         from "../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapSystem.js";
import * as OperateArrayUtils$WonderEditor        from "../../../../component/utils/OperateArrayUtils.js";
import * as EditorStateDataEdit$WonderEditor      from "../../../../logic/edit/EditorStateDataEdit.js";
import * as AtomAttributeParseSystem$WonderEditor from "../../data/atom_component/AtomAttributeParseSystem.js";
import * as BuildAtomComponentSystem$WonderEditor from "../build_component/BuildAtomComponentSystem.js";

function _getUniqueAtomAttribute(atomName) {
  var atomAttributeArr = AtomAttributeParseSystem$WonderEditor.getAtomAttributeRecord(/* () */0).filter((function (atom) {
          return +(atom[/* name */0] === atomName);
        }));
  var match = atomAttributeArr.length;
  if (match !== 0) {
    return /* Match */[atomAttributeArr[0]];
  } else {
    Log$WonderLog.error(Log$WonderLog.buildErrorMessage("_getUniqueAtomAttribute", "the specific atom : " + (String(atomName) + " not exist"), "", "check extension->panelExtension->render->" + (String(atomName) + " should correct "), "atom name: " + (String(atomName) + "")));
    return /* NoMatch */0;
  }
}

function _findUniquePropArrayByAtomName(atomName, propArray) {
  return Contract$WonderLog.ensureCheck((function (r) {
                var len = r.length;
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("propArray\'s length <= 1", "is " + (String(len) + "")), (function () {
                              return Contract$WonderLog.Operators[/* <= */11](len, 1);
                            }));
              }), EditorStateDataEdit$WonderEditor.getStateIsDebug(/* () */0), propArray.filter((function (props) {
                    return +(props[/* name */0] === atomName);
                  })));
}

function _getUniqueMapByComponentName(state, uiComponentName) {
  var match = state[/* mapState */2][/* componentsMap */0];
  if (match) {
    var match$1 = HashMapSystem$WonderCommonlib.get(uiComponentName, match[0]);
    if (match$1) {
      return match$1[0];
    } else {
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getUniqueMapByComponentName", "can\'t find " + (String(uiComponentName) + " in appState->mapState->componentsMap"), "", "", "uiComponentName:" + (String(uiComponentName) + "")));
    }
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_getUniqueMapByComponentName", "appState->mapState->componentsMap is none", "", "", "uiComponentName:" + (String(uiComponentName) + "")));
  }
}

function _createArgumentArray(uiComponentName, state, prop) {
  var type_ = prop[/* type_ */2];
  var value = prop[/* value */1];
  var name = prop[/* name */0];
  switch (type_) {
    case "function" : 
        var match = HashMapSystem$WonderCommonlib.get(value, _getUniqueMapByComponentName(state, uiComponentName));
        if (match) {
          return /* Some */[match[0]];
        } else {
          Log$WonderLog.error(Log$WonderLog.buildErrorMessage("_createArgumentArray", "the specific function " + (String(name) + (" : " + (String(value) + " not exist in appState->mapState->componentsMap"))), "", "check extension:" + (String(uiComponentName) + ("->panelExtension->render->(" + (String(prop) + (")->" + (String(value) + " should exist in methodExtension"))))), "name: " + (String(name) + (", value: " + (String(value) + "")))));
          return /* None */0;
        }
    case "string" : 
        return /* Some */[value];
    default:
      Log$WonderLog.error(Log$WonderLog.buildErrorMessage("_createArgumentArray", "the specific type : " + (String(type_) + " not exist in atomComponent\'s propArray"), "", "check extension:" + (String(uiComponentName) + ("->panelExtension->render->(" + (String(prop) + (")->" + (String(type_) + " should correct"))))), "type: " + (String(type_) + "")));
      return /* None */0;
  }
}

function _matchRecordProp(uiComponentName, state, component, atomName) {
  var propArray = _findUniquePropArrayByAtomName(atomName, component[/* props */2]);
  var match = propArray.length;
  if (match !== 0) {
    return _createArgumentArray(uiComponentName, state, OperateArrayUtils$WonderEditor.getFirst(propArray));
  } else {
    return /* None */0;
  }
}

function _buildComponentArgumentArr(uiComponentName, state, component, atomAttribute) {
  if (atomAttribute) {
    return $$Array.map((function (prop) {
                  return _matchRecordProp(uiComponentName, state, component, prop[/* name */0]);
                }), atomAttribute[0][/* existProps */1]);
  } else {
    return /* array */[];
  }
}

function _buildComponentWithArgument(component, argumentArray) {
  var reactElement = BuildAtomComponentSystem$WonderEditor.buildComponentByName(component[/* name */0], argumentArray);
  return React.createElement("div", {
              key: DomHelper$WonderEditor.getRandomKey(/* () */0),
              className: component[/* className */1]
            }, reactElement);
}

function _parseSystem(uiComponentName, state, atomComponent) {
  return _buildComponentWithArgument(atomComponent, _buildComponentArgumentArr(uiComponentName, state, atomComponent, _getUniqueAtomAttribute(atomComponent[/* name */0])));
}

function buildSpecificComponents(jsonData, uiComponentName, state) {
  return $$Array.map((function (atomComponent) {
                return _parseSystem(uiComponentName, state, atomComponent);
              }), AtomParseSystem$WonderEditor.convertDataToRecord(jsonData));
}

export {
  _getUniqueAtomAttribute        ,
  _findUniquePropArrayByAtomName ,
  _getUniqueMapByComponentName   ,
  _createArgumentArray           ,
  _matchRecordProp               ,
  _buildComponentArgumentArr     ,
  _buildComponentWithArgument    ,
  _parseSystem                   ,
  buildSpecificComponents        ,
  
}
/* react Not a pure module */
