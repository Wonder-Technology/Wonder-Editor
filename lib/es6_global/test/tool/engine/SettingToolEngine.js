

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Sinon from "../../../../../node_modules/wonder-bs-sinon/lib/es6_global/src/sinon.js";
import * as Caml_array from "../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as ViewToolEngine$WonderEditor from "./ViewToolEngine.js";
import * as ParseSettingService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/setting/ParseSettingService.js";
import * as StateToolEngine$WonderEditor from "./StateToolEngine.js";
import * as BufferSettingService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/setting/BufferSettingService.js";
import * as OperateSettingService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/record/main/setting/OperateSettingService.js";
import * as StateLogicService$WonderEditor from "../../../src/service/stateTuple/logic/StateLogicService.js";
import * as ConfigDataLoaderSystem$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/asset/ConfigDataLoaderSystem.js";
import * as CreateStateMainService$Wonderjs from "../../../../../node_modules/wonder.js/lib/es6_global/src/service/state/main/state/CreateStateMainService.js";

function createGetContextStub(fakeGl, sandbox) {
  return Sinon.returns(fakeGl, Curry._1(Sinon.createEmptyStub, sandbox[0]));
}

function buildFakeGl(sandbox) {
  return {
          VERTEX_SHADER: 0,
          FRAGMENT_SHADER: 1,
          HIGH_FLOAT: 2,
          MEDIUM_FLOAT: 3,
          viewport: Curry._1(Sinon.createEmptyStub, sandbox[0]),
          getShaderPrecisionFormat: Sinon.returns({
                precision: 1
              }, Curry._1(Sinon.createEmptyStub, sandbox[0])),
          getExtension: Sinon.returns(0, Curry._1(Sinon.createEmptyStub, sandbox[0]))
        };
}

function buildFakeCanvas(id, gl, sandbox) {
  return {
          id: id,
          nodeType: 1,
          style: {
            left: "",
            top: "",
            width: "",
            height: "",
            position: "static"
          },
          width: 0,
          height: 0,
          getContext: createGetContextStub(gl, sandbox)
        };
}

function buildFakeCanvasOfSize(width, height) {
  return {
          width: width,
          height: height
        };
}

function setFakeCanvasToEngineState($staropt$star, $staropt$star$1, _) {
  var width = $staropt$star !== undefined ? $staropt$star : 1;
  var height = $staropt$star$1 !== undefined ? $staropt$star$1 : 1;
  var canvas = buildFakeCanvasOfSize(width, height);
  return StateLogicService$WonderEditor.getAndSetEngineState((function (param) {
                return ViewToolEngine$WonderEditor.setCanvas(canvas, param);
              }));
}

function buildFakeDomForNotPassCanvasId(sandbox) {
  var fakeGl = buildFakeGl(sandbox);
  var canvasDom = buildFakeCanvas("a", fakeGl, sandbox);
  var div = {
    innerHTML: "",
    firstChild: canvasDom
  };
  var body = {
    prepend: Curry._1(Sinon.createEmptyStub, sandbox[0]),
    style: {
      cssText: ""
    }
  };
  Sinon.returns(div, Sinon.withOneArg("div", Curry._3(Sinon.createMethodStub, sandbox[0], document, "createElement")));
  Sinon.returns(/* :: */[
        body,
        /* [] */0
      ], Sinon.withOneArg("body", Curry._3(Sinon.createMethodStub, sandbox[0], document, "querySelectorAll")));
  return /* tuple */[
          canvasDom,
          fakeGl,
          div,
          body
        ];
}

