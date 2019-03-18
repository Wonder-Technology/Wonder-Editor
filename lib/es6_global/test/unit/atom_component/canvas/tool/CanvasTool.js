

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_option from "../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as TestTool$WonderEditor from "../../../../tool/TestTool.js";
import * as SinonTool$WonderEditor from "../../../../tool/SinonTool.js";
import * as MainEditor$WonderEditor from "../../../../../src/core/composable_component/mainEditor/ui/MainEditor.js";
import * as BaseEventTool$WonderEditor from "../../../../tool/ui/BaseEventTool.js";
import * as BuildCanvasTool$WonderEditor from "../../../../tool/BuildCanvasTool.js";
import * as AssetWidgetService$WonderEditor from "../../../../../src/service/record/editor/widget/AssetWidgetService.js";
import * as StateEditorService$WonderEditor from "../../../../../src/service/state/editor/StateEditorService.js";
import * as WDBNodeAssetService$WonderEditor from "../../../../../src/service/record/editor/asset/WDBNodeAssetService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";

function dragWDBAsset(wdbNodeId, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var uiState = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  if ($staropt$star$2 === undefined) {
    AssetWidgetService$WonderEditor.getWidget(/* () */0);
  }
  if ($staropt$star$4 !== undefined) {
    Caml_option.valFromOption($staropt$star$4);
  } else {
    document.createElement("img");
  }
  if ($staropt$star$5 !== undefined) {
    Caml_option.valFromOption($staropt$star$5);
  } else {
    BaseEventTool$WonderEditor.buildDragEvent();
  }
  var wdbGameObject = WDBNodeAssetService$WonderEditor.getWDBGameObject(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(wdbNodeId, StateEditorService$WonderEditor.getState(/* () */0)));
  return Curry._3(MainEditor$WonderEditor.Method[/* dragWDB */2], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, wdbGameObject);
}

var Drag = /* module */[/* dragWDBAsset */dragWDBAsset];

function stubCanvasParentAndCanvas(sandbox, $staropt$star, $staropt$star$1, param) {
  var offsetWidth = $staropt$star !== undefined ? $staropt$star : 300;
  var offsetHeight = $staropt$star$1 !== undefined ? $staropt$star$1 : 500;
  var parentDom = {
    offsetWidth: offsetWidth,
    offsetHeight: offsetHeight
  };
  var canvasDom = BuildCanvasTool$WonderEditor.getFakeCanvasDom("a", sandbox);
  var getElementStub = Curry._3(SinonTool$WonderEditor.createMethodStub, sandbox[0], document, "getElementById");
  Sinon.returns(parentDom, Sinon.withOneArg("canvasParent", getElementStub));
  Sinon.returns(canvasDom, Sinon.withOneArg("canvas", getElementStub));
  return /* tuple */[
          parentDom,
          canvasDom
        ];
}

export {
  Drag ,
  stubCanvasParentAndCanvas ,
  
}
/* Sinon Not a pure module */
