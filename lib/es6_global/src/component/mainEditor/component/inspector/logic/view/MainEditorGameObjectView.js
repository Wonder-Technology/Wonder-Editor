'use strict';

import * as Js_option                             from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as Pervasives                            from "../../../../../../../../../node_modules/bs-platform/lib/es6/pervasives.js";
import * as Log$WonderLog                         from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as OperateArrayUtils$WonderEditor        from "../../../../../../utils/OperateArrayUtils.js";
import * as MainEditorGameObjectBuss$WonderEditor from "../buss/MainEditorGameObjectBuss.js";

function _operateSpecificComponent(gameObject, componentName, stateTuple) {
  switch (componentName) {
    case "boxGeometry" : 
        var match = MainEditorGameObjectBuss$WonderEditor.hasBoxGeometryComponent(gameObject, stateTuple);
        if (match !== 0) {
          return MainEditorGameObjectBuss$WonderEditor.getBoxGeometryComponent(gameObject, stateTuple);
        } else {
          return -1;
        }
    case "cameraController" : 
        var match$1 = MainEditorGameObjectBuss$WonderEditor.hasCameraControllerComponent(gameObject, stateTuple);
        if (match$1 !== 0) {
          return MainEditorGameObjectBuss$WonderEditor.getCameraControllerComponent(gameObject, stateTuple);
        } else {
          return -1;
        }
    case "material" : 
        var match$2 = MainEditorGameObjectBuss$WonderEditor.hasMaterialComponent(gameObject, stateTuple);
        if (match$2 !== 0) {
          return MainEditorGameObjectBuss$WonderEditor.getMaterialComponent(gameObject, stateTuple);
        } else {
          return -1;
        }
    case "sourceInstance" : 
        var match$3 = MainEditorGameObjectBuss$WonderEditor.hasSourceInstanceComponent(gameObject, stateTuple);
        if (match$3 !== 0) {
          return Js_option.getExn(MainEditorGameObjectBuss$WonderEditor.getSourceInstanceComponent(gameObject, stateTuple));
        } else {
          return -1;
        }
    case "transform" : 
        var match$4 = MainEditorGameObjectBuss$WonderEditor.hasTransformComponent(gameObject, stateTuple);
        if (match$4 !== 0) {
          return MainEditorGameObjectBuss$WonderEditor.getTransformComponent(gameObject, stateTuple);
        } else {
          return -1;
        }
    default:
      return Log$WonderLog.fatal(Log$WonderLog.buildErrorMessage("_getGameObjectSpecificComponent", "specific component:" + (String(componentName) + " is error"), "", "", "gameObject:" + (String(gameObject) + (", component:" + (String(componentName) + "")))));
  }
}

function _isSpecificComponentExist(includeComponent, excludeComponent, gameObject, stateTuple) {
  var len = includeComponent.filter((function (item) {
          return +(_operateSpecificComponent(gameObject, item, stateTuple) !== -1);
        })).length;
  if (len === includeComponent.length) {
    return +(excludeComponent.filter((function (item) {
                    return +(_operateSpecificComponent(gameObject, item, stateTuple) !== -1);
                  })).length === 0);
  } else {
    return /* false */0;
  }
}

function buildCurrentGameObjectShowComponentList(gameObject, allShowComponentConfig, stateTuple) {
  var gameObjectType = OperateArrayUtils$WonderEditor.getFirst(allShowComponentConfig.filter((function (gameObjectType) {
              return _isSpecificComponentExist(gameObjectType[/* include_component */1], gameObjectType[/* exclude_component */2], gameObject, stateTuple);
            })));
  return gameObjectType[/* all_component */3].reduce((function (param, item) {
                var notExistComponentList = param[1];
                var existComponentList = param[0];
                var component = _operateSpecificComponent(gameObject, item[/* type_ */0], stateTuple);
                var match = +(component !== -1);
                if (match !== 0) {
                  return /* tuple */[
                          Pervasives.$at(existComponentList, /* :: */[
                                /* tuple */[
                                  item[/* type_ */0],
                                  component
                                ],
                                /* [] */0
                              ]),
                          notExistComponentList
                        ];
                } else {
                  return /* tuple */[
                          existComponentList,
                          Pervasives.$at(notExistComponentList, /* :: */[
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
  _operateSpecificComponent               ,
  _isSpecificComponentExist               ,
  buildCurrentGameObjectShowComponentList ,
  
}
/* Log-WonderLog Not a pure module */
