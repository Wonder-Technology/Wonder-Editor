'use strict';

import * as MainEditorSceneBuss$WonderEditor from "../bussiness/MainEditorSceneBuss.js";

var getCurrentGameObject = MainEditorSceneBuss$WonderEditor.getCurrentGameObject;

var setCurrentGameObject = MainEditorSceneBuss$WonderEditor.setCurrentGameObject;

var hasCurrentGameObject = MainEditorSceneBuss$WonderEditor.hasCurrentGameObject;

var unsafeGetScene = MainEditorSceneBuss$WonderEditor.unsafeGetScene;

var disposeGameObjectChildren = MainEditorSceneBuss$WonderEditor.disposeGameObjectChildren;

export {
  getCurrentGameObject      ,
  setCurrentGameObject      ,
  hasCurrentGameObject      ,
  unsafeGetScene            ,
  disposeGameObjectChildren ,
  
}
/* MainEditorSceneBuss-WonderEditor Not a pure module */
