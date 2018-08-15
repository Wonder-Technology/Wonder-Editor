

import * as GameObjectAPI$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/api/GameObjectAPI.js";
import * as GeometryEngineService$WonderEditor from "./GeometryEngineService.js";
import * as GameObjectLogicService$WonderEditor from "../../stateTuple/logic/GameObjectLogicService.js";
import * as GameObjectEngineService$WonderEditor from "./GameObjectEngineService.js";
import * as RenderGroupEngineService$WonderEditor from "./RenderGroupEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "./MeshRendererEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "./LightMaterialEngineService.js";
import * as DirectionLightEngineService$WonderEditor from "./DirectionLightEngineService.js";

function createEmptyGameObjectForEditEngineState(engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObjectForEditEngineState(engineState);
  var obj = match[1];
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("gameObject", obj, match[0]);
  return /* tuple */[
          engineState$1,
          obj
        ];
}

function createEmptyGameObjectForRunEngineState(editorState, engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObjectForRunEngineState(/* tuple */[
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

function createBoxForEditEngineState(engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObjectForEditEngineState(engineState);
  var obj = match[1];
  var match$1 = GeometryEngineService$WonderEditor.createBoxGeometry(match[0]);
  var match$2 = RenderGroupEngineService$WonderEditor.createRenderGroup(/* tuple */[
        MeshRendererEngineService$WonderEditor.create,
        LightMaterialEngineService$WonderEditor.create
      ], match$1[0]);
  var engineState$1 = GameObjectLogicService$WonderEditor.addRenderGroupForEditEngineState(obj, match$2[1], /* tuple */[
        GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent,
        GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent
      ], GameObjectLogicService$WonderEditor.addGeometryForEditEngineState(obj, match$1[1], GameObjectEngineService$WonderEditor.setGameObjectName("cube", obj, match$2[0])));
  return /* tuple */[
          engineState$1,
          obj
        ];
}

function createBoxForRunEngineState(editorState, engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObjectForRunEngineState(/* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = match[1];
  var obj = match$1[1];
  var match$2 = GeometryEngineService$WonderEditor.createBoxGeometry(match$1[0]);
  var match$3 = RenderGroupEngineService$WonderEditor.createRenderGroup(/* tuple */[
        MeshRendererEngineService$WonderEditor.create,
        LightMaterialEngineService$WonderEditor.create
      ], match$2[0]);
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("cube", obj, match$3[0]);
  var match$4 = GameObjectLogicService$WonderEditor.addRenderGroupForRunEngineState(obj, match$3[1], /* tuple */[
        GameObjectAPI$Wonderjs.addGameObjectMeshRendererComponent,
        GameObjectAPI$Wonderjs.addGameObjectLightMaterialComponent
      ], GameObjectLogicService$WonderEditor.addGeometryForRunEngineState(obj, match$2[1], /* tuple */[
            match[0],
            engineState$1
          ]));
  return /* tuple */[
          match$4[0],
          match$4[1],
          obj
        ];
}

function createDirectionLightForEditEngineState(engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObjectForEditEngineState(engineState);
  var obj = match[1];
  var match$1 = DirectionLightEngineService$WonderEditor.create(match[0]);
  var engineState$1 = GameObjectLogicService$WonderEditor.addDirectionLightForEditEngineState(obj, match$1[1], GameObjectEngineService$WonderEditor.setGameObjectName("Direction Light", obj, match$1[0]));
  return /* tuple */[
          engineState$1,
          obj
        ];
}

function createDirectionLightForRunEngineState(editorState, engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObjectForRunEngineState(/* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = match[1];
  var obj = match$1[1];
  var match$2 = DirectionLightEngineService$WonderEditor.create(match$1[0]);
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("Direction Light", obj, match$2[0]);
  var match$3 = GameObjectLogicService$WonderEditor.addDirectionLightForRunEngineState(obj, match$2[1], /* tuple */[
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
  createEmptyGameObjectForEditEngineState ,
  createEmptyGameObjectForRunEngineState ,
  createBoxForEditEngineState ,
  createBoxForRunEngineState ,
  createDirectionLightForEditEngineState ,
  createDirectionLightForRunEngineState ,
  
}
/* GameObjectAPI-Wonderjs Not a pure module */
