'use strict';

import * as EditorStateLogicSingleService$WonderEditor from "../service/logic_service/single/EditorStateLogicSingleService.js";

var getState = EditorStateLogicSingleService$WonderEditor.getState;

var setState = EditorStateLogicSingleService$WonderEditor.setState;

var undo = EditorStateLogicSingleService$WonderEditor.undo;

var redo = EditorStateLogicSingleService$WonderEditor.redo;

var storeState = EditorStateLogicSingleService$WonderEditor.storeEditorState;

export {
  getState   ,
  setState   ,
  undo       ,
  redo       ,
  storeState ,
  
}
/* EditorStateLogicSingleService-WonderEditor Not a pure module */
