

import * as Block from "../../../../../../../node_modules/bs-platform/lib/es6/block.js";
import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as React from "react";
import * as ReasonReact from "../../../../../../../node_modules/reason-react/lib/es6_global/src/ReasonReact.js";
import * as Zip$WonderBsJszip from "../../../../../../../node_modules/wonder-bs-jszip/lib/es6_global/src/zip.js";
import * as Modal$WonderEditor from "../../../atom_component/modal/Modal.js";
import * as DomUtils$WonderEditor from "../../../utils/ui/DomUtils.js";
import * as LogUtils$WonderEditor from "../../../utils/console/LogUtils.js";
import * as Copyright$WonderEditor from "../../../../Copyright.js";
import * as DomHelper$WonderEditor from "../../../external/DomHelper.js";
import * as EventHelper$WonderEditor from "../../../external/EventHelper.js";
import * as AllStateData$WonderEditor from "../../../../service/stateTuple/data/AllStateData.js";
import * as ConsoleUtils$WonderEditor from "../../../utils/ui/ConsoleUtils.js";
import * as DetectOSUtils$WonderEditor from "../utils/DetectOSUtils.js";
import * as SingleInputModal$WonderEditor from "../../../atom_component/singleInputModal/SingleInputModal.js";
import * as AllHistoryService$WonderEditor from "../../../../service/stateTuple/history/AllHistoryService.js";
import * as PublishLocalModal$WonderEditor from "../../../atom_component/publishLocalModal/PublishLocalModal.js";
import * as StateLogicService$WonderEditor from "../../../../service/stateTuple/logic/StateLogicService.js";
import * as StoreHistoryUtils$WonderEditor from "../../../ui/eventHandler/utils/StoreHistoryUtils.js";
import * as StateEditorService$WonderEditor from "../../../../service/state/editor/StateEditorService.js";
import * as StateHistoryService$WonderEditor from "../../../../service/stateTuple/history/StateHistoryService.js";
import * as HeaderExportSceneUtils$WonderEditor from "../utils/export/HeaderExportSceneUtils.js";
import * as HeaderPublishLocalUtils$WonderEditor from "../utils/publish/local/HeaderPublishLocalUtils.js";
import * as HeaderExportPackageUtils$WonderEditor from "../utils/export/HeaderExportPackageUtils.js";
import * as HeaderImportPackageUtils$WonderEditor from "../utils/import/HeaderImportPackageUtils.js";
import * as OperateStateHistoryService$WonderEditor from "../../../../service/stateTuple/history/OperateStateHistoryService.js";
import * as HotKeysSettingEditorService$WonderEditor from "../../../../service/state/editor/setting/HotKeysSettingEditorService.js";

function importPackage(param, param$1, $$event) {
  var blurNav = param$1[1];
  var send = param$1[0];
  var dispatchFunc = param[1];
  var uiState = param[0];
  StoreHistoryUtils$WonderEditor.storeHistoryStateWithNoCopyEngineState(uiState, StateHistoryService$WonderEditor.getStateForHistory(/* () */0));
  return HeaderImportPackageUtils$WonderEditor.importPackage(dispatchFunc, $$event).then((function () {
                  return Promise.resolve(Curry._1(send, blurNav));
                })).catch((function (e) {
                var editorState = StateEditorService$WonderEditor.getState(/* () */0);
                var message = e.message;
                var stack = e.stack;
                ConsoleUtils$WonderEditor.error(LogUtils$WonderEditor.buildErrorMessage("" + (String(message) + ""), "", "", ""), editorState);
                ConsoleUtils$WonderEditor.logStack(stack);
                return Promise.resolve(AllHistoryService$WonderEditor.handleUndo(uiState, dispatchFunc));
              }));
}

function _handleRedo(uiState, dispatchFunc) {
  var match = OperateStateHistoryService$WonderEditor.hasRedoState(AllStateData$WonderEditor.getHistoryState(/* () */0));
  if (match) {
    return StateHistoryService$WonderEditor.getAndRefreshStateForHistory((function (param) {
                  return AllHistoryService$WonderEditor.redoHistoryState(uiState, dispatchFunc, param);
                }));
  } else {
    return /* () */0;
  }
}

