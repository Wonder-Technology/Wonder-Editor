'use strict';

import * as TransformLogicService$WonderEditor     from "../single/TransformLogicService.js";
import * as GameObjectLogicService$WonderEditor    from "../single/GameObjectLogicService.js";
import * as PrimitiveCompositeService$WonderEditor from "./PrimitiveCompositeService.js";

function addChild(parent, child, state) {
  return TransformLogicService$WonderEditor.setParent(GameObjectLogicService$WonderEditor.getTransformComponent(parent, state), GameObjectLogicService$WonderEditor.getTransformComponent(child, state), state);
}

function getChildren(gameObject, state) {
  return TransformLogicService$WonderEditor.getChildren(GameObjectLogicService$WonderEditor.getTransformComponent(gameObject, state), state).map((function (transform) {
                return TransformLogicService$WonderEditor.getGameObjectByTransform(transform, state);
              }));
}

function hasChildren(gameObject, state) {
  return +(getChildren(gameObject, state).length > 0);
}

function addBox(targetGameObject, param) {
  var match = PrimitiveCompositeService$WonderEditor.createBox(param[1]);
  var box = match[1];
  return /* tuple */[
          box,
          /* tuple */[
            param[0],
            addChild(targetGameObject, box, GameObjectLogicService$WonderEditor.initGameObject(box, match[0]))
          ]
        ];
}

export {
  addChild    ,
  getChildren ,
  hasChildren ,
  addBox      ,
  
}
/* TransformLogicService-WonderEditor Not a pure module */
