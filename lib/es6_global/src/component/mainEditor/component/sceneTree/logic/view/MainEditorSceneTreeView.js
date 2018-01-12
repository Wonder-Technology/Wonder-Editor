'use strict';

import * as MainEditorSceneTreeBuss$WonderEditor from "../buss/MainEditorSceneTreeBuss.js";

var getDragedSceneGraphData = MainEditorSceneTreeBuss$WonderEditor.getDragedSceneGraphData;

var setParent = MainEditorSceneTreeBuss$WonderEditor.setParent;

var isGameObjectRelationError = MainEditorSceneTreeBuss$WonderEditor.isGameObjectRelationError;

var getSceneGraphDataFromEngine = MainEditorSceneTreeBuss$WonderEditor.getSceneGraphDataFromEngine;

export {
  getDragedSceneGraphData     ,
  setParent                   ,
  isGameObjectRelationError   ,
  getSceneGraphDataFromEngine ,
  
}
/* MainEditorSceneTreeBuss-WonderEditor Not a pure module */
