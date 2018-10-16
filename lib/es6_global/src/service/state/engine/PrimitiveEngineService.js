

import * as GameObjectAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as GameObjectLogicService$WonderEditor from "../../stateTuple/logic/GameObjectLogicService.js";
import * as GameObjectEngineService$WonderEditor from "./GameObjectEngineService.js";
import * as RenderGroupEngineService$WonderEditor from "./RenderGroupEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "./MeshRendererEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "./LightMaterialEngineService.js";
import * as DirectionLightEngineService$WonderEditor from "./DirectionLightEngineService.js";

function createEmptyGameObject(editorState, engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObject(/* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = match[1];
  var obj = match$1[1];
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("gameObject", obj, match$1[0]);
  return /* tuple */[
          match[0],
          engineState$1,
          obj
        ];
}

function createBox(cubeGeometry, editorState, engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObject(/* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = match[1];
  var obj = match$1[1];
  var match$2 = RenderGroupEngineService$WonderEditor.createRenderGroup(/* tuple */[
        MeshRendererEngineService$WonderEditor.create,
        LightMaterialEngineService$WonderEditor.create
      ], match$1[0]);
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("cube", obj, match$2[0]);
  var match$3 = GameObjectLogicService$WonderEditor.addRenderGroup(obj, match$2[1], /* tuple */[
        GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent,
        GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent
      ], GameObjectLogicService$WonderEditor.addGeometry(obj, cubeGeometry, /* tuple */[
            match[0],
            engineState$1
          ]));
  return /* tuple */[
          match$3[0],
          match$3[1],
          obj
        ];
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
  createBox ,
  createDirectionLight ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
