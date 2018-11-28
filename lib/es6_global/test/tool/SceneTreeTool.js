

import * as TestTool$WonderEditor from "./TestTool.js";
import * as BaseEventTool$WonderEditor from "./ui/BaseEventTool.js";
import * as GameObjectUtils$WonderEditor from "../../src/core/utils/engine/GameObjectUtils.js";
import * as FakeGlToolEngine$WonderEditor from "./engine/FakeGlToolEngine.js";
import * as DefaultSceneUtils$WonderEditor from "../../src/core/utils/engine/DefaultSceneUtils.js";
import * as StateLogicService$WonderEditor from "../../src/service/stateTuple/logic/StateLogicService.js";
import * as BuildComponentTool$WonderEditor from "./BuildComponentTool.js";
import * as SceneEditorService$WonderEditor from "../../src/service/state/editor/scene/SceneEditorService.js";
import * as SceneTreeEventTool$WonderEditor from "./SceneTreeEventTool.js";
import * as StateEditorService$WonderEditor from "../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../src/service/state/engine/StateEngineService.js";
import * as CameraEngineService$WonderEditor from "../../src/service/state/engine/camera/CameraEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "./MainEditorSceneTool.js";
import * as SceneTreeNodeDomTool$WonderEditor from "./domIndex/SceneTreeNodeDomTool.js";
import * as GeometryEngineService$WonderEditor from "../../src/service/state/engine/GeometryEngineService.js";
import * as GameObjectLogicService$WonderEditor from "../../src/service/stateTuple/logic/GameObjectLogicService.js";
import * as PrimitiveEngineService$WonderEditor from "../../src/service/state/engine/PrimitiveEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../src/service/state/engine/ArcballCameraEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../src/service/state/engine/camera/BasicCameraViewEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../src/service/state/engine/GameObjectComponentEngineService.js";

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
  var match$1 = CameraEngineService$WonderEditor.createCamera(editorState, match[0]);
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

function _buildTwoCameraSceneGraph(cubeGeometry, editorState, engineState) {
  var scene = MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0);
  var match = CameraEngineService$WonderEditor.createCamera(editorState, engineState);
  var camera1 = match[2];
  var match$1 = CameraEngineService$WonderEditor.createCamera(match[0], match[1]);
  var camera2 = match$1[2];
  var match$2 = PrimitiveEngineService$WonderEditor.createBox(cubeGeometry, match$1[0], match$1[1]);
  var box1 = match$2[2];
  return /* tuple */[
          camera1,
          camera2,
          box1,
          match$2[0],
          GameObjectUtils$WonderEditor.addChild(scene, box1, GameObjectUtils$WonderEditor.addChild(scene, camera2, GameObjectUtils$WonderEditor.addChild(scene, camera1, match$2[1])))
        ];
}

function buildTwoCameraSceneGraphToEngine(sandbox) {
  var engineState = _prepareSpecificGameObjects(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), engineState));
  var match = DefaultSceneUtils$WonderEditor.prepareDefaultComponent(editorState, engineState);
  var match$1 = _buildTwoCameraSceneGraph(match[2], match[0], match[1]);
  var engineState$1 = match$1[4];
  var camera2 = match$1[1];
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), BasicCameraViewEngineService$WonderEditor.activeBasicCameraView(GameObjectComponentEngineService$WonderEditor.unsafeGetBasicCameraViewComponent(camera2, engineState$1), engineState$1)));
  StateEditorService$WonderEditor.setState(match$1[3]);
  return /* tuple */[
          match$1[0],
          camera2,
          match$1[2]
        ];
}

function _buildThreeLayerSceneGraph(cubeGeometry, editorState, engineState) {
  var scene = MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0);
  var match = PrimitiveEngineService$WonderEditor.createBox(cubeGeometry, editorState, engineState);
  var box1 = match[2];
  var match$1 = PrimitiveEngineService$WonderEditor.createBox(cubeGeometry, match[0], match[1]);
  var match$2 = PrimitiveEngineService$WonderEditor.createBox(cubeGeometry, match$1[0], match$1[1]);
  var match$3 = PrimitiveEngineService$WonderEditor.createBox(cubeGeometry, match$2[0], match$2[1]);
  return /* tuple */[
          match$3[0],
          GameObjectUtils$WonderEditor.addChild(scene, match$2[2], GameObjectUtils$WonderEditor.addChild(scene, match$1[2], GameObjectUtils$WonderEditor.addChild(box1, match$3[2], GameObjectUtils$WonderEditor.addChild(scene, box1, match$3[1]))))
        ];
}

