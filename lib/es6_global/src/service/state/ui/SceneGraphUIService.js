'use strict';

import * as Caml_obj                             from "../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Log$WonderLog                        from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog                   from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as ArrayService$WonderEditor            from "../../atom/ArrayService.js";
import * as StateLogicService$WonderEditor       from "../../stateTuple/StateLogicService.js";
import * as StateEditorService$WonderEditor      from "../editor/StateEditorService.js";
import * as SceneGraphEngineService$WonderEditor from "../engine/SceneGraphEngineService.js";

function _removeDragedTreeNodeFromSceneGrahph(dragedUid, sceneGraphArrayData) {
  var _iterateSceneGraph = function (dragedUid, sceneGraphArray, newSceneGraphArray, dragedTreeNode) {
    return sceneGraphArray.reduce((function (param, treeNode) {
                  var newSceneGraphArray = param[0];
                  var match = +(treeNode[/* uid */1] === dragedUid);
                  if (match !== 0) {
                    return /* tuple */[
                            newSceneGraphArray,
                            /* Some */[treeNode]
                          ];
                  } else {
                    var match$1 = _iterateSceneGraph(dragedUid, treeNode[/* children */2], /* array */[], param[1]);
                    return /* tuple */[
                            ArrayService$WonderEditor.push(/* record */[
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
  var match = _iterateSceneGraph(dragedUid, sceneGraphArrayData, /* array */[], /* None */0);
  var match$1 = match[1];
  if (match$1) {
    return /* tuple */[
            match[0],
            match$1[0]
          ];
  } else {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_removeDragedTreeNodeFromSceneGrahph", "the draged treeNode " + (String(dragedUid) + " is not exist"), "", "", "dragedUid:" + (String(dragedUid) + "")));
  }
}

function _insertRemovedTreeNodeToTargetTreeNode(targetUid, param) {
  var dragedTreeNode = param[1];
  return param[0].map((function (treeNode) {
                var children = treeNode[/* children */2];
                var match = +(treeNode[/* uid */1] === targetUid);
                if (match !== 0) {
                  return /* record */[
                          /* name */treeNode[/* name */0],
                          /* uid */treeNode[/* uid */1],
                          /* children */ArrayService$WonderEditor.push(dragedTreeNode, children)
                        ];
                } else {
                  return /* record */[
                          /* name */treeNode[/* name */0],
                          /* uid */treeNode[/* uid */1],
                          /* children */_insertRemovedTreeNodeToTargetTreeNode(targetUid, /* tuple */[
                                children,
                                dragedTreeNode
                              ])
                        ];
                }
              }));
}

function getDragedSceneGraphData(targetUid, dragedUid, sceneGraphArrayData) {
  return Contract$WonderLog.ensureCheck((function (dragedSceneGraph) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("the draged scene graph data == scene data from engine", "not"), (function () {
                              return Contract$WonderLog.assertTrue(Caml_obj.caml_equal(StateLogicService$WonderEditor.getState(SceneGraphEngineService$WonderEditor.getSceneGraphDataFromEngine), dragedSceneGraph));
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), _insertRemovedTreeNodeToTargetTreeNode(targetUid, _removeDragedTreeNodeFromSceneGrahph(dragedUid, sceneGraphArrayData)));
}

export {
  _removeDragedTreeNodeFromSceneGrahph   ,
  _insertRemovedTreeNodeToTargetTreeNode ,
  getDragedSceneGraphData                ,
  
}
/* Log-WonderLog Not a pure module */
