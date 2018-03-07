'use strict';

import * as MainEditorMainOper$WonderEditor              from "../operator/MainEditorMainOper.js";
import * as MainEditorSceneEdit$WonderEditor             from "../edit/MainEditorSceneEdit.js";
import * as MainEditorDirectorOper$WonderEditor          from "../operator/MainEditorDirectorOper.js";
import * as SceneLogicCompositeService$WonderEditor      from "../../../../../service/logic_service/composite/SceneLogicCompositeService.js";
import * as GameObjectLogicSingleService$WonderEditor    from "../../../../../service/logic_service/single/GameObjectLogicSingleService.js";
import * as GameObjectLogicCompositeService$WonderEditor from "../../../../../service/logic_service/composite/GameObjectLogicCompositeService.js";

function initEngineMain() {
  return MainEditorMainOper$WonderEditor.init("webgl", true);
}

var initEngineDirector = MainEditorDirectorOper$WonderEditor.init;

function initEditor(param) {
  var match = GameObjectLogicSingleService$WonderEditor.create(param[1]);
  var scene = match[1];
  var editorState = MainEditorSceneEdit$WonderEditor.setScene(scene, param[0]);
  var match$1 = SceneLogicCompositeService$WonderEditor.createDefaultSceneGameObjects(match[0]);
  var engineState = GameObjectLogicCompositeService$WonderEditor.addChild(scene, match$1[3], GameObjectLogicCompositeService$WonderEditor.addChild(scene, match$1[2], GameObjectLogicCompositeService$WonderEditor.addChild(scene, match$1[1], match$1[0])));
  return /* tuple */[
          editorState,
          engineState
        ];
}

var loopBody = MainEditorDirectorOper$WonderEditor.loopBody;

export {
  initEngineMain     ,
  initEngineDirector ,
  initEditor         ,
  loopBody           ,
  
}
/* MainEditorMainOper-WonderEditor Not a pure module */
