'use strict';

import * as EditorStateLogicService$WonderEditor from "../service/logic_service/single/EditorStateLogicService.js";

var getState = EditorStateLogicService$WonderEditor.getState;

var setState = EditorStateLogicService$WonderEditor.setState;

var undo = EditorStateLogicService$WonderEditor.undo;

var redo = EditorStateLogicService$WonderEditor.redo;

var storeState = EditorStateLogicService$WonderEditor.storeEditorState;

export {
  getState   ,
  setState   ,
  undo       ,
  redo       ,
  storeState ,
  
}
/* EditorStateLogicService-WonderEditor Not a pure module */
