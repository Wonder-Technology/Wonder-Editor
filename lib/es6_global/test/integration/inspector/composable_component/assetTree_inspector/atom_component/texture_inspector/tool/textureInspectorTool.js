

import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as ArrayService$WonderEditor from "../../../../../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../../../../../tool/ui/BaseEventTool.js";
import * as InspectorTool$WonderEditor from "../../../../../../../tool/ui/InspectorTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetTextureNodeMapEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/asset/AssetTextureNodeMapEditorService.js";
import * as AssetCurrentNodeDataEditorService$WonderEditor from "../../../../../../../../src/service/state/editor/asset/AssetCurrentNodeDataEditorService.js";

function getWrapSDomIndex() {
  return 3;
}

function getWrapTDomIndex() {
  return 4;
}

function getMagFilterDomIndex() {
  return 5;
}

function getMinFilterDomIndex() {
  return 6;
}

function getWrapRepeatType() {
  return /* Repeat */2;
}

function getWrapMirroredRepeatType() {
  return /* Mirrored_repeat */1;
}

function getFilterLinearMipmapLinearType() {
  return /* Linear_mipmap_linear */5;
}

function getFilterNearestMipmapLinearType() {
  return /* Nearest_mipmap_linear */4;
}

function getTextureIndexFromCurrentNodeData() {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  return SparseMapService$WonderCommonlib.unsafeGet(AssetCurrentNodeDataEditorService$WonderEditor.unsafeGetCurrentNodeData(editorState)[/* currentNodeId */0], AssetTextureNodeMapEditorService$WonderEditor.getTextureNodeMap(editorState))[/* textureIndex */0];
}

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.getNth(index, array);
}

function _getTriggerRenameInput(domChildren) {
  var article = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = article.children;
  var texArticle = ArrayService$WonderEditor.getNth(0, array);
  var array$1 = texArticle.children;
  var div = ArrayService$WonderEditor.getNth(0, array$1);
  var array$2 = div.children;
  var renameDiv = ArrayService$WonderEditor.getNth(2, array$2);
  var array$3 = renameDiv.children;
  var renameArticle = ArrayService$WonderEditor.getNth(0, array$3);
  var array$4 = renameArticle.children;
  return ArrayService$WonderEditor.getNth(1, array$4);
}

function triggerChangeRenameEvent(value, domChildren) {
  var input = _getTriggerRenameInput(domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerBlurRenameEvent(value, domChildren) {
  var input = _getTriggerRenameInput(domChildren);
  return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerChangeWrapEvent(index, value, domChildren) {
  var article = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = article.children;
  var textureArticle = ArrayService$WonderEditor.getNth(0, array);
  var array$1 = textureArticle.children;
  var div = ArrayService$WonderEditor.getNth(0, array$1);
  var array$2 = div.children;
  var selectDiv = ArrayService$WonderEditor.getNth(index, array$2);
  var array$3 = selectDiv.children;
  var selectArticle = ArrayService$WonderEditor.getNth(0, array$3);
  var array$4 = selectArticle.children;
  var select = ArrayService$WonderEditor.getNth(1, array$4);
  return BaseEventTool$WonderEditor.triggerChangeEvent(select, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerChangeFilterEvent(index, value, domChildren) {
  var article = ArrayService$WonderEditor.getNth(0, domChildren);
  var array = article.children;
  var textureArticle = ArrayService$WonderEditor.getNth(0, array);
  var array$1 = textureArticle.children;
  var div = ArrayService$WonderEditor.getNth(0, array$1);
  var array$2 = div.children;
  var selectDiv = ArrayService$WonderEditor.getNth(index, array$2);
  var array$3 = selectDiv.children;
  var selectArticle = ArrayService$WonderEditor.getNth(0, array$3);
  var array$4 = selectArticle.children;
  var select = ArrayService$WonderEditor.getNth(1, array$4);
  return BaseEventTool$WonderEditor.triggerChangeEvent(select, BaseEventTool$WonderEditor.buildFormEvent(value));
}

function triggerInspectorRenameEvent(newName) {
  var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
  BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
          return triggerChangeRenameEvent(newName, param);
        }));
  return BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                return triggerBlurRenameEvent(newName, param);
              }));
}

function triggerInspectorChangeWrapEvent(wrapIndex, type_) {
  var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
  var partial_arg = String(type_);
  return BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                return triggerChangeWrapEvent(wrapIndex, partial_arg, param);
              }));
}

function triggerInspectorChangeFilterEvent(index, type_) {
  var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
  var partial_arg = String(type_);
  return BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                return triggerChangeFilterEvent(index, partial_arg, param);
              }));
}

export {
  getWrapSDomIndex ,
  getWrapTDomIndex ,
  getMagFilterDomIndex ,
  getMinFilterDomIndex ,
  getWrapRepeatType ,
  getWrapMirroredRepeatType ,
  getFilterLinearMipmapLinearType ,
  getFilterNearestMipmapLinearType ,
  getTextureIndexFromCurrentNodeData ,
  _getFromArray ,
  _getTriggerRenameInput ,
  triggerChangeRenameEvent ,
  triggerBlurRenameEvent ,
  triggerChangeWrapEvent ,
  triggerChangeFilterEvent ,
  triggerInspectorRenameEvent ,
  triggerInspectorChangeWrapEvent ,
  triggerInspectorChangeFilterEvent ,
  
}
/* TestTool-WonderEditor Not a pure module */
