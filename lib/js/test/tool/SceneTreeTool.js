'use strict';

var FakeGlToolEngine$WonderEditor = require("./engine/FakeGlToolEngine.js");
var DefaultSceneUtils$WonderEditor = require("../../src/core/utils/engine/DefaultSceneUtils.js");
var CameraLogicService$WonderEditor = require("../../src/service/stateTuple/logic/CameraLogicService.js");
var StateEditorService$WonderEditor = require("../../src/service/state/editor/StateEditorService.js");
var StateEngineService$WonderEditor = require("../../src/service/state/engine/state/StateEngineService.js");
var MainEditorSceneTool$WonderEditor = require("./MainEditorSceneTool.js");
var GeometryEngineService$WonderEditor = require("../../src/service/state/engine/GeometryEngineService.js");
var PrimitiveLogicService$WonderEditor = require("../../src/service/stateTuple/logic/PrimitiveLogicService.js");
var GameObjectLogicService$WonderEditor = require("../../src/service/stateTuple/logic/GameObjectLogicService.js");
var ArcballCameraEngineService$WonderEditor = require("../../src/service/state/engine/ArcballCameraEngineService.js");
var BasicCameraViewEngineService$WonderEditor = require("../../src/service/state/engine/camera/BasicCameraViewEngineService.js");
var MaterialDataAssetEditorService$WonderEditor = require("../../src/service/state/editor/asset/MaterialDataAssetEditorService.js");
var GameObjectComponentEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/GameObjectComponentEngineService.js");
var HierarchyGameObjectEngineService$WonderEditor = require("../../src/service/state/engine/gameObject/HierarchyGameObjectEngineService.js");

function _prepareSpecificGameObjects(engineState) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0);
  var match = GeometryEngineService$WonderEditor.createGridPlaneGameObject(/* tuple */[
        14,
        2,
        0
      ], /* array */[
        0.9,
        0.9,
        0.9
      ], engineState);
  var match$1 = CameraLogicService$WonderEditor.createCamera(editorState, match[0]);
  var camera = match$1[2];
  var match$2 = ArcballCameraEngineService$WonderEditor.create(match$1[1]);
  var engineState$1 = match$2[0];
  var engineState$2 = BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(camera, engineState$1), engineState$1);
  var match$3 = GameObjectLogicService$WonderEditor.addArcballCameraController(camera, match$2[1], /* tuple */[
        match$1[0],
        engineState$2
      ]);
  StateEditorService$WonderEditor.setState(match$3[0]);
  return match$3[1];
}

function _buildTwoCameraSceneGraph(componentData, editorState, engineState) {
  var scene = MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0);
  var match = CameraLogicService$WonderEditor.createCamera(editorState, engineState);
  var camera1 = match[2];
  var match$1 = CameraLogicService$WonderEditor.createCamera(match[0], match[1]);
  var camera2 = match$1[2];
  var match$2 = PrimitiveLogicService$WonderEditor.createCube(componentData, match$1[0], match$1[1]);
  var cube1 = match$2[2];
  return /* tuple */[
          camera1,
          camera2,
          cube1,
          match$2[0],
          HierarchyGameObjectEngineService$WonderEditor.addChild(scene, cube1, HierarchyGameObjectEngineService$WonderEditor.addChild(scene, camera2, HierarchyGameObjectEngineService$WonderEditor.addChild(scene, camera1, match$2[1])))
        ];
}

function buildTwoCameraSceneGraphToEngine(sandbox) {
  var engineState = _prepareSpecificGameObjects(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), engineState));
  var match = DefaultSceneUtils$WonderEditor.prepareDefaultComponent(editorState, engineState);
  var editorState$1 = match[0];
  var defaultLightMaterialData = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultLightMaterial(editorState$1);
  var match$1 = _buildTwoCameraSceneGraph(/* tuple */[
        match[2],
        defaultLightMaterialData
      ], editorState$1, match[1]);
  var engineState$1 = match$1[4];
  var camera2 = match$1[1];
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(camera2, engineState$1), engineState$1)));
  StateEditorService$WonderEditor.setState(match$1[3]);
  return /* tuple */[
          match$1[0],
          camera2,
          match$1[2]
        ];
}

