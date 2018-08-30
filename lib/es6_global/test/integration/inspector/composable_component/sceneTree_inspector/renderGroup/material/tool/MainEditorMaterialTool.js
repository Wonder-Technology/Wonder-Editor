

import * as Pervasives from "../../../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as ArrayService$WonderEditor from "../../../../../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../../../../../tool/ui/BaseEventTool.js";
import * as InspectorTool$WonderEditor from "../../../../../../../tool/ui/InspectorTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../../tool/BuildComponentTool.js";
import * as BasicMaterialEventTool$WonderEditor from "../../../../../../../tool/BasicMaterialEventTool.js";

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.getNth(index, array);
}

function triggerChangeMaterialTypeEvent(value, domChildren) {
  var selectDiv = ArrayService$WonderEditor.getNth(1, domChildren);
  var array = selectDiv.children;
  var selectArticle = ArrayService$WonderEditor.getNth(0, array);
  var array$1 = selectArticle.children;
  var select = ArrayService$WonderEditor.getNth(1, array$1);
  return BaseEventTool$WonderEditor.triggerChangeEvent(select, BaseEventTool$WonderEditor.buildFormEvent(String(value)));
}

function setMaterialTypeToBeBaiscMaterial() {
  return BaseEventTool$WonderEditor.triggerComponentEvent(BuildComponentTool$WonderEditor.buildMaterial(/* () */0), (function (param) {
                return triggerChangeMaterialTypeEvent(/* BasicMaterial */0, param);
              }));
}

function triggerFileDragStartEvent(index) {
  var assetComponent = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
  return BaseEventTool$WonderEditor.triggerComponentEvent(assetComponent, (function (param) {
                return BasicMaterialEventTool$WonderEditor.triggerFileDragStartEvent(index, param);
              }));
}

function triggerTextureRemoveClickEvent() {
  var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
  return BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, BasicMaterialEventTool$WonderEditor.triggerRemoveTextureClickEvent);
}

function triggerTextureDragEvent() {
  var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
  BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, BasicMaterialEventTool$WonderEditor.triggerTextureDragEnterEvent);
  return BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, BasicMaterialEventTool$WonderEditor.triggerTextureDragDropEvent);
}

function triggerDragTextureLeaveGameObjectMaterial() {
  var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
  BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, BasicMaterialEventTool$WonderEditor.triggerTextureDragEnterEvent);
  return BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, BasicMaterialEventTool$WonderEditor.triggerTextureDragLeaveEvent);
}

function triggerDragTextureToGameObjectMaterial() {
  var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
  BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, BasicMaterialEventTool$WonderEditor.triggerTextureDragEnterEvent);
  return BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, BasicMaterialEventTool$WonderEditor.triggerTextureDragDropEvent);
}

function _getShininessInput(domChildren) {
  var article = ArrayService$WonderEditor.getNth(2, domChildren);
  var array = article.children;
  var inputArticle = ArrayService$WonderEditor.getNth(0, array);
  return inputArticle.children[1];
}

function triggerShininessChangeEvent(value, domChildren) {
  var input = _getShininessInput(domChildren);
  return BaseEventTool$WonderEditor.triggerChangeEvent(input, BaseEventTool$WonderEditor.buildFormEvent(Pervasives.string_of_float(value)));
}

function triggerShininessBlurEvent(value, domChildren) {
  var input = _getShininessInput(domChildren);
  return BaseEventTool$WonderEditor.triggerBlurEvent(input, BaseEventTool$WonderEditor.buildFormEvent(Pervasives.string_of_float(value)));
}

export {
  _getFromArray ,
  triggerChangeMaterialTypeEvent ,
  setMaterialTypeToBeBaiscMaterial ,
  triggerFileDragStartEvent ,
  triggerTextureRemoveClickEvent ,
  triggerTextureDragEvent ,
  triggerDragTextureLeaveGameObjectMaterial ,
  triggerDragTextureToGameObjectMaterial ,
  _getShininessInput ,
  triggerShininessChangeEvent ,
  triggerShininessBlurEvent ,
  
}
/* TestTool-WonderEditor Not a pure module */
