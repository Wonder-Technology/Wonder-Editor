'use strict';

import * as EditorStateView$WonderEditor    from "../../../../logic/view/EditorStateView.js";
import * as EngineStateView$WonderEditor    from "../../../../logic/view/EngineStateView.js";
import * as MainEditorMainBuss$WonderEditor from "../bussiness/MainEditorMainBuss.js";

function _init(editorState) {
  var engineState = MainEditorMainBuss$WonderEditor.initEngineMain(/* () */0);
  var match = MainEditorMainBuss$WonderEditor.initEditor(/* tuple */[
        editorState,
        engineState
      ]);
  var engineState$1 = MainEditorMainBuss$WonderEditor.initEngineDirector(match[1]);
  return /* tuple */[
          match[0],
          engineState$1
        ];
}

var loopSetState = MainEditorMainBuss$WonderEditor.loopBody;

function _loop() {
  var _loopRequest = function () {
    return requestAnimationFrame((function (time) {
                  var engineState = EngineStateView$WonderEditor.getEngineState(/* () */0);
                  EngineStateView$WonderEditor.setEngineState(MainEditorMainBuss$WonderEditor.loopBody(time, engineState));
                  _loopRequest(time);
                  return /* () */0;
                }));
  };
  _loopRequest(0);
  return /* () */0;
}

function start() {
  var match = _init(EditorStateView$WonderEditor.getEditorState(/* () */0));
  _loop(/* () */0);
  return /* tuple */[
          EditorStateView$WonderEditor.setEditorState(match[0]),
          EngineStateView$WonderEditor.setEngineState(match[1])
        ];
}

var _initEditor = MainEditorMainBuss$WonderEditor.initEditor;

export {
  _initEditor  ,
  _init        ,
  loopSetState ,
  _loop        ,
  start        ,
  
}
/* EditorStateView-WonderEditor Not a pure module */
