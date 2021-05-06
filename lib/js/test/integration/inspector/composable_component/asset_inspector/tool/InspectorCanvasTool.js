'use strict';

var Curry = require("bs-platform/lib/js/curry.js");
var Sinon = require("wonder-bs-sinon/lib/js/src/sinon.js");
var Caml_option = require("bs-platform/lib/js/caml_option.js");
var Wonder_jest = require("wonder-bs-jest/lib/js/src/wonder_jest.js");
var MainUtils$WonderEditor = require("../../../../../../src/core/utils/engine/MainUtils.js");
var SinonTool$WonderEditor = require("../../../../../tool/SinonTool.js");
var CanvasTool$WonderEditor = require("../../../../../unit/atom_component/canvas/tool/CanvasTool.js");
var Vector3Service$WonderEditor = require("../../../../../../src/service/primitive/Vector3Service.js");
var BuildCanvasTool$WonderEditor = require("../../../../../tool/BuildCanvasTool.js");
var StateLogicService$WonderEditor = require("../../../../../../src/service/stateTuple/logic/StateLogicService.js");
var StateEditorService$WonderEditor = require("../../../../../../src/service/state/editor/StateEditorService.js");
var MainEditorSceneTool$WonderEditor = require("../../../../../tool/MainEditorSceneTool.js");
var InspectorCanvasUtils$WonderEditor = require("../../../../../../src/core/composable_component/mainEditor/composable_component/inspector/composable_component/asset_Inspector/utils/InspectorCanvasUtils.js");
var TransformEngineService$WonderEditor = require("../../../../../../src/service/state/engine/TransformEngineService.js");
var ArcballCameraEngineService$WonderEditor = require("../../../../../../src/service/state/engine/ArcballCameraEngineService.js");
var NoWorkerJobConfigToolEngine$WonderEditor = require("../../../../../tool/engine/NoWorkerJobConfigToolEngine.js");
var StateInspectorEngineService$WonderEditor = require("../../../../../../src/service/state/inspectorEngine/StateInspectorEngineService.js");
var ImmutableSparseMapService$WonderCommonlib = require("wonder-commonlib/lib/js/src/ImmutableSparseMapService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../../../../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var GameObjectInspectorEngineService$WonderEditor = require("../../../../../../src/service/state/inspectorEngine/GameObjectInspectorEngineService.js");
var ImgContextImgCanvasEditorService$WonderEditor = require("../../../../../../src/service/state/editor/imgCanvas/ImgContextImgCanvasEditorService.js");

function prepareInspectorAndImgCanvasAndReturnAllData(sandbox, $staropt$star, $staropt$star$1, param) {
  var inspectorCanvasWidth = $staropt$star !== undefined ? $staropt$star : 300;
  var inspectorCanvasHeight = $staropt$star$1 !== undefined ? $staropt$star$1 : 300;
  var getElementStub = Curry._3(SinonTool$WonderEditor.createMethodStub, sandbox[0], document, "getElementById");
  var match = CanvasTool$WonderEditor.stubMainCanvasAndInspectorCanvasDom(sandbox, undefined, undefined, inspectorCanvasWidth, inspectorCanvasHeight, Caml_option.some(getElementStub), /* () */0);
  var inspectorCanvasDom = match[3];
  var imgCanvasDom = CanvasTool$WonderEditor.stubImgCanvasDom(sandbox, undefined, undefined, Caml_option.some(getElementStub), /* () */0);
  var imgCanvasFakeBase64Str = BuildCanvasTool$WonderEditor.getImgCanvasFakeBase64Str(/* () */0);
  Sinon.returns(BuildCanvasTool$WonderEditor.getInspectorCanvasFakeBase64Str(/* () */0), inspectorCanvasDom.toDataURL);
  Sinon.returns(imgCanvasFakeBase64Str, imgCanvasDom.toDataURL);
  return /* tuple */[
          imgCanvasFakeBase64Str,
          /* tuple */[
            match[0],
            match[1],
            match[2],
            inspectorCanvasDom,
            imgCanvasDom
          ]
        ];
}

function prepareInspectorAndImgCanvas(sandbox, $staropt$star, $staropt$star$1, param) {
  var inspectorCanvasWidth = $staropt$star !== undefined ? $staropt$star : 300;
  var inspectorCanvasHeight = $staropt$star$1 !== undefined ? $staropt$star$1 : 300;
  var match = prepareInspectorAndImgCanvasAndReturnAllData(sandbox, inspectorCanvasWidth, inspectorCanvasHeight, /* () */0);
  var match$1 = match[1];
  return /* tuple */[
          match[0],
          /* tuple */[
            match$1[3],
            match$1[4]
          ]
        ];
}

function prepareInspectorEngineState(sandbox) {
  MainEditorSceneTool$WonderEditor.initInspectorEngineState(sandbox, NoWorkerJobConfigToolEngine$WonderEditor.buildNoWorkerJobConfig(undefined, "\n                [\n                 {\n                   \"name\": \"default\",\n                   \"jobs\": [\n                       {\"name\": \"init_inspector_engine\" }\n                   ]\n                 }\n               ]\n                ", undefined, "\n                [\n                   {\"name\": \"init_inspector_engine\" }\n                ]\n                ", undefined, /* () */0), undefined, false, /* () */0);
  return StateLogicService$WonderEditor.getAndSetInspectorEngineState(MainUtils$WonderEditor._handleInspectorEngineState);
}

function disposeContainerGameObjectAllChildrenAndReallocateCPUMemory(param) {
  StateInspectorEngineService$WonderEditor.setState(InspectorCanvasUtils$WonderEditor.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory(/* tuple */[
            StateEditorService$WonderEditor.getState(/* () */0),
            StateInspectorEngineService$WonderEditor.unsafeGetState(/* () */0)
          ]));
  return /* () */0;
}

function judgeNotCreateMaterialSphere(param) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var imgContext = ImgContextImgCanvasEditorService$WonderEditor.unsafeGetImgContext(editorState);
  return Sinon.toCalled(Wonder_jest.Expect[/* not__ */24](Wonder_jest.Expect[/* expect */0](imgContext.clearRect)));
}

