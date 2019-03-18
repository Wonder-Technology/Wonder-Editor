

import * as List from "../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as AssetTool$WonderImgui from "../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/AssetTool.js";
import * as CanvasTool$WonderEditor from "../atom_component/canvas/tool/CanvasTool.js";
import * as SerializeService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/atom/SerializeService.js";
import * as OptionService$WonderEditor from "../../../src/service/primitive/OptionService.js";
import * as RenderIMGUITool$WonderImgui from "../../../../../node_modules/wonder-imgui/lib/es6_global/test/integration/tool/RenderIMGUITool.js";
import * as TestToolEngine$WonderEditor from "../../tool/engine/TestToolEngine.js";
import * as IMGUIEditorService$WonderEditor from "../../../src/service/state/editor/imgui/IMGUIEditorService.js";
import * as RecordIMGUIMainService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/imgui/RecordIMGUIMainService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/state/StateEngineService.js";
import * as ManageIMGUIEngineService$WonderEditor from "../../../src/service/state/engine/ManageIMGUIEngineService.js";

function unsafeGetIMGUIFuncStr(engineState) {
  return SerializeService$Wonderjs.serializeFunction(OptionService$WonderEditor.unsafeGet(ManageIMGUIEngineService$WonderEditor.getIMGUIFunc(engineState)));
}

function unsafeGetIMGUIFuncStrFromEditorState(editorState) {
  return SerializeService$Wonderjs.serializeFunction(IMGUIEditorService$WonderEditor.unsafeGetGameViewIMGUIFunc(editorState));
}

var getCustomData = ManageIMGUIEngineService$WonderEditor.getCustomData;

function containMultiline(source, targetLineArray) {
  return List.for_all((function (targetLine) {
                return source.includes(targetLine.trim());
              }), targetLineArray);
}

function prepareFntData(engineState) {
  var newrecord = Caml_array.caml_array_dup(engineState);
  var init = engineState[/* imguiRecord */41];
  newrecord[/* imguiRecord */41] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetIMGUIFuncInRenderWorkerForWorker */init[/* isSetIMGUIFuncInRenderWorkerForWorker */1],
    /* wonderImguiIMGUIRecord */RenderIMGUITool$WonderImgui.prepareFntData(RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(engineState))
  ];
  return newrecord;
}

function prepareImgui(param) {
  var prepareFontAsset = function (engineState) {
    var newrecord = Caml_array.caml_array_dup(engineState);
    var init = engineState[/* imguiRecord */41];
    newrecord[/* imguiRecord */41] = /* record */[
      /* ioData */init[/* ioData */0],
      /* isSetIMGUIFuncInRenderWorkerForWorker */init[/* isSetIMGUIFuncInRenderWorkerForWorker */1],
      /* wonderImguiIMGUIRecord */AssetTool$WonderImgui.prepareFontAsset(engineState[/* imguiRecord */41][/* wonderImguiIMGUIRecord */2])
    ];
    return newrecord;
  };
  StateEngineService$WonderEditor.setState(prepareFontAsset(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return TestToolEngine$WonderEditor.initEngineState(/* () */0);
}

function stubCanvasParentAndCanvas(sandbox) {
  var match = CanvasTool$WonderEditor.stubCanvasParentAndCanvas(sandbox, undefined, undefined, /* () */0);
  prepareImgui(/* () */0);
  return /* tuple */[
          match[0],
          match[1]
        ];
}

export {
  unsafeGetIMGUIFuncStr ,
  unsafeGetIMGUIFuncStrFromEditorState ,
  getCustomData ,
  containMultiline ,
  prepareFntData ,
  prepareImgui ,
  stubCanvasParentAndCanvas ,
  
}
/* AssetTool-WonderImgui Not a pure module */