function _buildThreeLayerSceneGraph(componentData, editorState, engineState) {
  var scene = MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0);
  var match = PrimitiveLogicService$WonderEditor.createCube(componentData, editorState, engineState);
  var cube1 = match[2];
  var match$1 = PrimitiveLogicService$WonderEditor.createCube(componentData, match[0], match[1]);
  var cube2 = match$1[2];
  var match$2 = PrimitiveLogicService$WonderEditor.createCube(componentData, match$1[0], match$1[1]);
  var cube3 = match$2[2];
  var match$3 = PrimitiveLogicService$WonderEditor.createCube(componentData, match$2[0], match$2[1]);
  var cube4 = match$3[2];
  return /* tuple */[
          match$3[0],
          HierarchyGameObjectEngineService$WonderEditor.addChild(scene, cube3, HierarchyGameObjectEngineService$WonderEditor.addChild(scene, cube2, HierarchyGameObjectEngineService$WonderEditor.addChild(cube1, cube4, HierarchyGameObjectEngineService$WonderEditor.addChild(scene, cube1, match$3[1])))),
          /* tuple */[
            scene,
            /* tuple */[
              cube1,
              cube4
            ],
            cube2,
            cube3
          ]
        ];
}

function buildThreeLayerSceneGraphToEngine(sandbox) {
  var engineState = _prepareSpecificGameObjects(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = DefaultSceneUtils$WonderEditor.prepareDefaultComponent(editorState, engineState);
  var editorState$1 = match[0];
  var defaultLightMaterialData = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultLightMaterial(editorState$1);
  var match$1 = _buildThreeLayerSceneGraph(/* tuple */[
        match[2],
        defaultLightMaterialData
      ], editorState$1, match[1]);
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[1]));
  StateEditorService$WonderEditor.setState(match$1[0]);
  return match$1[2];
}

function _buildFourLayerSceneGraph(componentData, editorState, engineState) {
  var scene = MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0);
  var match = PrimitiveLogicService$WonderEditor.createCube(componentData, editorState, engineState);
  var cube1 = match[2];
  var match$1 = PrimitiveLogicService$WonderEditor.createCube(componentData, match[0], match[1]);
  var cube2 = match$1[2];
  var match$2 = PrimitiveLogicService$WonderEditor.createCube(componentData, match$1[0], match$1[1]);
  var cube3 = match$2[2];
  var match$3 = PrimitiveLogicService$WonderEditor.createCube(componentData, match$2[0], match$2[1]);
  var cube4 = match$3[2];
  return /* tuple */[
          match$3[0],
          HierarchyGameObjectEngineService$WonderEditor.addChild(scene, cube2, HierarchyGameObjectEngineService$WonderEditor.addChild(cube3, cube4, HierarchyGameObjectEngineService$WonderEditor.addChild(cube1, cube3, HierarchyGameObjectEngineService$WonderEditor.addChild(scene, cube1, match$3[1])))),
          /* tuple */[
            scene,
            /* tuple */[
              cube1,
              cube3,
              cube4
            ],
            cube2
          ]
        ];
}

function buildFourLayerSceneGraphToEngine(sandbox) {
  var engineState = _prepareSpecificGameObjects(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = DefaultSceneUtils$WonderEditor.prepareDefaultComponent(editorState, engineState);
  var editorState$1 = match[0];
  var defaultLightMaterialData = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultLightMaterial(editorState$1);
  var match$1 = _buildFourLayerSceneGraph(/* tuple */[
        match[2],
        defaultLightMaterialData
      ], editorState$1, match[1]);
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[1]));
  StateEditorService$WonderEditor.setState(match$1[0]);
  return match$1[2];
}

exports._prepareSpecificGameObjects = _prepareSpecificGameObjects;
exports._buildTwoCameraSceneGraph = _buildTwoCameraSceneGraph;
exports.buildTwoCameraSceneGraphToEngine = buildTwoCameraSceneGraphToEngine;
exports._buildThreeLayerSceneGraph = _buildThreeLayerSceneGraph;
exports.buildThreeLayerSceneGraphToEngine = buildThreeLayerSceneGraphToEngine;
exports._buildFourLayerSceneGraph = _buildFourLayerSceneGraph;
exports.buildFourLayerSceneGraphToEngine = buildFourLayerSceneGraphToEngine;
/* FakeGlToolEngine-WonderEditor Not a pure module */
