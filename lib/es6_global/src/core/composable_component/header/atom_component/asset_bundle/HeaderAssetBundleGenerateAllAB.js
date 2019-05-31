

import * as Most from "most";
import * as Block from "../../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as Caml_option from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as ReasonReact from "../../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Log$WonderLog from "../../../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Zip$WonderBsJszip from "../../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/zip.js";
import * as FileSaver from "file-saver/FileSaver";
import * as LogUtils$WonderEditor from "../../../../utils/console/LogUtils.js";
import * as Options$WonderBsJszip from "../../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/options.js";
import * as DomHelper$WonderEditor from "../../../../external/DomHelper.js";
import * as MostUtils$WonderEditor from "../../../utils/MostUtils.js";
import * as Caml_builtin_exceptions from "../../../../../../../../node_modules/bs-platform/lib/es6/caml_builtin_exceptions.js";
import * as SelectTree$WonderEditor from "../../../../atom_component/selectTree/SelectTree.js";
import * as ArrayService$WonderEditor from "../../../../../service/atom/ArrayService.js";
import * as ConsoleUtils$WonderEditor from "../../../../utils/ui/ConsoleUtils.js";
import * as LanguageUtils$WonderEditor from "../../../../utils/language/LanguageUtils.js";
import * as TypeArrayType$WonderEditor from "../../../../external/type/TypeArrayType.js";
import * as ArrayService$WonderCommonlib from "../../../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as SelectTreeUtils$WonderEditor from "../../../../atom_component/selectTree/utils/SelectTreeUtils.js";
import * as StateLogicService$WonderEditor from "../../../../../service/stateTuple/logic/StateLogicService.js";
import * as LanguageEditorService$WonderEditor from "../../../../../service/state/editor/LanguageEditorService.js";
import * as ValueNodeSelectTreeService$WonderEditor from "../../../../../service/record/ui/selectTree/ValueNodeSelectTreeService.js";
import * as IterateTreeSelectTreeService$WonderEditor from "../../../../../service/record/ui/selectTree/IterateTreeSelectTreeService.js";
import * as GenerateAssetBundleEngineService$WonderEditor from "../../../../../service/state/engine/asset_bundle/GenerateAssetBundleEngineService.js";

function _toggleSelect(tree, send, isSelect, node) {
  var tree$1 = SelectTreeUtils$WonderEditor.setSelectForSelectTree(tree, isSelect, node);
  return Curry._1(send, /* UpdateSelectTreeForGenerateAllAB */Block.__(2, [tree$1]));
}

function _buildGenerateAllABUI(send, selectTreeForGenerateAllAB) {
  return ReasonReact.element(DomHelper$WonderEditor.getRandomKey(/* () */0), undefined, SelectTree$WonderEditor.make(selectTreeForGenerateAllAB, (function (type_, value, editorState) {
                    if (type_ === "assetBundle") {
                      return "./public/img/assetBundle.png";
                    }
                    
                  }), (function (param, param$1) {
                    return _toggleSelect(selectTreeForGenerateAllAB, send, param, param$1);
                  }), /* array */[]));
}

function _convertDependencyRelationInputValueStrToMap (dependencyRelationInputValueStr){
         return eval( dependencyRelationInputValueStr);
         };

function _generateRABAndSABData(selectTreeForGenerateAllAB) {
  return IterateTreeSelectTreeService$WonderEditor.fold((function (acc, nodeId, nodeData, children) {
                return acc;
              }), /* tuple */[
              ArrayService$WonderCommonlib.createEmpty(/* () */0),
              ArrayService$WonderCommonlib.createEmpty(/* () */0)
            ], selectTreeForGenerateAllAB, (function (param, nodeId, nodeData) {
                var rabDataArr = param[1];
                var sabDataArr = param[0];
                var match = ValueNodeSelectTreeService$WonderEditor.getIsSelect(nodeData);
                if (match) {
                  var value = ValueNodeSelectTreeService$WonderEditor.getValue(nodeData);
                  var type_ = ValueNodeSelectTreeService$WonderEditor.getType(nodeData);
                  if (type_ === "assetBundle") {
                    var path = value[/* path */1];
                    var assetBundle = value[/* assetBundle */0];
                    switch (value[/* type_ */2]) {
                      case 0 : 
                          return /* tuple */[
                                  sabDataArr,
                                  ArrayService$WonderEditor.push(/* tuple */[
                                        path,
                                        assetBundle
                                      ], rabDataArr)
                                ];
                      case 1 : 
                          return /* tuple */[
                                  ArrayService$WonderEditor.push(/* tuple */[
                                        path,
                                        assetBundle
                                      ], sabDataArr),
                                  rabDataArr
                                ];
                      case 2 : 
                          throw [
                                Caml_builtin_exceptions.match_failure,
                                /* tuple */[
                                  "HeaderAssetBundleGenerateAllAB.re",
                                  68,
                                  16
                                ]
                              ];
                      
                    }
                  } else {
                    return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("_generateRABAndSABData", "unknown type_: " + (String(type_) + ""), "", "", ""));
                  }
                } else {
                  return /* tuple */[
                          sabDataArr,
                          rabDataArr
                        ];
                }
              }), /* () */0);
}

