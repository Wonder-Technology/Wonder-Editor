'use strict';

import * as Curry                                 from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as ReasonReact                           from "../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Contract$WonderEditor                 from "../../../../definition/Contract.js";
import * as DomHelper$WonderEditor                from "../../../../external/DomHelper.js";
import * as PanelExtension$WonderEditor           from "../../../component/panelExtension/PanelExtension.js";
import * as ComponentMapSystem$WonderEditor       from "../../system/parse_component/ComponentMapSystem.js";
import * as ExtensionParseType$WonderEditor       from "./ExtensionParseType.js";
import * as ExtensionMethodMapSystem$WonderEditor from "./ExtensionMethodMapSystem.js";

var func = ( function(extensionText) {
    return (new Function(extensionText))();
  }
  );

function _getExtensionName(extensionRecord) {
  return Contract$WonderEditor.ensureCheck((function (r) {
                return Contract$WonderEditor.test("the name should exist", (function () {
                              return Contract$WonderEditor.assertExist(r === undefined ? /* None */0 : [r]);
                            }));
              }), extensionRecord[/* name */2]);
}

function _getExtensionMethods(extensionRecord) {
  return Contract$WonderEditor.ensureCheck((function (r) {
                return Contract$WonderEditor.test("the methodExtension should exist", (function () {
                              return Contract$WonderEditor.assertExist(r === undefined ? /* None */0 : [r]);
                            }));
              }), extensionRecord[/* methodExtension */1]);
}

function _getExtensionPanels(extensionRecord) {
  return Contract$WonderEditor.ensureCheck((function (r) {
                return Contract$WonderEditor.test("the panelExtension should exist", (function () {
                              return Contract$WonderEditor.assertExist(r === undefined ? /* None */0 : [r]);
                            }));
              }), extensionRecord[/* panelExtension */0]);
}

function createComponentMap(extensionText) {
  var extensionRecord = ExtensionParseType$WonderEditor.tFromJs(Curry._1(func, extensionText));
  return ComponentMapSystem$WonderEditor.addExtensionMap(ComponentMapSystem$WonderEditor.createComponentMap(/* () */0), _getExtensionName(extensionRecord), ExtensionMethodMapSystem$WonderEditor.createExtensionMap(_getExtensionMethods(extensionRecord)));
}

function extensionPanelComponent(componentName, extensionText, store) {
  var extensionRecord = ExtensionParseType$WonderEditor.tFromJs(Curry._1(func, extensionText));
  var panelArray = _getExtensionPanels(extensionRecord).map((function (panel) {
            return panel;
          })).filter((function (panel) {
          return +(panel.parent === componentName);
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
  createComponentMap      ,
  extensionPanelComponent ,
  
}
/* func Not a pure module */
