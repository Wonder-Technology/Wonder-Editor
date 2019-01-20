

import * as GameObjectAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as GameObjectLogicService$WonderEditor from "../../stateTuple/logic/GameObjectLogicService.js";
import * as TransformEngineService$WonderEditor from "./TransformEngineService.js";
import * as GameObjectEngineService$WonderEditor from "./GameObjectEngineService.js";
import * as RenderGroupEngineService$WonderEditor from "./RenderGroupEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "./MeshRendererEngineService.js";
import * as DirectionLightEngineService$WonderEditor from "./DirectionLightEngineService.js";
import * as GameObjectComponentEngineService$WonderEditor from "./GameObjectComponentEngineService.js";

function createEmptyGameObject(editorState, engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObject(/* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = match[1];
  var obj = match$1[1];
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("GameObject", obj, match$1[0]);
  return /* tuple */[
          match[0],
          engineState$1,
          obj
        ];
}

function _create3DGameObject(param, param$1) {
  var match = GameObjectLogicService$WonderEditor.createGameObject(/* tuple */[
        param$1[0],
        param$1[1]
      ]);
  var match$1 = match[1];
  var obj = match$1[1];
  var engineState = match$1[0];
  var transform = GameObjectComponentEngineService$WonderEditor.unsafeGetTransformComponent(obj, engineState);
  var engineState$1 = TransformEngineService$WonderEditor.setLocalScale(/* tuple */[
        1,
        1,
        1
      ], transform, engineState);
  var match$2 = MeshRendererEngineService$WonderEditor.create(engineState$1);
  var renderGroup = RenderGroupEngineService$WonderEditor.buildRenderGroup(match$2[1], param[2]);
  var engineState$2 = GameObjectEngineService$WonderEditor.setGameObjectName(param[0], obj, match$2[0]);
  var match$3 = GameObjectLogicService$WonderEditor.addGeometry(obj, param[1], GameObjectLogicService$WonderEditor.addRenderGroup(obj, renderGroup, /* tuple */[
            GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent,
            GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent
          ], /* tuple */[
            match[0],
            engineState$2
          ]));
  return /* tuple */[
          match$3[0],
          match$3[1],
          obj
        ];
}

function createCube(param, editorState, engineState) {
  return _create3DGameObject(/* tuple */[
              "Cube",
              param[0],
              param[1]
            ], /* tuple */[
              editorState,
              engineState
            ]);
}

function createSphere(param, editorState, engineState) {
  return _create3DGameObject(/* tuple */[
              "Sphere",
              param[0],
              param[1]
            ], /* tuple */[
              editorState,
              engineState
            ]);
}

function createDirectionLight(editorState, engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObject(/* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = match[1];
  var obj = match$1[1];
  var match$2 = DirectionLightEngineService$WonderEditor.create(match$1[0]);
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("Direction Light", obj, match$2[0]);
  var match$3 = GameObjectLogicService$WonderEditor.addDirectionLight(obj, match$2[1], /* tuple */[
        match[0],
        engineState$1
      ]);
  return /* tuple */[
          match$3[0],
          match$3[1],
          obj
        ];
}

export {
  createEmptyGameObject ,
  _create3DGameObject ,
  createCube ,
  createSphere ,
  createDirectionLight ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
