'use strict';

import * as MainEditorStateView$WonderEditor     from "../component/mainEditor/logic/view/MainEditorStateView.js";
import * as MainEditorSceneTreeView$WonderEditor from "../component/mainEditor/component/sceneTree/logic/view/MainEditorSceneTreeView.js";

function getSceneGraphFromEngine() {
  return MainEditorSceneTreeView$WonderEditor.getSceneGraphDataFromEngine(MainEditorStateView$WonderEditor.prepareState(/* () */0));
}

export {
  getSceneGraphFromEngine ,
  
}
/* MainEditorStateView-WonderEditor Not a pure module */