function buildThreeLayerSceneGraphToEngine(sandbox) {
  var engineState = _prepareSpecificGameObjects(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = DefaultSceneUtils$WonderEditor.prepareDefaultComponent(editorState, engineState);
  var match$1 = _buildThreeLayerSceneGraph(match[2], match[0], match[1]);
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[1]));
  StateEditorService$WonderEditor.setState(match$1[0]);
  return /* () */0;
}

function _buildFourLayerSceneGraph(cubeGeometry, editorState, engineState) {
  var scene = MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0);
  var match = PrimitiveEngineService$WonderEditor.createBox(cubeGeometry, editorState, engineState);
  var box1 = match[2];
  var match$1 = PrimitiveEngineService$WonderEditor.createBox(cubeGeometry, match[0], match[1]);
  var box2 = match$1[2];
  var match$2 = PrimitiveEngineService$WonderEditor.createBox(cubeGeometry, match$1[0], match$1[1]);
  var box3 = match$2[2];
  var match$3 = PrimitiveEngineService$WonderEditor.createBox(cubeGeometry, match$2[0], match$2[1]);
  var box4 = match$3[2];
  return /* tuple */[
          box1,
          box2,
          box3,
          box4,
          match$3[0],
          GameObjectUtils$WonderEditor.addChild(scene, box2, GameObjectUtils$WonderEditor.addChild(box3, box4, GameObjectUtils$WonderEditor.addChild(box1, box3, GameObjectUtils$WonderEditor.addChild(scene, box1, match$3[1]))))
        ];
}

function buildFourLayerSceneGraphToEngine(sandbox) {
  var engineState = _prepareSpecificGameObjects(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = DefaultSceneUtils$WonderEditor.prepareDefaultComponent(editorState, engineState);
  var match$1 = _buildFourLayerSceneGraph(match[2], match[0], match[1]);
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[5]));
  StateEditorService$WonderEditor.setState(match$1[4]);
  return /* tuple */[
          match$1[0],
          match$1[1],
          match$1[2],
          match$1[3]
        ];
}

function clearCurrentGameObjectAndSetTreeSpecificGameObject(clickTreeNodeIndex) {
  StateLogicService$WonderEditor.getAndSetEditorState(SceneEditorService$WonderEditor.clearCurrentSceneTreeNode);
  var component = BuildComponentTool$WonderEditor.buildSceneTree(TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0));
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                return SceneTreeEventTool$WonderEditor.triggerClickEvent(clickTreeNodeIndex, param);
              }));
}

function buildFourLayerSceneAndGetBox(sandbox) {
  var match = buildFourLayerSceneGraphToEngine(sandbox);
  var firstLayerFirstCubeDomIndex = SceneTreeNodeDomTool$WonderEditor.OperateFourLayer[/* getFirstLayerFirstCubeDomIndex */0](/* () */0);
  clearCurrentGameObjectAndSetTreeSpecificGameObject(firstLayerFirstCubeDomIndex);
  return /* tuple */[
          match[0],
          match[1],
          match[2],
          match[3]
        ];
}

export {
  _prepareSpecificGameObjects ,
  _buildTwoCameraSceneGraph ,
  buildTwoCameraSceneGraphToEngine ,
  _buildThreeLayerSceneGraph ,
  buildThreeLayerSceneGraphToEngine ,
  _buildFourLayerSceneGraph ,
  buildFourLayerSceneGraphToEngine ,
  clearCurrentGameObjectAndSetTreeSpecificGameObject ,
  buildFourLayerSceneAndGetBox ,
  
}
/* TestTool-WonderEditor Not a pure module */