function generateAllABZip(selectTreeForGenerateAllAB, zipBaseName, dependencyRelationInputValueStr, createZipFunc, param) {
  return Most.flatMap((function (param) {
                return Most.fromPromise(Zip$WonderBsJszip.generateAsyncBlob(ArrayService$WonderCommonlib.reduceOneParam((function (zip, param) {
                                        return Zip$WonderBsJszip.write(zip, Caml_option.some(Options$WonderBsJszip.makeWriteOptions(undefined, true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)), param[0], /* `trustme */[
                                                    380026608,
                                                    TypeArrayType$WonderEditor.newBlobFromArrayBuffer(param[1])
                                                  ]);
                                      }), Curry._1(createZipFunc, /* () */0), ArrayService$WonderEditor.push(/* tuple */[
                                          "WonderWAB.wab",
                                          param[0]
                                        ], ArrayService$WonderEditor.fastConcat(param[1], param[2]))), undefined, Zip$WonderBsJszip.makeAsyncBlobOptions(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, /* () */0)).then((function (content) {
                                  return Promise.resolve((FileSaver.saveAs(content, "" + (String(zipBaseName) + ".zip")), /* () */0));
                                })));
              }), Most.flatMap((function (param) {
                    return GenerateAssetBundleEngineService$WonderEditor.generateAllAB(param[0], param[1]);
                  }), MostUtils$WonderEditor.callFunc((function (param) {
                        return /* tuple */[
                                _convertDependencyRelationInputValueStrToMap(dependencyRelationInputValueStr),
                                _generateRABAndSABData(selectTreeForGenerateAllAB)
                              ];
                      }))));
}

function buildDefaultDependencyRelationInputValue(param) {
  return "\n    (function() {\n        var dependencyRelation = {};\n\n        //todo need rewrite\n        dependencyRelation[\"A.sab\"] = [\"AssetBundle/B.rab\", \"AssetBundle/F/c.rab\"];\n\n        return dependencyRelation;\n    }())\n    ";
}

function _changeName($$event) {
  return /* ChangeName */Block.__(0, [$$event.target.value]);
}

function _changeDependencyRelation($$event) {
  return /* ChangeDependencyRelation */Block.__(1, [$$event.target.value]);
}

function _renderNameInput(param) {
  var send = param[1];
  return React.createElement("div", {
              className: "content-field"
            }, React.createElement("div", {
                  className: "field-title"
                }, DomHelper$WonderEditor.textEl("name")), React.createElement("div", {
                  className: "field-content"
                }, React.createElement("input", {
                      className: "input-component",
                      type: "text",
                      value: param[0][/* nameInputValue */1],
                      onChange: (function (_e) {
                          return Curry._1(send, /* ChangeName */Block.__(0, [_e.target.value]));
                        })
                    })));
}

function _renderDependencyRelationInput(param) {
  var send = param[1];
  return React.createElement("div", {
              className: "content-field content-textarea"
            }, React.createElement("div", {
                  className: "field-title"
                }, DomHelper$WonderEditor.textEl("relation")), React.createElement("div", {
                  className: "field-content"
                }, React.createElement("textarea", {
                      className: "input-component",
                      type: "text",
                      value: param[0][/* dependencyRelationInputValue */2],
                      onChange: (function (_e) {
                          return Curry._1(send, /* ChangeDependencyRelation */Block.__(1, [_e.target.value]));
                        })
                    })));
}

