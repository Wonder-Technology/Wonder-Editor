'use strict';

import * as Caml_obj                              from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Contract$WonderEditor                 from "../../../../../../definition/Contract.js";
import * as OperateArrayUtils$WonderEditor        from "../../../../../utils/OperateArrayUtils.js";
import * as MainEditorSceneEdit$WonderEditor      from "../../../../logic/edit/MainEditorSceneEdit.js";
import * as MainEditorStateView$WonderEditor      from "../../../../logic/view/MainEditorStateView.js";
import * as MainEditorCameraOper$WonderEditor     from "../../../../logic/operator/MainEditorCameraOper.js";
import * as ExcepetionHandleSystem$WonderEditor   from "../../../../../../exception/ExcepetionHandleSystem.js";
import * as MainEditorTransformOper$WonderEditor  from "../../../../logic/operator/MainEditorTransformOper.js";
import * as MainEditorGameObjectOper$WonderEditor from "../../../../logic/operator/MainEditorGameObjectOper.js";

function _isExistSpecificGameObject(gameObjectArray) {
  var match = +(gameObjectArray.length > 0);
  if (match !== 0) {
    return /* true */1;
  } else {
    return /* false */0;
  }
}

function _iterateDragedObject(targetGameObject, dragedGameObject, engineState) {
  var match = MainEditorGameObjectOper$WonderEditor.hasChildren(dragedGameObject, engineState);
  if (match !== 0) {
    return _isExistSpecificGameObject(MainEditorGameObjectOper$WonderEditor.getChildren(dragedGameObject, engineState).filter((function (child) {
                      var match = +(child === targetGameObject);
                      if (match !== 0) {
                        return /* true */1;
                      } else {
                        return _iterateDragedObject(targetGameObject, child, engineState);
                      }
                    })));
  } else {
    return /* false */0;
  }
}

function isGameObjectRelationError(targetGameObject, dragedGameObject, param) {
  var match = +(targetGameObject === dragedGameObject);
  if (match !== 0) {
    return /* true */1;
  } else {
    return _iterateDragedObject(targetGameObject, dragedGameObject, param[1]);
  }
}

function setParent(parentGameObject, childGameObject, param) {
  var engineState = param[1];
  return /* tuple */[
          param[0],
          MainEditorTransformOper$WonderEditor.setParent(MainEditorGameObjectOper$WonderEditor.getTransformComponent(parentGameObject, engineState), MainEditorGameObjectOper$WonderEditor.getTransformComponent(childGameObject, engineState), engineState)
        ];
}

function _getGameObjectName(gameObject, engineState) {
  var match = MainEditorCameraOper$WonderEditor.isCamera(gameObject, engineState);
  if (match !== 0) {
    return "camera";
  } else {
    return "gameObject" + (String(gameObject) + "");
  }
}

function _buildTreeNode(gameObject, engineState) {
  return /* record */[
          /* name */_getGameObjectName(gameObject, engineState),
          /* uid */gameObject,
          /* children : array */[]
        ];
}

function _buildSceneGraphData(gameObject, engineState) {
  var _buildSceneGraphDataRec = function (gameObject, treeNode, engineState) {
    var match = MainEditorGameObjectOper$WonderEditor.hasChildren(gameObject, engineState);
    if (match !== 0) {
      return MainEditorGameObjectOper$WonderEditor.getChildren(gameObject, engineState).reduce((function (treeNode, child) {
                    return /* record */[
                            /* name */treeNode[/* name */0],
                            /* uid */treeNode[/* uid */1],
                            /* children */OperateArrayUtils$WonderEditor.push(_buildSceneGraphDataRec(child, _buildTreeNode(child, engineState), engineState), treeNode[/* children */2].slice())
                          ];
                  }), treeNode);
    } else {
      return treeNode;
    }
  };
  return _buildSceneGraphDataRec(gameObject, _buildTreeNode(gameObject, engineState), engineState);
}

function getSceneGraphDataFromEngine(param) {
  return /* array */[_buildSceneGraphData(MainEditorSceneEdit$WonderEditor.unsafeGetScene(param[0]), param[1])];
}

function _removeDragedTreeNodeFromSceneGrahph(dragedId, sceneGraphArrayData) {
  var _iterateSceneGraph = function (dragedId, sceneGraphArray, newSceneGraphArray, dragedTreeNode) {
    return sceneGraphArray.reduce((function (param, treeNode) {
                  var newSceneGraphArray = param[0];
                  var match = +(treeNode[/* uid */1] === dragedId);
                  if (match !== 0) {
                    return /* tuple */[
                            newSceneGraphArray,
                            /* Some */[treeNode]
                          ];
                  } else {
                    var match$1 = _iterateSceneGraph(dragedId, treeNode[/* children */2], /* array */[], param[1]);
                    return /* tuple */[
                            OperateArrayUtils$WonderEditor.push(/* record */[
                                  /* name */treeNode[/* name */0],
                                  /* uid */treeNode[/* uid */1],
                                  /* children */match$1[0]
                                ], newSceneGraphArray),
                            match$1[1]
                          ];
                  }
                }), /* tuple */[
                newSceneGraphArray,
                dragedTreeNode
              ]);
  };
  var match = _iterateSceneGraph(dragedId, sceneGraphArrayData, /* array */[], /* None */0);
  var match$1 = match[1];
  if (match$1) {
    return /* tuple */[
            match[0],
            match$1[0]
          ];
  } else {
    return ExcepetionHandleSystem$WonderEditor.throwMessage("the draged treeNode should exist");
  }
}

function _insertRemovedTreeNodeToTargetTreeNode(targetId, param) {
  var dragedTreeNode = param[1];
  return param[0].map((function (treeNode) {
                var children = treeNode[/* children */2];
                var match = +(treeNode[/* uid */1] === targetId);
                if (match !== 0) {
                  return /* record */[
                          /* name */treeNode[/* name */0],
                          /* uid */treeNode[/* uid */1],
                          /* children */OperateArrayUtils$WonderEditor.push(dragedTreeNode, children)
                        ];
                } else {
                  return /* record */[
                          /* name */treeNode[/* name */0],
                          /* uid */treeNode[/* uid */1],
                          /* children */_insertRemovedTreeNodeToTargetTreeNode(targetId, /* tuple */[
                                children,
                                dragedTreeNode
                              ])
                        ];
                }
              }));
}

function getDragedSceneGraphData(targetId, dragedId, sceneGraphArrayData) {
  return Contract$WonderEditor.ensureCheck((function (result) {
                return Contract$WonderEditor.test("the draged scene graph data should == scene graph data from engine", (function () {
                              var sceneGraphFromEngine = getSceneGraphDataFromEngine(MainEditorStateView$WonderEditor.prepareState(/* () */0));
                              return Contract$WonderEditor.assertTrue(Caml_obj.caml_equal(sceneGraphFromEngine, result));
                            }));
              }), _insertRemovedTreeNodeToTargetTreeNode(targetId, _removeDragedTreeNodeFromSceneGrahph(dragedId, sceneGraphArrayData)));
}

export {
  _isExistSpecificGameObject             ,
  _iterateDragedObject                   ,
  isGameObjectRelationError              ,
  setParent                              ,
  _getGameObjectName                     ,
  _buildTreeNode                         ,
  _buildSceneGraphData                   ,
  getSceneGraphDataFromEngine            ,
  _removeDragedTreeNodeFromSceneGrahph   ,
  _insertRemovedTreeNodeToTargetTreeNode ,
  getDragedSceneGraphData                ,
  
}
/* Contract-WonderEditor Not a pure module */
