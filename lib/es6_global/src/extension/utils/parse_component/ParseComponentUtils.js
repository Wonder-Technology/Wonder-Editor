

import * as React from "react";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as LogUtils$WonderEditor from "../../../core/utils/console/LogUtils.js";
import * as DomHelper$WonderEditor from "../../../core/external/DomHelper.js";
import * as ArrayService$WonderEditor from "../../../service/atom/ArrayService.js";
import * as HashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/HashMapService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as CustomAtomParseUtils$WonderEditor from "../../config/utils/atom_component/CustomAtomParseUtils.js";
import * as BuildAtomComponentUtils$WonderEditor from "../build_component/BuildAtomComponentUtils.js";
import * as ExistAtomAttributeParseUtils$WonderEditor from "../../config/utils/atom_component/ExistAtomAttributeParseUtils.js";

function _getUniqueAtomAttribute(atomName) {
  var atomAttributeArr = ExistAtomAttributeParseUtils$WonderEditor.getAtomAttributeRecord(/* () */0).filter((function (atom) {
          return atom[/* name */0] === atomName;
        }));
  var match = atomAttributeArr.length;
  if (match !== 0) {
    return /* Match */[atomAttributeArr[0]];
  } else {
    Log$WonderLog.error(LogUtils$WonderEditor.buildErrorMessage("the specific atom : " + (String(atomName) + " not exist"), "", "check extension->panelExtension->render->" + (String(atomName) + " should correct "), "atom name: " + (String(atomName) + "")));
    return /* NoMatch */0;
  }
}

function _findUniquePropArrayByAtomName(atomName, propArray) {
  return Contract$WonderLog.ensureCheck((function (r) {
                var len = r.length;
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("propArray\'s length <= 1", "is " + (String(len) + "")), (function (param) {
                              return Contract$WonderLog.Operators[/* <= */11](len, 1);
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), propArray.filter((function (props) {
                    return props[/* name */0] === atomName;
                  })));
}

function _getUniqueMapByComponentName(state, uiComponentName) {
  var match = state[/* mapState */2][/* componentsMap */0];
  if (match !== undefined) {
    var match$1 = HashMapService$WonderCommonlib.get(uiComponentName, Caml_option.valFromOption(match));
    if (match$1 !== undefined) {
      return Caml_option.valFromOption(match$1);
    } else {
      return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("can\'t find " + (String(uiComponentName) + " in appState->mapState->componentsMap"), "", "", "uiComponentName:" + (String(uiComponentName) + "")));
    }
  } else {
    return Log$WonderLog.fatal(LogUtils$WonderEditor.buildFatalMessage("appState->mapState->componentsMap is none", "", "", "uiComponentName:" + (String(uiComponentName) + "")));
  }
}

function _createArgumentArray(uiComponentName, state, prop) {
  var type_ = prop[/* type_ */2];
  var value = prop[/* value */1];
  var name = prop[/* name */0];
  switch (type_) {
    case "function" : 
        var match = HashMapService$WonderCommonlib.get(value, _getUniqueMapByComponentName(state, uiComponentName));
        if (match !== undefined) {
          return Caml_option.some(Caml_option.valFromOption(match));
        } else {
          Log$WonderLog.error(LogUtils$WonderEditor.buildErrorMessage("the specific function " + (String(name) + (" : " + (String(value) + " not exist in appState->mapState->componentsMap"))), "", "check extension:" + (String(uiComponentName) + ("->panelExtension->render->(" + (String(prop) + (")->" + (String(value) + " should exist in methodExtension"))))), "name: " + (String(name) + (", value: " + (String(value) + "")))));
          return undefined;
        }
    case "string" : 
        return Caml_option.some(value);
    default:
      Log$WonderLog.error(LogUtils$WonderEditor.buildErrorMessage("the specific type : " + (String(type_) + " not exist in atomComponent\'s propArray"), "", "check extension:" + (String(uiComponentName) + ("->panelExtension->render->(" + (String(prop) + (")->" + (String(type_) + " should correct"))))), "type: " + (String(type_) + "")));
      return undefined;
  }
}

function _matchRecordProp(uiComponentName, state, component, atomName) {
  var propArray = _findUniquePropArrayByAtomName(atomName, component[/* props */2]);
  var match = propArray.length;
  if (match !== 0) {
    return _createArgumentArray(uiComponentName, state, ArrayService$WonderEditor.unsafeGetFirst(propArray));
  }
  
}

function _buildComponentArgumentArr(uiComponentName, state, component, atomAttribute) {
  if (atomAttribute) {
    return atomAttribute[0][/* existProps */1].map((function (prop) {
                  return _matchRecordProp(uiComponentName, state, component, prop[/* name */0]);
                }));
  } else {
    return /* array */[];
  }
}

function _buildComponentWithArgument(component, argumentArray) {
  var reactElement = BuildAtomComponentUtils$WonderEditor.buildComponentByName(component[/* name */0], argumentArray);
  return React.createElement("div", {
              key: DomHelper$WonderEditor.getRandomKey(/* () */0),
              className: component[/* className */1]
            }, reactElement);
}

function _parseSystem(uiComponentName, state, atomComponent) {
  return _buildComponentWithArgument(atomComponent, _buildComponentArgumentArr(uiComponentName, state, atomComponent, _getUniqueAtomAttribute(atomComponent[/* name */0])));
}

function buildSpecificComponents(jsonData, uiComponentName, state) {
  return CustomAtomParseUtils$WonderEditor.convertDataToRecord(jsonData).map((function (atomComponent) {
                return _parseSystem(uiComponentName, state, atomComponent);
              }));
}

export {
  _getUniqueAtomAttribute ,
  _findUniquePropArrayByAtomName ,
  _getUniqueMapByComponentName ,
  _createArgumentArray ,
  _matchRecordProp ,
  _buildComponentArgumentArr ,
  _buildComponentWithArgument ,
  _parseSystem ,
  buildSpecificComponents ,
  
}
/* react Not a pure module */
