'use strict';

import * as Js_option         from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Contract$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/definition/Contract.js";

function unsafeGetScene(editorState) {
  Contract$Wonderjs.requireCheck((function () {
          return Contract$Wonderjs.test("scene should exist", (function () {
                        return Contract$Wonderjs.assertExist(editorState[/* sceneData */0][/* scene */0]);
                      }));
        }));
  return Js_option.getExn(editorState[/* sceneData */0][/* scene */0]);
}

function setScene(scene, editorState) {
  return /* record */[/* sceneData : record */[
            /* scene : Some */[scene],
            /* currentGameObject */editorState[/* sceneData */0][/* currentGameObject */1]
          ]];
}

function hasCurrentGameObject(editorState) {
  var match = editorState[/* sceneData */0][/* currentGameObject */1];
  if (match) {
    return /* true */1;
  } else {
    return /* false */0;
  }
}

function getCurrentGameObject(editorState) {
  return editorState[/* sceneData */0][/* currentGameObject */1];
}

function setCurrentGameObject(gameObject, editorState) {
  return /* record */[/* sceneData : record */[
            /* scene */editorState[/* sceneData */0][/* scene */0],
            /* currentGameObject : Some */[gameObject]
          ]];
}

export {
  unsafeGetScene       ,
  setScene             ,
  hasCurrentGameObject ,
  getCurrentGameObject ,
  setCurrentGameObject ,
  
}
/* No side effect */
