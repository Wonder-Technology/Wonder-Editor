'use strict';

import * as Js_option         from "../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Contract$Wonderjs from "../../../../../../../node_modules/wonder.js/lib/es6_global/src/definition/Contract.js";

function getScene(editorState) {
  return Contract$Wonderjs.ensureCheck((function () {
                return Contract$Wonderjs.test("scene should exist", (function () {
                              return Contract$Wonderjs.assertExist(editorState[/* sceneData */0][/* scene */0]);
                            }));
              }), Js_option.getExn(editorState[/* sceneData */0][/* scene */0]));
}

function setScene(scene, editorState) {
  editorState[/* sceneData */0][/* scene */0] = /* Some */[scene];
  return editorState;
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
  return Js_option.getExn(editorState[/* sceneData */0][/* currentGameObject */1]);
}

function setCurrentGameObject(gameObject, editorState) {
  editorState[/* sceneData */0][/* currentGameObject */1] = /* Some */[gameObject];
  return editorState;
}

function initData() {
  return /* record */[
          /* scene : None */0,
          /* currentGameObject : None */0
        ];
}

export {
  getScene             ,
  setScene             ,
  hasCurrentGameObject ,
  getCurrentGameObject ,
  setCurrentGameObject ,
  initData             ,
  
}
/* No side effect */