function buildBufferConfigStr($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, $staropt$star$7, $staropt$star$8, $staropt$star$9, $staropt$star$10, _) {
  var geometryPointCount = $staropt$star !== undefined ? $staropt$star : 300;
  var geometryCount = $staropt$star$1 !== undefined ? $staropt$star$1 : 30;
  var transformCount = $staropt$star$2 !== undefined ? $staropt$star$2 : 50;
  var basicMaterialCount = $staropt$star$3 !== undefined ? $staropt$star$3 : 50;
  var lightMaterialCount = $staropt$star$4 !== undefined ? $staropt$star$4 : 50;
  var meshRendererCount = $staropt$star$5 !== undefined ? $staropt$star$5 : 50;
  var textureCountPerMaterial = $staropt$star$6 !== undefined ? $staropt$star$6 : 3;
  var basicSourceTextureCount = $staropt$star$7 !== undefined ? $staropt$star$7 : 50;
  var arrayBufferViewSourceTextureCount = $staropt$star$8 !== undefined ? $staropt$star$8 : 50;
  var sourceInstanceCount = $staropt$star$9 !== undefined ? $staropt$star$9 : 2;
  var objectInstanceCountPerSourceInstance = $staropt$star$10 !== undefined ? $staropt$star$10 : 100;
  return "\n       {\n            \"custom_geometry_point_count\": " + (String(geometryPointCount) + (",\n            \"custom_geometry_count\": " + (String(geometryCount) + (",\n  \"transform_count\": " + (String(transformCount) + (",\n  \"basic_material_count\": " + (String(basicMaterialCount) + (",\n  \"light_material_count\": " + (String(lightMaterialCount) + (",\n  \"meshRenderer_count\": " + (String(meshRendererCount) + (",\n  \"basic_source_texture_count\": " + (String(basicSourceTextureCount) + (",\n   \"arrayBuffer_view_source_texture_count\": " + (String(arrayBufferViewSourceTextureCount) + (",\n\n  \"texture_count_per_material\": " + (String(textureCountPerMaterial) + (",\n\n  \"instance_buffer\": {\n    \"sourceInstance_count\": " + (String(sourceInstanceCount) + (",\n\"objectInstance_count_per_source_instance\": " + (String(objectInstanceCountPerSourceInstance) + "\n  }\n       }\n        ")))))))))))))))))))));
}

function buildSetting(isDebug, canvasId, buffer, context, useHardwareInstance, useWorker) {
  if (canvasId !== undefined) {
    return "\n {\n    \"is_debug\": " + (String(isDebug) + (",\n    \"canvas_id\": \"" + (String(Js_primitive.valFromOption(canvasId)) + ("\",\n    \"context\": " + (String(context) + (",\n    \"buffer\": " + (String(buffer) + (",\n    \"gpu\": {\n        \"use_hardware_instance\": " + (String(useHardwareInstance) + ("\n    },\n    \"worker\": {\n        \"use_worker\": " + (String(useWorker) + "\n    }\n}\n        ")))))))))));
  } else {
    return "\n {\n    \"is_debug\": " + (String(isDebug) + (",\n    \"context\": " + (String(context) + (",\n    \"buffer\": " + (String(buffer) + (",\n    \"gpu\": {\n        \"use_hardware_instance\": " + (String(useHardwareInstance) + ("\n    },\n    \"worker\": {\n        \"use_worker\": " + (String(useWorker) + "\n    }\n}\n        ")))))))));
  }
}

function createStateAndSetToStateData($staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, _) {
  var isDebug = $staropt$star !== undefined ? $staropt$star : "true";
  var canvasId = $staropt$star$1 !== undefined ? Js_primitive.valFromOption($staropt$star$1) : undefined;
  var context = $staropt$star$2 !== undefined ? $staropt$star$2 : "\n        {\n        \"alpha\": true,\n        \"depth\": true,\n        \"stencil\": false,\n        \"antialias\": true,\n        \"premultiplied_alpha\": true,\n        \"preserve_drawing_buffer\": false\n        }\n               ";
  var useHardwareInstance = $staropt$star$3 !== undefined ? $staropt$star$3 : "false";
  var buffer = $staropt$star$4 !== undefined ? $staropt$star$4 : buildBufferConfigStr(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0);
  var useWorker = $staropt$star$5 !== undefined ? $staropt$star$5 : "false";
  var stateData = StateToolEngine$WonderEditor.getStateData(/* () */0);
  return StateToolEngine$WonderEditor.setState(ConfigDataLoaderSystem$Wonderjs._createRecordWithState(ConfigDataLoaderSystem$Wonderjs._setSetting(stateData, CreateStateMainService$Wonderjs.createState(/* () */0), ParseSettingService$Wonderjs.convertToRecord(JSON.parse(buildSetting(isDebug, canvasId, buffer, context, useHardwareInstance, useWorker))))));
}

