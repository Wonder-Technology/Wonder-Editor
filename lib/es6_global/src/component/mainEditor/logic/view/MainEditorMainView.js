'use strict';

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

function _loop(stateTuple) {
  var _loopRequest = function (_, stateTuple) {
    return requestAnimationFrame((function (time) {
                  var match = MainEditorMainBuss$WonderEditor.loopBody(time, stateTuple);
                  var editorState = MainEditorMainBuss$WonderEditor.setEditorState(match[0]);
                  _loopRequest(time, /* tuple */[
                        editorState,
                        match[1]
                      ]);
                  return /* () */0;
                }));
  };
  _loopRequest(0, stateTuple);
  return /* () */0;
}

function start() {
  var match = _init(MainEditorMainBuss$WonderEditor.getEditorState(/* () */0));
  var engineState = match[1];
  var editorState = match[0];
  _loop(/* tuple */[
        editorState,
        engineState
      ]);
  return /* tuple */[
          MainEditorMainBuss$WonderEditor.setEditorState(editorState),
          MainEditorMainBuss$WonderEditor.setEngineState(engineState)
        ];
}

var _initEditor = MainEditorMainBuss$WonderEditor.initEditor;

export {
  _initEditor ,
  _init       ,
  _loop       ,
  start       ,
  
}
/* MainEditorMainBuss-WonderEditor Not a pure module */
