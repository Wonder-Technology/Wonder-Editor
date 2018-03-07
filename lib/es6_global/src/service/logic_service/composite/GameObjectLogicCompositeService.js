'use strict';

import * as TransformLogicSingleService$WonderEditor    from "../single/TransformLogicSingleService.js";
import * as GameObjectLogicSingleService$WonderEditor   from "../single/GameObjectLogicSingleService.js";
import * as PrimitiveLogicCompositeService$WonderEditor from "./PrimitiveLogicCompositeService.js";

function addChild(parent, child, state) {
  return TransformLogicSingleService$WonderEditor.setParent(GameObjectLogicSingleService$WonderEditor.getTransformComponent(parent, state), GameObjectLogicSingleService$WonderEditor.getTransformComponent(child, state), state);
}

function getChildren(gameObject, state) {
  return TransformLogicSingleService$WonderEditor.getChildren(GameObjectLogicSingleService$WonderEditor.getTransformComponent(gameObject, state), state).map((function (transform) {
                return TransformLogicSingleService$WonderEditor.getGameObjectByTransform(transform, state);
              }));
}

function hasChildren(gameObject, state) {
  return +(getChildren(gameObject, state).length > 0);
}

function addBox(targetGameObject, param) {
  var match = PrimitiveLogicCompositeService$WonderEditor.createBox(param[1]);
  var box = match[1];
  return /* tuple */[
          box,
          /* tuple */[
            param[0],
            addChild(targetGameObject, box, GameObjectLogicSingleService$WonderEditor.initGameObject(box, match[0]))
          ]
        ];
}

export {
  addChild    ,
  getChildren ,
  hasChildren ,
  addBox      ,
  
}
/* TransformLogicSingleService-WonderEditor Not a pure module */
