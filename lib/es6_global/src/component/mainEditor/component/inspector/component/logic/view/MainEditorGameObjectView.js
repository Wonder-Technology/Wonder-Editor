'use strict';

import * as Curry                                 from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Pervasives                            from "../../../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as MainEditorGameObjectBuss$WonderEditor from "../buss/MainEditorGameObjectBuss.js";

function _buildSpecificComponentTuple(name, gameObject, hasComponentFunc, getComponentFunc, stateTuple, componentList) {
  var match = Curry._2(hasComponentFunc, gameObject, stateTuple);
  if (match !== 0) {
    return Pervasives.$at(componentList, /* :: */[
                /* tuple */[
                  name,
                  Curry._2(getComponentFunc, gameObject, stateTuple)
                ],
                /* [] */0
              ]);
  } else {
    return componentList;
  }
}

function getCurrentGameObjectAllComponentsList(gameObject, stateTuple) {
  return _buildSpecificComponentTuple("cameraController", gameObject, MainEditorGameObjectBuss$WonderEditor.hasCameraControllerComponent, MainEditorGameObjectBuss$WonderEditor.getCameraControllerComponent, stateTuple, _buildSpecificComponentTuple("material", gameObject, MainEditorGameObjectBuss$WonderEditor.hasMaterialComponent, MainEditorGameObjectBuss$WonderEditor.getMaterialComponent, stateTuple, _buildSpecificComponentTuple("transform", gameObject, MainEditorGameObjectBuss$WonderEditor.hasTransformComponent, MainEditorGameObjectBuss$WonderEditor.getTransformComponent, stateTuple, /* [] */0)));
}

var getGameObjectAllShowInspectorComponent = MainEditorGameObjectBuss$WonderEditor.getGameObjectAllShowInspectorComponent;

export {
  getGameObjectAllShowInspectorComponent ,
  _buildSpecificComponentTuple           ,
  getCurrentGameObjectAllComponentsList  ,
  
}
/* MainEditorGameObjectBuss-WonderEditor Not a pure module */
