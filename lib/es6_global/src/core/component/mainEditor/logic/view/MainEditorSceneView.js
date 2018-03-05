'use strict';

import * as MainEditorSceneBuss$WonderEditor from "../bussiness/MainEditorSceneBuss.js";

var getCurrentGameObject = MainEditorSceneBuss$WonderEditor.getCurrentGameObject;

var unsafeGetCurrentGameObject = MainEditorSceneBuss$WonderEditor.unsafeGetCurrentGameObject;

var setCurrentGameObject = MainEditorSceneBuss$WonderEditor.setCurrentGameObject;

var clearCurrentGameObject = MainEditorSceneBuss$WonderEditor.clearCurrentGameObject;

var hasCurrentGameObject = MainEditorSceneBuss$WonderEditor.hasCurrentGameObject;

var unsafeGetScene = MainEditorSceneBuss$WonderEditor.unsafeGetScene;

var addBoxGameObject = MainEditorSceneBuss$WonderEditor.addBoxGameObject;

var disposeCurrentGameObject = MainEditorSceneBuss$WonderEditor.disposeCurrentGameObject;

var disposeGameObjectChildren = MainEditorSceneBuss$WonderEditor.disposeGameObjectChildren;

export {
  getCurrentGameObject       ,
  unsafeGetCurrentGameObject ,
  setCurrentGameObject       ,
  clearCurrentGameObject     ,
  hasCurrentGameObject       ,
  unsafeGetScene             ,
  addBoxGameObject           ,
  disposeCurrentGameObject   ,
  disposeGameObjectChildren  ,
  
}
/* MainEditorSceneBuss-WonderEditor Not a pure module */