function setMemory(state, $staropt$star, _) {
  var maxDisposeCount = $staropt$star !== undefined ? $staropt$star : 1000;
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* settingRecord */0];
  var init$1 = OperateSettingService$Wonderjs.unsafeGetMemory(state[/* settingRecord */0]);
  newrecord[/* settingRecord */0] = /* record */[
    /* canvasId */init[/* canvasId */0],
    /* memory *//* record */[
      /* maxDisposeCount */maxDisposeCount,
      /* maxTypeArrayPoolSize */init$1[/* maxTypeArrayPoolSize */1],
      /* maxBigTypeArrayPoolSize */init$1[/* maxBigTypeArrayPoolSize */2]
    ],
    /* buffer */init[/* buffer */2],
    /* isDebug */init[/* isDebug */3],
    /* context */init[/* context */4],
    /* gpu */init[/* gpu */5],
    /* worker */init[/* worker */6]
  ];
  return newrecord;
}

function setBufferSize(state, $staropt$star, _) {
  var geometryPointCount = $staropt$star !== undefined ? $staropt$star : 100;
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* settingRecord */0];
  var init$1 = BufferSettingService$Wonderjs.unsafeGetBuffer(state[/* settingRecord */0]);
  newrecord[/* settingRecord */0] = /* record */[
    /* canvasId */init[/* canvasId */0],
    /* memory */init[/* memory */1],
    /* buffer *//* record */[
      /* geometryPointCount */geometryPointCount,
      /* geometryCount */init$1[/* geometryCount */1],
      /* transformCount */init$1[/* transformCount */2],
      /* basicMaterialCount */init$1[/* basicMaterialCount */3],
      /* lightMaterialCount */init$1[/* lightMaterialCount */4],
      /* textureCountPerMaterial */init$1[/* textureCountPerMaterial */5],
      /* basicSourceTextureCount */init$1[/* basicSourceTextureCount */6],
      /* arrayBufferViewSourceTextureCount */init$1[/* arrayBufferViewSourceTextureCount */7],
      /* meshRendererCount */init$1[/* meshRendererCount */8],
      /* instanceBuffer */init$1[/* instanceBuffer */9]
    ],
    /* isDebug */init[/* isDebug */3],
    /* context */init[/* context */4],
    /* gpu */init[/* gpu */5],
    /* worker */init[/* worker */6]
  ];
  return newrecord;
}

function unsafeGetGPU(state) {
  return OperateSettingService$Wonderjs.unsafeGetGPU(state[/* settingRecord */0]);
}

function setGPU(config, state) {
  var newrecord = Caml_array.caml_array_dup(state);
  var init = state[/* settingRecord */0];
  newrecord[/* settingRecord */0] = /* record */[
    /* canvasId */init[/* canvasId */0],
    /* memory */init[/* memory */1],
    /* buffer */init[/* buffer */2],
    /* isDebug */init[/* isDebug */3],
    /* context */init[/* context */4],
    /* gpu */config,
    /* worker */init[/* worker */6]
  ];
  return newrecord;
}

export {
  createGetContextStub ,
  buildFakeGl ,
  buildFakeCanvas ,
  buildFakeCanvasOfSize ,
  setFakeCanvasToEngineState ,
  buildFakeDomForNotPassCanvasId ,
  buildBufferConfigStr ,
  buildSetting ,
  createStateAndSetToStateData ,
  setMemory ,
  setBufferSize ,
  unsafeGetGPU ,
  setGPU ,
  
}
/* Sinon Not a pure module */
