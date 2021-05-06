'use strict';

var List = require("bs-platform/lib/js/list.js");
var Caml_array = require("bs-platform/lib/js/caml_array.js");
var AssetTool$WonderImgui = require("wonder-imgui/lib/js/test/integration/tool/AssetTool.js");
var CanvasTool$WonderEditor = require("../atom_component/canvas/tool/CanvasTool.js");
var SerializeService$Wonderjs = require("wonder.js/lib/js/src/service/atom/SerializeService.js");
var RenderIMGUITool$WonderImgui = require("wonder-imgui/lib/js/test/integration/tool/RenderIMGUITool.js");
var TestToolEngine$WonderEditor = require("../../tool/engine/TestToolEngine.js");
var RecordIMGUIMainService$Wonderjs = require("wonder.js/lib/js/src/service/state/main/imgui/RecordIMGUIMainService.js");
var StateEngineService$WonderEditor = require("../../../src/service/state/engine/state/StateEngineService.js");
var ExecIMGUIEngineService$WonderEditor = require("../../../src/service/state/engine/imgui/ExecIMGUIEngineService.js");

function unsafeGetIMGUIFuncStr(name, engineState) {
  return SerializeService$Wonderjs.serializeFunction(ExecIMGUIEngineService$WonderEditor.getExecFunc(name, engineState));
}

var getCustomData = ExecIMGUIEngineService$WonderEditor.getCustomData;

function containMultiline(source, targetLineArray) {
  return List.for_all((function (targetLine) {
                return source.includes(targetLine.trim());
              }), targetLineArray);
}

function prepareFntData(engineState) {
  var newrecord = Caml_array.caml_array_dup(engineState);
  var init = engineState[/* imguiRecord */44];
  newrecord[/* imguiRecord */44] = /* record */[
    /* ioData */init[/* ioData */0],
    /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
    /* extendData */init[/* extendData */2],
    /* wonderImguiIMGUIRecord */RenderIMGUITool$WonderImgui.prepareFntData(RecordIMGUIMainService$Wonderjs.getWonderIMGUIRecord(engineState))
  ];
  return newrecord;
}

function prepareImgui(param) {
  var prepareFontAsset = function (engineState) {
    var newrecord = Caml_array.caml_array_dup(engineState);
    var init = engineState[/* imguiRecord */44];
    newrecord[/* imguiRecord */44] = /* record */[
      /* ioData */init[/* ioData */0],
      /* isSetExecFuncInRenderWorkerForWorker */init[/* isSetExecFuncInRenderWorkerForWorker */1],
      /* extendData */init[/* extendData */2],
      /* wonderImguiIMGUIRecord */AssetTool$WonderImgui.prepareFontAsset(engineState[/* imguiRecord */44][/* wonderImguiIMGUIRecord */3])
    ];
    return newrecord;
  };
  StateEngineService$WonderEditor.setState(prepareFontAsset(StateEngineService$WonderEditor.unsafeGetState(/* () */0)));
  return TestToolEngine$WonderEditor.initEngineState(/* () */0);
}

function stubMainCanvasAndInspectorCanvasDom(sandbox) {
  var match = CanvasTool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox, undefined, undefined, undefined, undefined, undefined, /* () */0);
  prepareImgui(/* () */0);
  return /* tuple */[
          match[0],
          match[1],
          match[2],
          match[3]
        ];
}

exports.unsafeGetIMGUIFuncStr = unsafeGetIMGUIFuncStr;
exports.getCustomData = getCustomData;
exports.containMultiline = containMultiline;
exports.prepareFntData = prepareFntData;
exports.prepareImgui = prepareImgui;
exports.stubMainCanvasAndInspectorCanvasDom = stubMainCanvasAndInspectorCanvasDom;
/* AssetTool-WonderImgui Not a pure module */
