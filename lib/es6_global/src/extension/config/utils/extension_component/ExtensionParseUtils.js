

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ReasonReact from "../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Js_primitive from "../../../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as Log$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as DomHelper$WonderEditor from "../../../../core/external/DomHelper.js";
import * as OptionService$WonderEditor from "../../../../service/primitive/OptionService.js";
import * as PanelExtension$WonderEditor from "../../../../core/atom_component/panelExtension/PanelExtension.js";
import * as ComponentMapUtils$WonderEditor from "../../../utils/parse_component/ComponentMapUtils.js";
import * as ExtensionParseType$WonderEditor from "../../data/extension_component/ExtensionParseType.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as ExtensionMethodMapUtils$WonderEditor from "./ExtensionMethodMapUtils.js";

var func = ( function(extensionText) {
    return (new Function(extensionText))();
  }
  );

function _getExtensionName(extensionRecord) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("the extension name exist", "not"), (function () {
                        return Contract$WonderLog.assertFalse((extensionRecord[/* name */2] == null));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return OptionService$WonderEditor.unsafeGet(Js_primitive.null_undefined_to_opt(extensionRecord[/* name */2]));
}

function _getExtensionMethods(extensionRecord) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("the extension->methodExtension exist", "not"), (function () {
                        return Contract$WonderLog.assertFalse((extensionRecord[/* methodExtension */1] == null));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return OptionService$WonderEditor.unsafeGet(Js_primitive.null_undefined_to_opt(extensionRecord[/* methodExtension */1]));
}

function _getExtensionPanels(extensionRecord) {
  Contract$WonderLog.requireCheck((function () {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("the extension panelExtension exist", "not"), (function () {
                        return Contract$WonderLog.assertFalse((extensionRecord[/* methodExtension */1] == null));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  return OptionService$WonderEditor.unsafeGet(Js_primitive.null_undefined_to_opt(extensionRecord[/* panelExtension */0]));
}

function createComponentMap(extensionText) {
  var extensionRecord = ExtensionParseType$WonderEditor.tFromJs(Curry._1(func, extensionText));
  return ComponentMapUtils$WonderEditor.addExtensionMap(ComponentMapUtils$WonderEditor.createComponentMap(/* () */0), _getExtensionName(extensionRecord), ExtensionMethodMapUtils$WonderEditor.createExtensionMap(_getExtensionMethods(extensionRecord)));
}

function extensionPanelComponent(componentName, extensionText, store) {
  var extensionRecord = ExtensionParseType$WonderEditor.tFromJs(Curry._1(func, extensionText));
  var panelArray = _getExtensionPanels(extensionRecord).map((function (panel) {
            return panel;
          })).filter((function (panel) {
          return panel.parent === componentName;
        }));
  var len = panelArray.length;
  if (len !== 0) {
    return panelArray.map((function (panelObj) {
                    var extensionObj = panelObj;
                    return /* record */[
                            /* name */extensionObj.name,
                            /* parent */extensionObj.parent,
                            /* render */extensionObj.render,
                            /* initialState */extensionObj.initialState,
                            /* willRender */extensionObj.willRender,
                            /* didMount */extensionObj.didMount
                          ];
                  })).map((function (record) {
                  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, PanelExtension$WonderEditor.make(record, _getExtensionName(extensionRecord), store, /* array */[]));
                }));
  } else {
    return /* array */[];
  }
}

export {
  createComponentMap ,
  extensionPanelComponent ,
  
}
/* func Not a pure module */
