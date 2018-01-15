'use strict';

import * as Curry                                 from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Pervasives                            from "../../../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as MainEditorGameObjectBuss$WonderEditor from "../buss/MainEditorGameObjectBuss.js";

function _buildSpecificComponentTuple(param, param$1, stateTuple, componentList) {
  var gameObject = param[1];
  var match = Curry._2(param$1[0], gameObject, stateTuple);
  if (match !== 0) {
    return Pervasives.$at(componentList, /* :: */[
                /* tuple */[
                  param[0],
                  Curry._2(param$1[1], gameObject, stateTuple)
                ],
                /* [] */0
              ]);
  } else {
    return componentList;
  }
}

function getCurrentGameObjectAllComponentList(gameObject, stateTuple) {
  return _buildSpecificComponentTuple(/* tuple */[
              "cameraController",
              gameObject
            ], /* tuple */[
              MainEditorGameObjectBuss$WonderEditor.hasCameraControllerComponent,
              MainEditorGameObjectBuss$WonderEditor.getCameraControllerComponent
            ], stateTuple, _buildSpecificComponentTuple(/* tuple */[
                  "material",
                  gameObject
                ], /* tuple */[
                  MainEditorGameObjectBuss$WonderEditor.hasMaterialComponent,
                  MainEditorGameObjectBuss$WonderEditor.getMaterialComponent
                ], stateTuple, _buildSpecificComponentTuple(/* tuple */[
                      "transform",
                      gameObject
                    ], /* tuple */[
                      MainEditorGameObjectBuss$WonderEditor.hasTransformComponent,
                      MainEditorGameObjectBuss$WonderEditor.getTransformComponent
                    ], stateTuple, /* [] */0)));
}

var getGameObjectAllShowInspectorComponent = MainEditorGameObjectBuss$WonderEditor.getGameObjectAllShowInspectorComponent;

export {
  getGameObjectAllShowInspectorComponent ,
  _buildSpecificComponentTuple           ,
  getCurrentGameObjectAllComponentList   ,
  
}
/* MainEditorGameObjectBuss-WonderEditor Not a pure module */
