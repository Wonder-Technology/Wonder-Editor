

import * as GameObjectUtils$WonderEditor from "../../src/core/utils/engine/GameObjectUtils.js";
import * as FakeGlToolEngine$WonderEditor from "./engine/FakeGlToolEngine.js";
import * as DefaultSceneUtils$WonderEditor from "../../src/core/utils/engine/DefaultSceneUtils.js";
import * as StateEditorService$WonderEditor from "../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../src/service/state/engine/StateEngineService.js";
import * as CameraEngineService$WonderEditor from "../../src/service/state/engine/camera/CameraEngineService.js";
import * as MainEditorSceneTool$WonderEditor from "./MainEditorSceneTool.js";
import * as GeometryEngineService$WonderEditor from "../../src/service/state/engine/GeometryEngineService.js";
import * as GameObjectLogicService$WonderEditor from "../../src/service/stateTuple/logic/GameObjectLogicService.js";
import * as PrimitiveEngineService$WonderEditor from "../../src/service/state/engine/PrimitiveEngineService.js";
import * as ArcballCameraEngineService$WonderEditor from "../../src/service/state/engine/ArcballCameraEngineService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../src/service/state/engine/camera/BasicCameraViewEngineService.js";
import * as MaterialDataAssetEditorService$WonderEditor from "../../src/service/state/editor/asset/MaterialDataAssetEditorService.js";
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

function _buildTwoCameraSceneGraph(componentData, editorState, engineState) {
  var scene = MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0);
  var match = CameraEngineService$WonderEditor.createCamera(editorState, engineState);
  var camera1 = match[2];
  var match$1 = CameraEngineService$WonderEditor.createCamera(match[0], match[1]);
  var camera2 = match$1[2];
  var match$2 = PrimitiveEngineService$WonderEditor.createCube(componentData, match$1[0], match$1[1]);
  var cube1 = match$2[2];
  return /* tuple */[
          camera1,
          camera2,
          cube1,
          match$2[0],
          GameObjectUtils$WonderEditor.addChild(scene, cube1, GameObjectUtils$WonderEditor.addChild(scene, camera2, GameObjectUtils$WonderEditor.addChild(scene, camera1, match$2[1])))
        ];
}

function buildTwoCameraSceneGraphToEngine(sandbox) {
  var engineState = _prepareSpecificGameObjects(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), engineState));
  var match = DefaultSceneUtils$WonderEditor.prepareDefaultComponent(editorState, engineState);
  var editorState$1 = match[0];
  var defaultLightMaterialData = MaterialDataAssetEditorService$WonderEditor.unsafeGetDefaultLightMaterial(editorState$1);
  var match$1 = _buildTwoCameraSceneGraph(/* tuple */[
        match[2],
        defaultLightMaterialData
      ], editorState$1, match[1]);
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

function _buildThreeLayerSceneGraph(componentData, editorState, engineState) {
  var scene = MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0);
  var match = PrimitiveEngineService$WonderEditor.createCube(componentData, editorState, engineState);
  var cube1 = match[2];
  var match$1 = PrimitiveEngineService$WonderEditor.createCube(componentData, match[0], match[1]);
  var cube2 = match$1[2];
  var match$2 = PrimitiveEngineService$WonderEditor.createCube(componentData, match$1[0], match$1[1]);
  var cube3 = match$2[2];
  var match$3 = PrimitiveEngineService$WonderEditor.createCube(componentData, match$2[0], match$2[1]);
  var cube4 = match$3[2];
  return /* tuple */[
          match$3[0],
          GameObjectUtils$WonderEditor.addChild(scene, cube3, GameObjectUtils$WonderEditor.addChild(scene, cube2, GameObjectUtils$WonderEditor.addChild(cube1, cube4, GameObjectUtils$WonderEditor.addChild(scene, cube1, match$3[1])))),
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
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[1]));
  StateEditorService$WonderEditor.setState(match$1[0]);
  return match$1[2];
}

function _buildFourLayerSceneGraph(componentData, editorState, engineState) {
  var scene = MainEditorSceneTool$WonderEditor.unsafeGetScene(/* () */0);
  var match = PrimitiveEngineService$WonderEditor.createCube(componentData, editorState, engineState);
  var cube1 = match[2];
  var match$1 = PrimitiveEngineService$WonderEditor.createCube(componentData, match[0], match[1]);
  var cube2 = match$1[2];
  var match$2 = PrimitiveEngineService$WonderEditor.createCube(componentData, match$1[0], match$1[1]);
  var cube3 = match$2[2];
  var match$3 = PrimitiveEngineService$WonderEditor.createCube(componentData, match$2[0], match$2[1]);
  var cube4 = match$3[2];
  return /* tuple */[
          match$3[0],
          GameObjectUtils$WonderEditor.addChild(scene, cube2, GameObjectUtils$WonderEditor.addChild(cube3, cube4, GameObjectUtils$WonderEditor.addChild(cube1, cube3, GameObjectUtils$WonderEditor.addChild(scene, cube1, match$3[1])))),
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
  StateEngineService$WonderEditor.setState(FakeGlToolEngine$WonderEditor.setFakeGl(FakeGlToolEngine$WonderEditor.buildFakeGl(sandbox, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0), match$1[1]));
  StateEditorService$WonderEditor.setState(match$1[0]);
  return match$1[2];
}

export {
  _prepareSpecificGameObjects ,
  _buildTwoCameraSceneGraph ,
  buildTwoCameraSceneGraphToEngine ,
  _buildThreeLayerSceneGraph ,
  buildThreeLayerSceneGraphToEngine ,
  _buildFourLayerSceneGraph ,
  buildFourLayerSceneGraphToEngine ,
  
}
/* GameObjectUtils-WonderEditor Not a pure module */