function renderGenerateAllABModal(param, languageType, param$1) {
  var submitFunc = param$1[1];
  var closeFunc = param$1[0];
  var send = param[1];
  var state = param[0];
  return React.createElement("article", {
              className: "wonder-generateAllAB-modal"
            }, React.createElement("div", {
                  className: "modal-item"
                }, React.createElement("div", {
                      className: "modal-item-header"
                    }, DomHelper$WonderEditor.textEl(LanguageUtils$WonderEditor.getHeaderLanguageDataByType("generate-all-ab", languageType)), React.createElement("img", {
                          src: "./public/img/close.png",
                          onClick: (function (_e) {
                              return Curry._1(closeFunc, /* () */0);
                            })
                        })), React.createElement("div", {
                      className: "modal-item-content"
                    }, _renderNameInput(/* tuple */[
                          state,
                          send
                        ]), _renderDependencyRelationInput(/* tuple */[
                          state,
                          send
                        ]), _buildGenerateAllABUI(send, state[/* selectTreeForGenerateAllAB */0])), React.createElement("div", {
                      className: "modal-item-footer"
                    }, React.createElement("button", {
                          className: "footer-submit",
                          onClick: (function (_e) {
                              var partial_arg = state[/* dependencyRelationInputValue */2];
                              var partial_arg$1 = state[/* nameInputValue */1];
                              var partial_arg$2 = state[/* selectTreeForGenerateAllAB */0];
                              StateLogicService$WonderEditor.getStateToGetData((function (param) {
                                          return generateAllABZip(partial_arg$2, partial_arg$1, partial_arg, Zip$WonderBsJszip.create, param);
                                        })).concat(MostUtils$WonderEditor.callFunc(submitFunc)).subscribe({
                                    next: (function (param) {
                                        return /* () */0;
                                      }),
                                    error: (function (e) {
                                        var message = e.message;
                                        var stack = e.stack;
                                        var partial_arg = LogUtils$WonderEditor.buildErrorMessage("" + (String(message) + ""), "", "", "stack: " + (String(stack) + ""));
                                        return StateLogicService$WonderEditor.getEditorState((function (param) {
                                                      return ConsoleUtils$WonderEditor.error(partial_arg, param);
                                                    }));
                                      }),
                                    complete: (function (param) {
                                        return /* () */0;
                                      })
                                  });
                              return /* () */0;
                            })
                        }, DomHelper$WonderEditor.textEl("Submit")))));
}

var Method = /* module */[
  /* _toggleSelect */_toggleSelect,
  /* _buildGenerateAllABUI */_buildGenerateAllABUI,
  /* _convertDependencyRelationInputValueStrToMap */_convertDependencyRelationInputValueStrToMap,
  /* _generateRABAndSABData */_generateRABAndSABData,
  /* generateAllABZip */generateAllABZip,
  /* buildDefaultDependencyRelationInputValue */buildDefaultDependencyRelationInputValue,
  /* _changeName */_changeName,
  /* _changeDependencyRelation */_changeDependencyRelation,
  /* _renderNameInput */_renderNameInput,
  /* _renderDependencyRelationInput */_renderDependencyRelationInput,
  /* renderGenerateAllABModal */renderGenerateAllABModal
];

var component = ReasonReact.reducerComponent("HeaderAssetBundleGenerateAllAB");

function reducer(action, state) {
  switch (action.tag | 0) {
    case 0 : 
        return /* Update */Block.__(0, [/* record */[
                    /* selectTreeForGenerateAllAB */state[/* selectTreeForGenerateAllAB */0],
                    /* nameInputValue */action[0],
                    /* dependencyRelationInputValue */state[/* dependencyRelationInputValue */2]
                  ]]);
    case 1 : 
        return /* Update */Block.__(0, [/* record */[
                    /* selectTreeForGenerateAllAB */state[/* selectTreeForGenerateAllAB */0],
                    /* nameInputValue */state[/* nameInputValue */1],
                    /* dependencyRelationInputValue */action[0]
                  ]]);
    case 2 : 
        return /* Update */Block.__(0, [/* record */[
                    /* selectTreeForGenerateAllAB */action[0],
                    /* nameInputValue */state[/* nameInputValue */1],
                    /* dependencyRelationInputValue */state[/* dependencyRelationInputValue */2]
                  ]]);
    
  }
}

function render(param, param$1) {
  var languageType = StateLogicService$WonderEditor.getEditorState(LanguageEditorService$WonderEditor.unsafeGetType);
  return renderGenerateAllABModal(/* tuple */[
              param[/* state */1],
              param[/* send */3]
            ], languageType, /* tuple */[
              param$1[0],
              param$1[1]
            ]);
}

function make(selectTreeForGenerateAllAB, closeFunc, submitFunc, _children) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */component[/* didMount */4],
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(self, /* tuple */[
                          closeFunc,
                          submitFunc
                        ]);
            }),
          /* initialState */(function (param) {
              return /* record */[
                      /* selectTreeForGenerateAllAB */selectTreeForGenerateAllAB,
                      /* nameInputValue */"WonderAllAB",
                      /* dependencyRelationInputValue */"\n    (function() {\n        var dependencyRelation = {};\n\n        //todo need rewrite\n        dependencyRelation[\"A.sab\"] = [\"AssetBundle/B.rab\", \"AssetBundle/F/c.rab\"];\n\n        return dependencyRelation;\n    }())\n    "
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */reducer,
          /* jsElementWrapped */component[/* jsElementWrapped */13]
        ];
}

export {
  Method ,
  component ,
  reducer ,
  render ,
  make ,
  
}
/* component Not a pure module */
