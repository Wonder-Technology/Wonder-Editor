'use strict';

import * as Curry                                 from "../../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Pervasives                            from "../../../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Log$WonderLog                         from "../../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as OperateArrayUtils$WonderEditor        from "../../../../../../utils/OperateArrayUtils.js";
import * as MainEditorGameObjectBuss$WonderEditor from "../buss/MainEditorGameObjectBuss.js";

function _getComponent(gameObject, hasComponent, getComponent, stateTuple) {
  var match = Curry._2(hasComponent, gameObject, stateTuple);
  if (match !== 0) {
    return Curry._2(getComponent, gameObject, stateTuple);
  } else {
    return -1;
  }
}

function _operateSpecificComponent(gameObject, componentName, stateTuple) {
  switch (componentName) {
    case "boxGeometry" : 
        return _getComponent(gameObject, MainEditorGameObjectBuss$WonderEditor.hasBoxGeometryComponent, MainEditorGameObjectBuss$WonderEditor.getBoxGeometryComponent, stateTuple);
    case "cameraController" : 
        return _getComponent(gameObject, MainEditorGameObjectBuss$WonderEditor.hasCameraControllerComponent, MainEditorGameObjectBuss$WonderEditor.getCameraControllerComponent, stateTuple);
    case "material" : 
        return _getComponent(gameObject, MainEditorGameObjectBuss$WonderEditor.hasMaterialComponent, MainEditorGameObjectBuss$WonderEditor.getMaterialComponent, stateTuple);
    case "sourceInstance" : 
        return _getComponent(gameObject, MainEditorGameObjectBuss$WonderEditor.hasSourceInstanceComponent, MainEditorGameObjectBuss$WonderEditor.getSourceInstanceComponent, stateTuple);
    case "transform" : 
        return _getComponent(gameObject, MainEditorGameObjectBuss$WonderEditor.hasTransformComponent, MainEditorGameObjectBuss$WonderEditor.getTransformComponent, stateTuple);
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildErrorMessage("_getGameObjectSpecificComponent", "specific component:" + (String(componentName) + " is error"), "", "", "gameObject:" + (String(gameObject) + (", component:" + (String(componentName) + "")))));
  }
}

function buildCurrentGameObjectShowComponentList(gameObject, allShowComponentConfig, stateTuple) {
  var gameObjectType = OperateArrayUtils$WonderEditor.getFirst(allShowComponentConfig.filter((function (gameObjectType) {
              var includeComponent = gameObjectType[/* include_component */1];
              var excludeComponent = gameObjectType[/* exclude_component */2];
              var gameObject$1 = gameObject;
              var stateTuple$1 = stateTuple;
              var len = includeComponent.filter((function (item) {
                      return +(_operateSpecificComponent(gameObject$1, item, stateTuple$1) !== -1);
                    })).length;
              if (len === includeComponent.length) {
                return +(excludeComponent.filter((function (item) {
                                return +(_operateSpecificComponent(gameObject$1, item, stateTuple$1) !== -1);
                              })).length === 0);
              } else {
                return /* false */0;
              }
            })));
  return gameObjectType[/* all_component */3].reduce((function (param, item) {
                var addableComponentList = param[1];
                var addedComponentList = param[0];
                var component = _operateSpecificComponent(gameObject, item[/* type_ */0], stateTuple);
                var match = +(component !== -1);
                if (match !== 0) {
                  return /* tuple */[
                          Pervasives.$at(addedComponentList, /* :: */[
                                /* tuple */[
                                  item[/* type_ */0],
                                  component
                                ],
                                /* [] */0
                              ]),
                          addableComponentList
                        ];
                } else {
                  return /* tuple */[
                          addedComponentList,
                          Pervasives.$at(addableComponentList, /* :: */[
                                item[/* type_ */0],
                                /* [] */0
                              ])
                        ];
                }
              }), /* tuple */[
              /* [] */0,
              /* [] */0
            ]);
}

export {
  buildCurrentGameObjectShowComponentList ,
  
}
/* Log-WonderLog Not a pure module */
