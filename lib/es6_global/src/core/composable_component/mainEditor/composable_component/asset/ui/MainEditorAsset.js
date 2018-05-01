'use strict';

import * as Most                             from "most";
import * as $$Array                          from "../../../../../../../../../node_modules/bs-platform/lib/es6/array.js";
import * as Curry                            from "../../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React                            from "react";
import * as Js_dict                          from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_dict.js";
import * as Caml_obj                         from "../../../../../../../../../node_modules/bs-platform/lib/es6/caml_obj.js";
import * as Js_boolean                       from "../../../../../../../../../node_modules/bs-platform/lib/es6/js_boolean.js";
import * as ReasonReact                      from "../../../../../../../../../node_modules/reason-react/lib/es6_global/src/reasonReact.js";
import * as Log$WonderLog                    from "../../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Css$WonderEditor                 from "../../../../../external/Css.js";
import * as File$WonderEditor                from "../../../../../external/File.js";
import * as AppStore$WonderEditor            from "../../../../../ui/store/AppStore.js";
import * as TreeNode$WonderEditor            from "../../../../../atom_component/dragTree/component/treeNode/TreeNode.js";
import * as DomHelper$WonderEditor           from "../../../../../external/DomHelper.js";
import * as FileUtils$WonderEditor           from "../utils/FileUtils.js";
import * as AssetUtils$WonderEditor          from "../utils/AssetUtils.js";
import * as ArrayService$WonderEditor        from "../../../../../../service/atom/ArrayService.js";
import * as StateLogicService$WonderEditor   from "../../../../../../service/stateTuple/logic/StateLogicService.js";
import * as AssetEditorService$WonderEditor  from "../../../../../../service/state/editor/AssetEditorService.js";
import * as StateEditorService$WonderEditor  from "../../../../../../service/state/editor/StateEditorService.js";
import * as SparseMapService$WonderCommonlib from "../../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";

import '../../../../../../../../../src/core/composable_component/mainEditor/composable_component/asset/ui/css/mainEditorAsset.css';

function onSelect(dispatch, id) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (param) {
          return AssetEditorService$WonderEditor.setCurrentTreeNode(id, param);
        }));
  Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

function onDrop(dispatch, param) {
  var removedId = param[1];
  var targetId = param[0];
  var match = +(targetId === removedId);
  if (match !== 0) {
    return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  } else {
    var editorState = StateEditorService$WonderEditor.getState(/* () */0);
    var match$1 = AssetUtils$WonderEditor.removeSpecificTreeNodeFromAssetTree(removedId, AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState));
    StateEditorService$WonderEditor.setState(AssetEditorService$WonderEditor.setAsseTree(AssetUtils$WonderEditor.insertNewTreeNodeToTargetTreeNode(targetId, match$1[1], match$1[0]), editorState));
    return Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  }
}

function removeFolder(dispatch, _) {
  var match = StateLogicService$WonderEditor.getEditorState(AssetUtils$WonderEditor.isTargetIdEqualRootId);
  if (match !== 0) {
    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("removeFolder", "can\'t remove root folder", "", "", ""));
  } else {
    StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
            var match = AssetUtils$WonderEditor.removeSpecificTreeNodeFromAssetTree(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState), AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState));
            return AssetEditorService$WonderEditor.clearCurrentTreeNode(AssetEditorService$WonderEditor.setAsseTree(match[0], editorState));
          }));
    Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
    return /* () */0;
  }
}

function addFolder(dispatch, _) {
  StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
          var match = AssetUtils$WonderEditor.increaseIndex(editorState);
          var editorState$1 = match[1];
          return AssetEditorService$WonderEditor.setAsseTree(AssetUtils$WonderEditor.insertNewTreeNodeToTargetTreeNode(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState$1), AssetUtils$WonderEditor.buildAssetTreeNodeByIndex(match[0]), AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState$1)), editorState$1);
        }));
  Curry._1(dispatch, AppStore$WonderEditor.ReLoad);
  return /* () */0;
}

function fileLoad(dispatch, $$event) {
  DomHelper$WonderEditor.preventDefault($$event);
  var fileInfoArr = Js_dict.values($$event.target.files).map(FileUtils$WonderEditor.convertFileJsObjectToFileInfoRecord);
  Most.forEach(FileUtils$WonderEditor.handleFileByType, Most.flatMap((function (fileInfo) {
                return Most.fromPromise(new Promise((function (resolve, _) {
                                  var reader = new FileReader();
                                  Curry._2(File$WonderEditor.onload, reader, (function (result) {
                                          return resolve(/* record */[
                                                      /* name */fileInfo[/* name */0],
                                                      /* type_ */fileInfo[/* type_ */1],
                                                      /* result */result
                                                    ]);
                                        }));
                                  return FileUtils$WonderEditor.readFileByType(reader, fileInfo);
                                })));
              }), Most.from(fileInfoArr))).then((function () {
          return Promise.resolve(Curry._1(dispatch, AppStore$WonderEditor.ReLoad));
        }));
  return /* () */0;
}

function _isCurrentTreeNode(id) {
  var match = StateLogicService$WonderEditor.getEditorState(AssetEditorService$WonderEditor.getCurrentTreeNode);
  if (match) {
    var match$1 = +(match[0] === id);
    if (match$1 !== 0) {
      return /* true */1;
    } else {
      return /* false */0;
    }
  } else {
    return /* false */0;
  }
}