function _buildFileComponentSelectNav(send, uiState, dispatchFunc) {
  return React.createElement("div", {
              className: "item-content"
            }, React.createElement("div", {
                  className: "content-section",
                  onClick: (function () {
                      return AllHistoryService$WonderEditor.handleUndo(uiState, dispatchFunc);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl("Undo"))), React.createElement("div", {
                  className: "content-section",
                  onClick: (function () {
                      return _handleRedo(uiState, dispatchFunc);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl("Redo"))), React.createElement("div", {
                  className: "content-section",
                  onClick: (function () {
                      return Curry._1(send, /* ShowFileControlsModal */1);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl("Controls"))));
}

function _handleHotKeyValueByOS(values) {
  var isMac = DetectOSUtils$WonderEditor.isMac(/* () */0);
  return values.filter((function (value) {
                if (isMac) {
                  return true;
                } else {
                  return !value.includes("command");
                }
              }));
}

function _buildControlModalContent() {
  return StateLogicService$WonderEditor.getEditorState(HotKeysSettingEditorService$WonderEditor.getHotKeys).map((function (param, i) {
                return React.createElement("div", {
                            key: String(i),
                            className: "content-field"
                          }, React.createElement("div", {
                                className: "field-title"
                              }, DomHelper$WonderEditor.textEl(param[/* name */0])), React.createElement("div", {
                                className: "field-content"
                              }, DomHelper$WonderEditor.textEl(_handleHotKeyValueByOS(param[/* values */1]).join("|"))));
              }));
}

function buildFileComponent(state, send, uiState, dispatchFunc) {
  var match = state[/* currentSelectNav */1] === /* File */1;
  var className = match ? "item-title item-active" : "item-title";
  var match$1 = state[/* currentSelectNav */1] === /* File */1;
  var match$2 = state[/* isShowFileControlsModal */2];
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("span", {
                      className: className,
                      onClick: (function () {
                          return Curry._1(send, /* ToggleShowNav */Block.__(1, [/* File */1]));
                        }),
                      onMouseOver: (function () {
                          return Curry._1(send, /* HoverNav */Block.__(0, [/* File */1]));
                        })
                    }, DomHelper$WonderEditor.textEl("File"))), match$1 ? _buildFileComponentSelectNav(send, uiState, dispatchFunc) : null, match$2 ? ReasonReact.element(undefined, undefined, Modal$WonderEditor.make((function () {
                          return Curry._1(send, /* HideFileControlsModal */2);
                        }), "Controls", _buildControlModalContent(/* () */0), undefined, /* array */[])) : null);
}

function _buildEditComponentSelectNav(send, uiState, dispatchFunc) {
  return React.createElement("div", {
              className: "item-content item-edit"
            }, React.createElement("div", {
                  className: "content-section"
                }, React.createElement("input", {
                      className: "section-fileLoad",
                      multiple: false,
                      type: "file",
                      onChange: (function (e) {
                          importPackage(/* tuple */[
                                uiState,
                                dispatchFunc
                              ], /* tuple */[
                                send,
                                /* BlurNav */0
                              ], e);
                          return /* () */0;
                        })
                    }), React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl("Import Package"))), React.createElement("div", {
                  className: "content-section",
                  onClick: (function () {
                      return Curry._1(send, /* ShowEditExportPackageModal */3);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl("Export Package"))), React.createElement("div", {
                  className: "content-section",
                  onClick: (function () {
                      return Curry._1(send, /* ShowEditExportSceneModal */5);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl("Export Scene"))));
}

function buildEditComponent(state, send, uiState, dispatchFunc) {
  var match = state[/* currentSelectNav */1] === /* Edit */2;
  var className = match ? "item-title item-active" : "item-title";
  var match$1 = state[/* currentSelectNav */1] === /* Edit */2;
  var match$2 = state[/* isShowEditExportPackageModal */3];
  var match$3 = state[/* isShowEditExportSceneModal */4];
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("span", {
                      className: className,
                      onClick: (function () {
                          var match = state[/* isSelectNav */0];
                          if (match) {
                            return Curry._1(send, /* BlurNav */0);
                          } else {
                            return Curry._1(send, /* ToggleShowNav */Block.__(1, [/* Edit */2]));
                          }
                        }),
                      onMouseOver: (function () {
                          return Curry._1(send, /* HoverNav */Block.__(0, [/* Edit */2]));
                        })
                    }, DomHelper$WonderEditor.textEl("Edit"))), match$1 ? _buildEditComponentSelectNav(send, uiState, dispatchFunc) : null, match$2 ? ReasonReact.element(undefined, undefined, SingleInputModal$WonderEditor.make((function () {
                          return Curry._1(send, /* HideEditExportPackageModal */4);
                        }), "Export Package", (function (packageName) {
                          HeaderExportPackageUtils$WonderEditor.exportPackage(packageName);
                          return Curry._1(send, /* HideEditExportPackageModal */4);
                        }), "WonderPackage", /* array */[])) : null, match$3 ? ReasonReact.element(undefined, undefined, SingleInputModal$WonderEditor.make((function () {
                          return Curry._1(send, /* HideEditExportSceneModal */6);
                        }), "Export Scene", (function (sceneName) {
                          HeaderExportSceneUtils$WonderEditor.exportScene(sceneName);
                          return Curry._1(send, /* HideEditExportSceneModal */6);
                        }), "WonderScene", /* array */[])) : null);
}

function _buildPublishComponentSelectNav(send) {
  return React.createElement("div", {
              className: "item-content"
            }, React.createElement("div", {
                  className: "content-section",
                  onClick: (function () {
                      return Curry._1(send, /* ShowPublishLocalModal */7);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl("Local"))));
}

function buildPublishComponent(state, send, _, _$1) {
  var match = state[/* currentSelectNav */1] === /* Publish */3;
  var className = match ? "item-title item-active" : "item-title";
  var match$1 = state[/* currentSelectNav */1] === /* Publish */3;
  var match$2 = state[/* isShowPublishLocalModal */5];
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("span", {
                      className: className,
                      onClick: (function () {
                          var match = state[/* isSelectNav */0];
                          if (match) {
                            return Curry._1(send, /* BlurNav */0);
                          } else {
                            return Curry._1(send, /* ToggleShowNav */Block.__(1, [/* Publish */3]));
                          }
                        }),
                      onMouseOver: (function () {
                          return Curry._1(send, /* HoverNav */Block.__(0, [/* Publish */3]));
                        })
                    }, DomHelper$WonderEditor.textEl("Publish"))), match$1 ? _buildPublishComponentSelectNav(send) : null, match$2 ? ReasonReact.element(undefined, undefined, PublishLocalModal$WonderEditor.make((function () {
                          return Curry._1(send, /* HidePublishLocalModal */8);
                        }), "Local", (function (zipName, useWorker) {
                          HeaderPublishLocalUtils$WonderEditor.Publish[/* publishZip */2](/* tuple */[
                                zipName,
                                useWorker
                              ], Zip$WonderBsJszip.create, (function (prim) {
                                  return fetch(prim);
                                }));
                          return Curry._1(send, /* HidePublishLocalModal */8);
                        }), "WonderLocal", false, /* array */[])) : null);
}

function _buildHelpComponentSelectNav(send) {
  return React.createElement("div", {
              className: "item-content item-help"
            }, React.createElement("div", {
                  className: "content-section",
                  onClick: (function () {
                      return Curry._1(send, /* ShowHelpVersionModal */9);
                    })
                }, React.createElement("span", {
                      className: "section-header"
                    }, DomHelper$WonderEditor.textEl("Version"))));
}

function buildHelpComponent(state, send, _, _$1) {
  var match = state[/* currentSelectNav */1] === /* Help */4;
  var className = match ? "item-title item-active" : "item-title";
  var match$1 = state[/* currentSelectNav */1] === /* Help */4;
  var match$2 = state[/* isShowHelpVersionModal */6];
  return React.createElement("div", {
              className: "header-item"
            }, React.createElement("div", {
                  className: "component-item"
                }, React.createElement("span", {
                      className: className,
                      onClick: (function () {
                          return Curry._1(send, /* ToggleShowNav */Block.__(1, [/* Help */4]));
                        }),
                      onMouseOver: (function () {
                          return Curry._1(send, /* HoverNav */Block.__(0, [/* Help */4]));
                        })
                    }, DomHelper$WonderEditor.textEl("Help"))), match$1 ? _buildHelpComponentSelectNav(send) : null, match$2 ? ReasonReact.element(undefined, undefined, Modal$WonderEditor.make((function () {
                          return Curry._1(send, /* HideHelpVersionModal */10);
                        }), "About Wonder", /* array */[React.createElement("div", {
                              className: "content-field"
                            }, React.createElement("div", {
                                  className: "field-title"
                                }, DomHelper$WonderEditor.textEl("Version")), React.createElement("div", {
                                  className: "field-content"
                                }, DomHelper$WonderEditor.textEl(Copyright$WonderEditor.getVersion(/* () */0))))], undefined, /* array */[])) : null);
}

function isHeaderDom(target) {
  return DomUtils$WonderEditor.isSpecificDomChildrenHasTargetDom(target, document.getElementsByClassName("item-title"));
}

function isImportPackageDom(target) {
  return DomUtils$WonderEditor.isSpecificDomChildrenHasTargetDom(target, document.getElementsByClassName("section-fileLoad"));
}

var Method = /* module */[
  /* importPackage */importPackage,
  /* _handleRedo */_handleRedo,
  /* _buildFileComponentSelectNav */_buildFileComponentSelectNav,
  /* _handleHotKeyValueByOS */_handleHotKeyValueByOS,
  /* _buildControlModalContent */_buildControlModalContent,
  /* buildFileComponent */buildFileComponent,
  /* _buildEditComponentSelectNav */_buildEditComponentSelectNav,
  /* buildEditComponent */buildEditComponent,
  /* _buildPublishComponentSelectNav */_buildPublishComponentSelectNav,
  /* buildPublishComponent */buildPublishComponent,
  /* _buildHelpComponentSelectNav */_buildHelpComponentSelectNav,
  /* buildHelpComponent */buildHelpComponent,
  /* isHeaderDom */isHeaderDom,
  /* isImportPackageDom */isImportPackageDom
];

var component = ReasonReact.reducerComponent("Header");

function reducer(action, state) {
  if (typeof action === "number") {
    switch (action) {
      case 0 : 
          return /* Update */Block.__(0, [/* record */[
                      /* isSelectNav */false,
                      /* currentSelectNav : None */0,
                      /* isShowFileControlsModal */state[/* isShowFileControlsModal */2],
                      /* isShowEditExportPackageModal */state[/* isShowEditExportPackageModal */3],
                      /* isShowEditExportSceneModal */state[/* isShowEditExportSceneModal */4],
                      /* isShowPublishLocalModal */state[/* isShowPublishLocalModal */5],
                      /* isShowHelpVersionModal */state[/* isShowHelpVersionModal */6]
                    ]]);
      case 1 : 
          return /* Update */Block.__(0, [/* record */[
                      /* isSelectNav */state[/* isSelectNav */0],
                      /* currentSelectNav */state[/* currentSelectNav */1],
                      /* isShowFileControlsModal */true,
                      /* isShowEditExportPackageModal */state[/* isShowEditExportPackageModal */3],
                      /* isShowEditExportSceneModal */state[/* isShowEditExportSceneModal */4],
                      /* isShowPublishLocalModal */state[/* isShowPublishLocalModal */5],
                      /* isShowHelpVersionModal */state[/* isShowHelpVersionModal */6]
                    ]]);
      case 2 : 
          return /* Update */Block.__(0, [/* record */[
                      /* isSelectNav */state[/* isSelectNav */0],
                      /* currentSelectNav */state[/* currentSelectNav */1],
                      /* isShowFileControlsModal */false,
                      /* isShowEditExportPackageModal */state[/* isShowEditExportPackageModal */3],
                      /* isShowEditExportSceneModal */state[/* isShowEditExportSceneModal */4],
                      /* isShowPublishLocalModal */state[/* isShowPublishLocalModal */5],
                      /* isShowHelpVersionModal */state[/* isShowHelpVersionModal */6]
                    ]]);
      case 3 : 
          return /* Update */Block.__(0, [/* record */[
                      /* isSelectNav */state[/* isSelectNav */0],
                      /* currentSelectNav */state[/* currentSelectNav */1],
                      /* isShowFileControlsModal */state[/* isShowFileControlsModal */2],
                      /* isShowEditExportPackageModal */true,
                      /* isShowEditExportSceneModal */state[/* isShowEditExportSceneModal */4],
                      /* isShowPublishLocalModal */state[/* isShowPublishLocalModal */5],
                      /* isShowHelpVersionModal */state[/* isShowHelpVersionModal */6]
                    ]]);
      case 4 : 
          return /* Update */Block.__(0, [/* record */[
                      /* isSelectNav */state[/* isSelectNav */0],
                      /* currentSelectNav */state[/* currentSelectNav */1],
                      /* isShowFileControlsModal */state[/* isShowFileControlsModal */2],
                      /* isShowEditExportPackageModal */false,
                      /* isShowEditExportSceneModal */state[/* isShowEditExportSceneModal */4],
                      /* isShowPublishLocalModal */state[/* isShowPublishLocalModal */5],
                      /* isShowHelpVersionModal */state[/* isShowHelpVersionModal */6]
                    ]]);
      case 5 : 
          return /* Update */Block.__(0, [/* record */[
                      /* isSelectNav */state[/* isSelectNav */0],
                      /* currentSelectNav */state[/* currentSelectNav */1],
                      /* isShowFileControlsModal */state[/* isShowFileControlsModal */2],
                      /* isShowEditExportPackageModal */state[/* isShowEditExportPackageModal */3],
                      /* isShowEditExportSceneModal */true,
                      /* isShowPublishLocalModal */state[/* isShowPublishLocalModal */5],
                      /* isShowHelpVersionModal */state[/* isShowHelpVersionModal */6]
                    ]]);
      case 6 : 
          return /* Update */Block.__(0, [/* record */[
                      /* isSelectNav */state[/* isSelectNav */0],
                      /* currentSelectNav */state[/* currentSelectNav */1],
                      /* isShowFileControlsModal */state[/* isShowFileControlsModal */2],
                      /* isShowEditExportPackageModal */state[/* isShowEditExportPackageModal */3],
                      /* isShowEditExportSceneModal */false,
                      /* isShowPublishLocalModal */state[/* isShowPublishLocalModal */5],
                      /* isShowHelpVersionModal */state[/* isShowHelpVersionModal */6]
                    ]]);
      case 7 : 
          return /* Update */Block.__(0, [/* record */[
                      /* isSelectNav */state[/* isSelectNav */0],
                      /* currentSelectNav */state[/* currentSelectNav */1],
                      /* isShowFileControlsModal */state[/* isShowFileControlsModal */2],
                      /* isShowEditExportPackageModal */state[/* isShowEditExportPackageModal */3],
                      /* isShowEditExportSceneModal */state[/* isShowEditExportSceneModal */4],
                      /* isShowPublishLocalModal */true,
                      /* isShowHelpVersionModal */state[/* isShowHelpVersionModal */6]
                    ]]);
      case 8 : 
          return /* Update */Block.__(0, [/* record */[
                      /* isSelectNav */state[/* isSelectNav */0],
                      /* currentSelectNav */state[/* currentSelectNav */1],
                      /* isShowFileControlsModal */state[/* isShowFileControlsModal */2],
                      /* isShowEditExportPackageModal */state[/* isShowEditExportPackageModal */3],
                      /* isShowEditExportSceneModal */state[/* isShowEditExportSceneModal */4],
                      /* isShowPublishLocalModal */false,
                      /* isShowHelpVersionModal */state[/* isShowHelpVersionModal */6]
                    ]]);
      case 9 : 
          return /* Update */Block.__(0, [/* record */[
                      /* isSelectNav */state[/* isSelectNav */0],
                      /* currentSelectNav */state[/* currentSelectNav */1],
                      /* isShowFileControlsModal */state[/* isShowFileControlsModal */2],
                      /* isShowEditExportPackageModal */state[/* isShowEditExportPackageModal */3],
                      /* isShowEditExportSceneModal */state[/* isShowEditExportSceneModal */4],
                      /* isShowPublishLocalModal */state[/* isShowPublishLocalModal */5],
                      /* isShowHelpVersionModal */true
                    ]]);
      case 10 : 
          return /* Update */Block.__(0, [/* record */[
                      /* isSelectNav */state[/* isSelectNav */0],
                      /* currentSelectNav */state[/* currentSelectNav */1],
                      /* isShowFileControlsModal */state[/* isShowFileControlsModal */2],
                      /* isShowEditExportPackageModal */state[/* isShowEditExportPackageModal */3],
                      /* isShowEditExportSceneModal */state[/* isShowEditExportSceneModal */4],
                      /* isShowPublishLocalModal */state[/* isShowPublishLocalModal */5],
                      /* isShowHelpVersionModal */false
                    ]]);
      
    }
  } else if (action.tag) {
    var match = state[/* isSelectNav */0];
    if (match) {
      return /* Update */Block.__(0, [/* record */[
                  /* isSelectNav */false,
                  /* currentSelectNav : None */0,
                  /* isShowFileControlsModal */state[/* isShowFileControlsModal */2],
                  /* isShowEditExportPackageModal */state[/* isShowEditExportPackageModal */3],
                  /* isShowEditExportSceneModal */state[/* isShowEditExportSceneModal */4],
                  /* isShowPublishLocalModal */state[/* isShowPublishLocalModal */5],
                  /* isShowHelpVersionModal */state[/* isShowHelpVersionModal */6]
                ]]);
    } else {
      return /* Update */Block.__(0, [/* record */[
                  /* isSelectNav */true,
                  /* currentSelectNav */action[0],
                  /* isShowFileControlsModal */state[/* isShowFileControlsModal */2],
                  /* isShowEditExportPackageModal */state[/* isShowEditExportPackageModal */3],
                  /* isShowEditExportSceneModal */state[/* isShowEditExportSceneModal */4],
                  /* isShowPublishLocalModal */state[/* isShowPublishLocalModal */5],
                  /* isShowHelpVersionModal */state[/* isShowHelpVersionModal */6]
                ]]);
    }
  } else {
    var match$1 = state[/* isSelectNav */0];
    if (match$1) {
      return /* Update */Block.__(0, [/* record */[
                  /* isSelectNav */state[/* isSelectNav */0],
                  /* currentSelectNav */action[0],
                  /* isShowFileControlsModal */state[/* isShowFileControlsModal */2],
                  /* isShowEditExportPackageModal */state[/* isShowEditExportPackageModal */3],
                  /* isShowEditExportSceneModal */state[/* isShowEditExportSceneModal */4],
                  /* isShowPublishLocalModal */state[/* isShowPublishLocalModal */5],
                  /* isShowHelpVersionModal */state[/* isShowHelpVersionModal */6]
                ]]);
    } else {
      return /* NoUpdate */0;
    }
  }
}

function render(uiState, dispatchFunc, param) {
  var send = param[/* send */3];
  var state = param[/* state */1];
  return React.createElement("article", {
              key: "header",
              className: "wonder-header-component"
            }, React.createElement("div", {
                  className: "header-nav"
                }, buildFileComponent(state, send, uiState, dispatchFunc), buildEditComponent(state, send, uiState, dispatchFunc), buildPublishComponent(state, send, uiState, dispatchFunc), buildHelpComponent(state, send, uiState, dispatchFunc)));
}

function make(uiState, dispatchFunc, _) {
  return /* record */[
          /* debugName */component[/* debugName */0],
          /* reactClassInternal */component[/* reactClassInternal */1],
          /* handedOffState */component[/* handedOffState */2],
          /* willReceiveProps */component[/* willReceiveProps */3],
          /* didMount */(function (param) {
              var send = param[/* send */3];
              return EventHelper$WonderEditor.addEventListener(document, "click", (function (e) {
                            var target = e.target;
                            var match = DomUtils$WonderEditor.isSpecificDomChildrenHasTargetDom(target, document.getElementsByClassName("item-title")) || DomUtils$WonderEditor.isSpecificDomChildrenHasTargetDom(target, document.getElementsByClassName("section-fileLoad"));
                            if (match) {
                              return /* () */0;
                            } else {
                              return Curry._1(send, /* BlurNav */0);
                            }
                          }));
            }),
          /* didUpdate */component[/* didUpdate */5],
          /* willUnmount */component[/* willUnmount */6],
          /* willUpdate */component[/* willUpdate */7],
          /* shouldUpdate */component[/* shouldUpdate */8],
          /* render */(function (self) {
              return render(uiState, dispatchFunc, self);
            }),
          /* initialState */(function () {
              return /* record */[
                      /* isSelectNav */false,
                      /* currentSelectNav : None */0,
                      /* isShowFileControlsModal */false,
                      /* isShowEditExportPackageModal */false,
                      /* isShowEditExportSceneModal */false,
                      /* isShowPublishLocalModal */false,
                      /* isShowHelpVersionModal */false
                    ];
            }),
          /* retainedProps */component[/* retainedProps */11],
          /* reducer */reducer,
          /* subscriptions */component[/* subscriptions */13],
          /* jsElementWrapped */component[/* jsElementWrapped */14]
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
