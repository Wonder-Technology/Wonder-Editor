

import * as GeometryEngineService$WonderEditor from "./GeometryEngineService.js";
import * as GameObjectLogicService$WonderEditor from "../../stateTuple/logic/GameObjectLogicService.js";
import * as GameObjectEngineService$WonderEditor from "./GameObjectEngineService.js";
import * as MeshRendererEngineService$WonderEditor from "./MeshRendererEngineService.js";
import * as LightMaterialEngineService$WonderEditor from "./LightMaterialEngineService.js";
import * as DirectionLightEngineService$WonderEditor from "./DirectionLightEngineService.js";

function createBox(editorState, engineState) {
  var match = GameObjectLogicService$WonderEditor.createGameObject(/* tuple */[
        editorState,
        engineState
      ]);
  var match$1 = match[1];
  var obj = match$1[1];
  var match$2 = LightMaterialEngineService$WonderEditor.create(match$1[0]);
  var match$3 = MeshRendererEngineService$WonderEditor.create(match$2[0]);
  var match$4 = GeometryEngineService$WonderEditor.createBoxGeometry(match$3[0]);
  var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectName("cube", obj, match$4[0]);
  var match$5 = GameObjectLogicService$WonderEditor.addMeshRendererComponent(obj, match$3[1], GameObjectLogicService$WonderEditor.addBoxGeometryComponent(obj, match$4[1], GameObjectLogicService$WonderEditor.addLightMaterialComponent(obj, match$2[1], /* tuple */[
                match[0],
                engineState$1
              ])));
  return /* tuple */[
          match$5[0],
          match$5[1],
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
  var match$3 = GameObjectLogicService$WonderEditor.addDirectionLightComponent(obj, match$2[1], /* tuple */[
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
  createBox ,
  createDirectionLight ,
  
}
/* GeometryEngineService-WonderEditor Not a pure module */