function _isNotRoot(uid) {
  return StateLogicService$WonderEditor.getEditorState((function (editorState) {
                return +(AssetUtils$WonderEditor.getRootTreeNodeId(editorState) !== uid);
              }));
}

function buildAssetTreeArray(onSelect, onDrop, assetTree) {
  return $$Array.map((function (param) {
                var children = param[/* children */3];
                var name = param[/* name */1];
                var id = param[/* id */0];
                var match = ArrayService$WonderEditor.hasItem(children);
                if (match !== 0) {
                  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                  id,
                                  name,
                                  _isCurrentTreeNode(id)
                                ], /* tuple */[
                                  onSelect,
                                  onDrop
                                ], "asset", /* Some */["./public/img/12.jpg"], /* Some */[_isNotRoot(id)], /* Some */[buildAssetTreeArray(onSelect, onDrop, children)], /* array */[]));
                } else {
                  return ReasonReact.element(/* Some */[DomHelper$WonderEditor.getRandomKey(/* () */0)], /* None */0, TreeNode$WonderEditor.make(/* tuple */[
                                  id,
                                  name,
                                  _isCurrentTreeNode(id)
                                ], /* tuple */[
                                  onSelect,
                                  onDrop
                                ], "asset", /* Some */["./public/img/12.jpg"], /* Some */[_isNotRoot(id)], /* None */0, /* array */[]));
                }
              }), assetTree);
}

function showSpecificTreeNodeImage(fileMap, imgArr) {
  return imgArr.map((function (img) {
                var imgResult = SparseMapService$WonderCommonlib.unsafeGet(img, fileMap);
                return React.createElement("img", {
                            key: DomHelper$WonderEditor.getRandomKey(/* () */0),
                            src: imgResult[/* result */2]
                          });
              }));
}

function buildContent() {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var match = AssetEditorService$WonderEditor.getAssetTree(editorState);
  if (match) {
    var currentTreeNode = AssetUtils$WonderEditor.getTreeNodeById(AssetUtils$WonderEditor.getTargetTreeNodeId(editorState), ArrayService$WonderEditor.getFirst(match[0]));
    if (currentTreeNode) {
      return showSpecificTreeNodeImage(AssetEditorService$WonderEditor.getFileMap(editorState), currentTreeNode[0][/* imgArray */2]);
    } else {
      return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("buildContent", "the treeNode:" + (String(currentTreeNode) + " not exist in assetTree"), "", "", ""));
    }
  } else {
    return /* array */[];
  }
}

var Method = /* module */[
  /* onSelect */onSelect,
  /* onDrop */onDrop,
  /* removeFolder */removeFolder,
  /* addFolder */addFolder,
  /* fileLoad */fileLoad,
  /* _isCurrentTreeNode */_isCurrentTreeNode,
  /* _isNotRoot */_isNotRoot,
  /* buildAssetTreeArray */buildAssetTreeArray,
  /* showSpecificTreeNodeImage */showSpecificTreeNodeImage,
  /* buildContent */buildContent
];

var component = ReasonReact.statelessComponentWithRetainedProps("MainEditorAsset");

function render(_, dispatch, _$1) {
  return React.createElement("article", {
              key: "asset",
              className: "asset-component"
            }, React.createElement("div", {
                  className: "asset-tree"
                }, React.createElement("div", {
                      className: "tree-header"
                    }, React.createElement("button", {
                          onClick: (function (param) {
                              return addFolder(dispatch, param);
                            })
                        }, DomHelper$WonderEditor.textEl("addFolder")), React.createElement("button", {
                          disabled: Js_boolean.to_js_boolean(StateLogicService$WonderEditor.getEditorState(AssetUtils$WonderEditor.isTargetIdEqualRootId)),
                          onClick: (function (param) {
                              return removeFolder(dispatch, param);
                            })
                        }, DomHelper$WonderEditor.textEl("remove")), React.createElement("input", {
                          className: "file-upload",
                          multiple: true,
                          type: "file",
                          onChange: (function (e) {
                              return fileLoad(dispatch, e);
                            })
                        })), StateLogicService$WonderEditor.getEditorState((function (editorState) {
                        return buildAssetTreeArray((function (param) {
                                      return onSelect(dispatch, param);
                                    }), (function (param) {
                                      return onDrop(dispatch, param);
                                    }), AssetEditorService$WonderEditor.unsafeGetAssetTree(editorState));
                      }))), React.createElement("div", {
                  className: "asset-content"
                }, buildContent(/* () */0)));
}

function shouldUpdate(param) {
  return Caml_obj.caml_notequal(param[/* oldSelf */0][/* retainedProps */5], param[/* newSelf */1][/* retainedProps */5]);
}

function make(store, dispatch, _) {
  var newrecord = component.slice();
  newrecord[/* shouldUpdate */8] = shouldUpdate;
  newrecord[/* render */9] = (function (self) {
      return render(store, dispatch, self);
    });
  newrecord[/* retainedProps */11] = /* record */[
    /* assetTree */StateLogicService$WonderEditor.getEditorState(AssetEditorService$WonderEditor.getAssetTree),
    /* currentTreeNode */StateLogicService$WonderEditor.getEditorState(AssetEditorService$WonderEditor.getCurrentTreeNode)
  ];
  return newrecord;
}

export {
  Method       ,
  component    ,
  render       ,
  shouldUpdate ,
  make         ,
  
}
/*  Not a pure module */

