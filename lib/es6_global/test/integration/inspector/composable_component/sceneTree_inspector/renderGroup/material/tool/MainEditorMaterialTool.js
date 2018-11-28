

import * as Pervasives from "../../../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as TestTool$WonderEditor from "../../../../../../../tool/TestTool.js";
import * as ArrayService$WonderEditor from "../../../../../../../../src/service/atom/ArrayService.js";
import * as BaseEventTool$WonderEditor from "../../../../../../../tool/ui/BaseEventTool.js";
import * as InspectorTool$WonderEditor from "../../../../../../../tool/ui/InspectorTool.js";
import * as MaterialEventTool$WonderEditor from "../../../../../../../tool/MaterialEventTool.js";
import * as BuildComponentTool$WonderEditor from "../../../../../../../tool/BuildComponentTool.js";

function _getFromArray(array, index) {
  return ArrayService$WonderEditor.unsafeGetNth(index, array);
}

function triggerChangeMaterialTypeEvent(value, domChildren) {
  var selectDiv = ArrayService$WonderEditor.unsafeGetNth(1, domChildren);
  var array = selectDiv.children;
  var selectArticle = ArrayService$WonderEditor.unsafeGetNth(0, array);
  var array$1 = selectArticle.children;
  var select = ArrayService$WonderEditor.unsafeGetNth(1, array$1);
  return BaseEventTool$WonderEditor.triggerChangeEvent(select, BaseEventTool$WonderEditor.buildFormEvent(String(value)));
}

function triggerFileDragStartEvent(index) {
  var assetComponent = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
  return BaseEventTool$WonderEditor.triggerComponentEvent(assetComponent, (function (param) {
                return MaterialEventTool$WonderEditor.triggerFileDragStartEvent(index, param);
              }));
}

function triggerTextureRemoveClickEvent() {
  var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
  return BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, MaterialEventTool$WonderEditor.triggerRemoveTextureClickEvent);
}

function triggerTextureDragEvent() {
  var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
  BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, MaterialEventTool$WonderEditor.triggerTextureDragEnterEvent);
  return BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, MaterialEventTool$WonderEditor.triggerTextureDragDropEvent);
}

function triggerDragTextureLeaveGameObjectMaterial() {
  var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
  BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, MaterialEventTool$WonderEditor.triggerTextureDragEnterEvent);
  return BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, MaterialEventTool$WonderEditor.triggerTextureDragLeaveEvent);
}

function triggerDragTextureToGameObjectMaterialWithSceneTreeInspectorDomIndex(sceneTreeInspectorDomIndex) {
  var inspectorComponent = BuildComponentTool$WonderEditor.buildInspectorComponent(TestTool$WonderEditor.buildEmptyAppState(/* () */0), InspectorTool$WonderEditor.buildFakeAllShowComponentConfig(/* () */0));
  BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
          return MaterialEventTool$WonderEditor.triggerTextureDragEnterEventWithSceneTreeInspectorDomIndex(sceneTreeInspectorDomIndex, param);
        }));
  return BaseEventTool$WonderEditor.triggerComponentEvent(inspectorComponent, (function (param) {
                return MaterialEventTool$WonderEditor.triggerTextureDragDropEventWithSceneTreeInspectorDomIndex(sceneTreeInspectorDomIndex, param);
              }));
}

function triggerDragTextureToGameObjectMaterial() {
  return triggerDragTextureToGameObjectMaterialWithSceneTreeInspectorDomIndex(3);
}

function _getShininessInput(domChildren) {
  var article = ArrayService$WonderEditor.unsafeGetNth(2, domChildren);
  var array = article.children;
  var inputArticle = ArrayService$WonderEditor.unsafeGetNth(0, array);
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
  triggerFileDragStartEvent ,
  triggerTextureRemoveClickEvent ,
  triggerTextureDragEvent ,
  triggerDragTextureLeaveGameObjectMaterial ,
  triggerDragTextureToGameObjectMaterialWithSceneTreeInspectorDomIndex ,
  triggerDragTextureToGameObjectMaterial ,
  _getShininessInput ,
  triggerShininessChangeEvent ,
  triggerShininessBlurEvent ,
  
}
/* TestTool-WonderEditor Not a pure module */
