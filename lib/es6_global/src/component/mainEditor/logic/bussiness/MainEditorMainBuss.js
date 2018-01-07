'use strict';

import * as EngineStateOper$WonderEditor          from "../../../../logic/operator/EngineStateOper.js";
import * as MainEditorMainOper$WonderEditor       from "../operator/MainEditorMainOper.js";
import * as EditorStateDataEdit$WonderEditor      from "../../../../logic/edit/EditorStateDataEdit.js";
import * as MainEditorSceneEdit$WonderEditor      from "../edit/MainEditorSceneEdit.js";
import * as MainEditorSceneOper$WonderEditor      from "../operator/MainEditorSceneOper.js";
import * as EditorStateSystemEdit$WonderEditor    from "../../../../logic/edit/EditorStateSystemEdit.js";
import * as MainEditorDirectorOper$WonderEditor   from "../operator/MainEditorDirectorOper.js";
import * as MainEditorGameObjectOper$WonderEditor from "../operator/MainEditorGameObjectOper.js";

function getEditorState() {
  return EditorStateSystemEdit$WonderEditor.getState(EditorStateDataEdit$WonderEditor.stateData);
}

function setEditorState(editorState) {
  return EditorStateSystemEdit$WonderEditor.setState(EditorStateDataEdit$WonderEditor.stateData, editorState);
}

function getEngineState() {
  return EngineStateOper$WonderEditor.getState(/* () */0);
}

var setEngineState = EngineStateOper$WonderEditor.setState;

function initEngineMain() {
  return MainEditorMainOper$WonderEditor.init("webgl", true);
}

var initEngineDirector = MainEditorDirectorOper$WonderEditor.init;

function initEditor(param) {
  var match = MainEditorGameObjectOper$WonderEditor.create(param[1]);
  var scene = match[1];
  var editorState = MainEditorSceneEdit$WonderEditor.setScene(scene, param[0]);
  var match$1 = MainEditorSceneOper$WonderEditor.createDefaultSceneGameObjects(match[0]);
  var engineState = MainEditorGameObjectOper$WonderEditor.addChild(scene, match$1[3], MainEditorGameObjectOper$WonderEditor.addChild(scene, match$1[2], MainEditorGameObjectOper$WonderEditor.addChild(scene, match$1[1], match$1[0])));
  return /* tuple */[
          editorState,
          engineState
        ];
}

function loopBody(time, param) {
  var engineState = MainEditorDirectorOper$WonderEditor.loopBody(time, param[1]);
  return /* tuple */[
          param[0],
          engineState
        ];
}

export {
  getEditorState     ,
  setEditorState     ,
  getEngineState     ,
  setEngineState     ,
  initEngineMain     ,
  initEngineDirector ,
  initEditor         ,
  loopBody           ,
  
}
/* EngineStateOper-WonderEditor Not a pure module */