var Material = /* module */[/* judgeNotCreateMaterialSphere */judgeNotCreateMaterialSphere];

function unsafeGetArcballCameraControllerComponent(inspectorEngineState) {
  return GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(GameObjectInspectorEngineService$WonderEditor.unsafeGetCamera(inspectorEngineState), inspectorEngineState);
}

function setAngleData(inspectorEngineState) {
  var cameraController = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(GameObjectInspectorEngineService$WonderEditor.unsafeGetCamera(inspectorEngineState), inspectorEngineState);
  return ArcballCameraEngineService$WonderEditor.setArcballCameraControllerTheta(cameraController, 0.8, ArcballCameraEngineService$WonderEditor.setArcballCameraControllerPhi(cameraController, 0.9, inspectorEngineState));
}

function getAngleData(inspectorEngineState) {
  var cameraController = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(GameObjectInspectorEngineService$WonderEditor.unsafeGetCamera(inspectorEngineState), inspectorEngineState);
  return /* tuple */[
          ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerPhi(cameraController, inspectorEngineState),
          ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerTheta(cameraController, inspectorEngineState)
        ];
}

function getDefaultAngleData(param) {
  return /* tuple */[
          Math.PI / 2,
          1.5
        ];
}

function getGameObjectTransformLocalPosition(inspectorEngineState) {
  var __x = GameObjectComponentEngineService$WonderEditor.unsafeGetArcballCameraControllerComponent(GameObjectInspectorEngineService$WonderEditor.unsafeGetCamera(inspectorEngineState), inspectorEngineState);
  var __x$1 = ArcballCameraEngineService$WonderEditor.unsafeGetArcballCameraControllerGameObject(__x, inspectorEngineState);
  var cameraControllerGameObjectTransform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(__x$1, inspectorEngineState);
  return Vector3Service$WonderEditor.truncate(2, TransformEngineService$WonderEditor.getLocalPosition(cameraControllerGameObjectTransform, inspectorEngineState));
}

var ArcballCameraController = /* module */[
  /* unsafeGetArcballCameraControllerComponent */unsafeGetArcballCameraControllerComponent,
  /* setAngleData */setAngleData,
  /* getAngleData */getAngleData,
  /* getDefaultAngleData */getDefaultAngleData,
  /* getGameObjectTransformLocalPosition */getGameObjectTransformLocalPosition
];

function setFakeCaches(param) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var init = editorState[/* inspectorCanvasRecord */0];
  StateEditorService$WonderEditor.setState(/* record */[
        /* inspectorCanvasRecord : record */[
          /* containerGameObject */init[/* containerGameObject */0],
          /* basicSourceTextureCacheMap */ImmutableSparseMapService$WonderCommonlib.set(1, 11, ImmutableSparseMapService$WonderCommonlib.set(0, 10, editorState[/* inspectorCanvasRecord */0][/* basicSourceTextureCacheMap */1])),
          /* materialSphereGameObjectInInspectorCanvas */init[/* materialSphereGameObjectInInspectorCanvas */2]
        ],
        /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
        /* uiRecord */editorState[/* uiRecord */2],
        /* settingRecord */editorState[/* settingRecord */3],
        /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
        /* assetRecord */editorState[/* assetRecord */5],
        /* sceneViewRecord */editorState[/* sceneViewRecord */6],
        /* gameViewRecord */editorState[/* gameViewRecord */7],
        /* eventRecord */editorState[/* eventRecord */8],
        /* inspectorRecord */editorState[/* inspectorRecord */9],
        /* consoleRecord */editorState[/* consoleRecord */10],
        /* transformRecord */editorState[/* transformRecord */11],
        /* pickingRecord */editorState[/* pickingRecord */12],
        /* currentDragSource */editorState[/* currentDragSource */13],
        /* currentSelectSource */editorState[/* currentSelectSource */14],
        /* loopId */editorState[/* loopId */15],
        /* languageType */editorState[/* languageType */16]
      ]);
  return /* () */0;
}

function isCacheMapEmpty(editorState) {
  return ImmutableSparseMapService$WonderCommonlib.length(editorState[/* inspectorCanvasRecord */0][/* basicSourceTextureCacheMap */1]) === 0;
}

var TextureCache = /* module */[
  /* setFakeCaches */setFakeCaches,
  /* isCacheMapEmpty */isCacheMapEmpty
];

exports.prepareInspectorAndImgCanvasAndReturnAllData = prepareInspectorAndImgCanvasAndReturnAllData;
exports.prepareInspectorAndImgCanvas = prepareInspectorAndImgCanvas;
exports.prepareInspectorEngineState = prepareInspectorEngineState;
exports.disposeContainerGameObjectAllChildrenAndReallocateCPUMemory = disposeContainerGameObjectAllChildrenAndReallocateCPUMemory;
exports.Material = Material;
exports.ArcballCameraController = ArcballCameraController;
exports.TextureCache = TextureCache;
/* Sinon Not a pure module */
