'use strict';

import * as MainEditorSceneBuss$WonderEditor from "../bussiness/MainEditorSceneBuss.js";

var getCurrentGameObject = MainEditorSceneBuss$WonderEditor.getCurrentGameObject;

var setCurrentGameObject = MainEditorSceneBuss$WonderEditor.setCurrentGameObject;

var hasCurrentGameObject = MainEditorSceneBuss$WonderEditor.hasCurrentGameObject;

var getScene = MainEditorSceneBuss$WonderEditor.getScene;

var disposeGameObjectChildren = MainEditorSceneBuss$WonderEditor.disposeGameObjectChildren;

export {
  getCurrentGameObject      ,
  setCurrentGameObject      ,
  hasCurrentGameObject      ,
  getScene                  ,
  disposeGameObjectChildren ,
  
}
/* MainEditorSceneBuss-WonderEditor Not a pure module */
