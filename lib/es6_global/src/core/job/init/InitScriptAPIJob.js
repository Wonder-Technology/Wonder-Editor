

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Caml_array from "../../../../../../node_modules/bs-platform/lib/es6/caml_array.js";
import * as Caml_option from "../../../../../../node_modules/bs-platform/lib/es6/caml_option.js";
import * as Log$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Log.js";
import * as Contract$WonderLog from "../../../../../../node_modules/wonder-log/lib/es6_global/src/Contract.js";
import * as AppStore$WonderEditor from "../../ui/store/AppStore.js";
import * as LoadABSystem$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/asset_bundle/import/LoadABSystem.js";
import * as ImportABSystem$Wonderjs from "../../../../../../node_modules/wonder.js/lib/es6_global/src/asset_bundle/import/ImportABSystem.js";
import * as ArrayService$WonderEditor from "../../../service/atom/ArrayService.js";
import * as OptionService$WonderEditor from "../../../service/primitive/OptionService.js";
import * as UIStateService$WonderEditor from "../../../service/state/ui/global/UIStateService.js";
import * as ArrayService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/ArrayService.js";
import * as FileNameService$WonderEditor from "../../../service/atom/FileNameService.js";
import * as JobEngineService$WonderEditor from "../../../service/state/engine/job/JobEngineService.js";
import * as LightEngineService$WonderEditor from "../../../service/state/engine/LightEngineService.js";
import * as SceneEngineService$WonderEditor from "../../../service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../service/state/engine/state/StateEngineService.js";
import * as PickingEditorService$WonderEditor from "../../../service/state/editor/picking/PickingEditorService.js";
import * as GameViewEditorService$WonderEditor from "../../../service/state/editor/view/gameView/GameViewEditorService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../service/record/editor/asset/FolderNodeAssetService.js";
import * as InspectorEditorService$WonderEditor from "../../../service/state/editor/inspector/InspectorEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectEngineService.js";
import * as CameraGroupEngineService$WonderEditor from "../../../service/state/engine/CameraGroupEngineService.js";
import * as MutableHashMapService$WonderCommonlib from "../../../../../../node_modules/wonder-commonlib/lib/es6_global/src/MutableHashMapService.js";
import * as InspectorRenderGroupUtils$WonderEditor from "../../composable_component/mainEditor/composable_component/inspector/utils/InspectorRenderGroupUtils.js";
import * as RootTreeAssetEditorService$WonderEditor from "../../../service/state/editor/asset/RootTreeAssetEditorService.js";
import * as AssetBundleNodeAssetService$WonderEditor from "../../../service/record/editor/asset/AssetBundleNodeAssetService.js";
import * as BasicCameraViewEngineService$WonderEditor from "../../../service/state/engine/camera/BasicCameraViewEngineService.js";
import * as SceneTreeSelectCurrentNodeUtils$WonderEditor from "../../composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/utils/SceneTreeSelectCurrentNodeUtils.js";
import * as GameObjectComponentEngineService$WonderEditor from "../../../service/state/engine/gameObject/GameObjectComponentEngineService.js";
import * as HierarchyGameObjectEngineService$WonderEditor from "../../../service/state/engine/gameObject/HierarchyGameObjectEngineService.js";
import * as SourceTextureCacheInspectorCanvasEditorService$WonderEditor from "../../../service/state/editor/inspectorCanvas/SourceTextureCacheInspectorCanvasEditorService.js";

function handleEditorData(gameObject, engineState, editorState) {
  var editorState$1 = SceneTreeSelectCurrentNodeUtils$WonderEditor.clearCurrentData(editorState);
  var match = GameObjectComponentEngineService$WonderEditor.getBasicCameraViewComponent(gameObject, engineState);
  var editorState$2;
  if (match !== undefined) {
    var match$1 = GameViewEditorService$WonderEditor.isActiveBasicCameraView(match, editorState$1);
    editorState$2 = match$1 ? GameViewEditorService$WonderEditor.removeActivedBasicCameraView(editorState$1) : editorState$1;
  } else {
    editorState$2 = editorState$1;
  }
  var match$2 = GameObjectComponentEngineService$WonderEditor.getGeometryComponent(gameObject, engineState);
  return SourceTextureCacheInspectorCanvasEditorService$WonderEditor.clearCache(match$2 !== undefined ? PickingEditorService$WonderEditor.removeSphereShape(match$2, editorState$2) : editorState$2);
}

function dispatch(param) {
  return Curry._1(UIStateService$WonderEditor.getDispatch(/* () */0), [
              AppStore$WonderEditor.UpdateAction,
              /* Update */[/* array */[
                  /* SceneTree */6,
                  /* Inspector */2
                ]]
            ]);
}

function buildDisposeGameObjectFunc(scriptAPIJsObj) {
  return (function (gameObject, engineState) {
      var disposeGameObject = scriptAPIJsObj.disposeGameObject;
      var engineState$1 = disposeGameObject(gameObject, engineState);
      var engineState$2 = JobEngineService$WonderEditor.execDisposeJob(engineState$1);
      var editorState = handleEditorData(gameObject, engineState$2, StateEditorService$WonderEditor.getState(/* () */0));
      StateEditorService$WonderEditor.setState(editorState);
      StateEngineService$WonderEditor.setState(engineState$2);
      dispatch(/* () */0);
      return StateEngineService$WonderEditor.unsafeGetState(/* () */0);
    });
}

var DisposeGameObject = /* module */[
  /* handleEditorData */handleEditorData,
  /* dispatch */dispatch,
  /* buildDisposeGameObjectFunc */buildDisposeGameObjectFunc
];

function getAssetBundlePath() {
  return "";
}

var Path = /* module */[/* getAssetBundlePath */getAssetBundlePath];

function _buildFakeFetchArrayBufferResponse(arrayBuffer) {
  return Promise.resolve({
              ok: true,
              status: "",
              statusText: "_buildFakeFetchArrayBufferResponse error",
              arrayBuffer: (function (param) {
                  return Promise.resolve(arrayBuffer);
                })
            });
}

function _findAssetBundbleNodeData(_nodeNameHierachy, _folderNode, editorState) {
  while(true) {
    var folderNode = _folderNode;
    var nodeNameHierachy = _nodeNameHierachy;
    Contract$WonderLog.requireCheck((function(nodeNameHierachy){
        return function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("nodeNameHierachy.length > 0", "not"), (function (param) {
                        return Contract$WonderLog.Operators[/* > */5](nodeNameHierachy.length, 0);
                      }));
        }
        }(nodeNameHierachy)), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
    var match = nodeNameHierachy.length > 1;
    if (match) {
      var nextFolderNodeName = ArrayService$WonderEditor.unsafeGetFirst(nodeNameHierachy);
      var nextFolderNode = OptionService$WonderEditor.unsafeGet(Caml_option.undefined_to_opt(FolderNodeAssetService$WonderEditor.getChildrenNodes(folderNode).find((function(nextFolderNodeName){
                  return function (childNode) {
                    if (FolderNodeAssetService$WonderEditor.isFolderNode(childNode)) {
                      return FolderNodeAssetService$WonderEditor.getNodeName(FolderNodeAssetService$WonderEditor.getNodeData(childNode)) === nextFolderNodeName;
                    } else {
                      return false;
                    }
                  }
                  }(nextFolderNodeName)))));
      _folderNode = nextFolderNode;
      _nodeNameHierachy = nodeNameHierachy.slice(1);
      continue ;
    } else {
      var assetBundleNodeName = FileNameService$WonderEditor.getBaseName(ArrayService$WonderEditor.unsafeGetFirst(nodeNameHierachy));
      return AssetBundleNodeAssetService$WonderEditor.getNodeData(OptionService$WonderEditor.unsafeGet(Caml_option.undefined_to_opt(FolderNodeAssetService$WonderEditor.getChildrenNodes(folderNode).find((function(assetBundleNodeName){
                            return function (childNode) {
                              if (AssetBundleNodeAssetService$WonderEditor.isAssetBundleNode(childNode)) {
                                return AssetBundleNodeAssetService$WonderEditor.getNodeName(AssetBundleNodeAssetService$WonderEditor.getNodeData(childNode)) === assetBundleNodeName;
                              } else {
                                return false;
                              }
                            }
                            }(assetBundleNodeName))))));
    }
  };
}

function _buildFakeFetchAssetBundle(abRelativePath) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var nodeNameHierachy = abRelativePath.split("/");
  return _buildFakeFetchArrayBufferResponse(_findAssetBundbleNodeData(nodeNameHierachy, RootTreeAssetEditorService$WonderEditor.getRootNode(editorState), editorState)[/* assetBundle */2]);
}

function loadSABAndSetToState(sabRelativePath, wholeManifest, param) {
  return ImportABSystem$Wonderjs.SAB[/* loadSABAndSetToState */0](sabRelativePath, wholeManifest, /* tuple */[
              param[0],
              param[1],
              param[2],
              param[3],
              _buildFakeFetchAssetBundle
            ]);
}

function loadAllDependencyRABAndSetToState(abRelativePath, wholeManifest, param) {
  return ImportABSystem$Wonderjs.RAB[/* loadAllDependencyRABAndSetToState */1](abRelativePath, wholeManifest, /* tuple */[
              param[0],
              param[1],
              param[2],
              param[3],
              _buildFakeFetchAssetBundle
            ]);
}

function loadWABAndSetToState(wabRelativePath, getAssetBundlePathFunc) {
  return ImportABSystem$Wonderjs.WAB[/* loadWABAndSetToState */0](wabRelativePath, /* tuple */[
              getAssetBundlePathFunc,
              _buildFakeFetchAssetBundle
            ]);
}

function loadAssetBundle(abPath) {
  return LoadABSystem$Wonderjs.load(abPath, _buildFakeFetchAssetBundle);
}

var Load = /* module */[
  /* _buildFakeFetchArrayBufferResponse */_buildFakeFetchArrayBufferResponse,
  /* _findAssetBundbleNodeData */_findAssetBundbleNodeData,
  /* _buildFakeFetchAssetBundle */_buildFakeFetchAssetBundle,
  /* loadSABAndSetToState */loadSABAndSetToState,
  /* loadAllDependencyRABAndSetToState */loadAllDependencyRABAndSetToState,
  /* loadWABAndSetToState */loadWABAndSetToState,
  /* loadAssetBundle */loadAssetBundle
];

function initAssetBundleArrayBufferCache() {
  return new Promise((function (resolve, reject) {
                return resolve();
              }));
}

function isAssetBundleArrayBufferCached(abRelativePath, hashId) {
  return new Promise((function (resolve, reject) {
                return resolve(false);
              }));
}

function getAssetBundleArrayBufferCache(abRelativePath) {
  return Log$WonderLog.fatal(Log$WonderLog.buildFatalMessage("getAssetBundleArrayBufferCache", "need rewrite", "", "", ""));
}

function cacheAssetBundleArrayBuffer(abRelativePath, ab, hashId) {
  return new Promise((function (resolve, reject) {
                return resolve();
              }));
}

var Cache = /* module */[
  /* initAssetBundleArrayBufferCache */initAssetBundleArrayBufferCache,
  /* isAssetBundleArrayBufferCached */isAssetBundleArrayBufferCached,
  /* getAssetBundleArrayBufferCache */getAssetBundleArrayBufferCache,
  /* cacheAssetBundleArrayBuffer */cacheAssetBundleArrayBuffer
];

function _addGameObjectAllComponentTypeToMap(gameObject, engineState, editorState) {
  Contract$WonderLog.requireCheck((function (param) {
          return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("gameObject: " + (String(gameObject) + " should has transform component"), "not"), (function (param) {
                        return Contract$WonderLog.assertTrue(GameObjectComponentEngineService$WonderEditor.hasTransformComponent(gameObject, engineState));
                      }));
        }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
  var editorState$1 = InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* Transform */0, editorState);
  var match = InspectorRenderGroupUtils$WonderEditor.hasRenderGroupComponents(gameObject, engineState);
  var editorState$2 = match ? InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* RenderGroup */1, editorState$1) : editorState$1;
  var match$1 = CameraGroupEngineService$WonderEditor.hasCameraGroupComponents(gameObject, /* tuple */[
        GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent,
        GameObjectComponentEngineService$WonderEditor.hasPerspectiveCameraProjectionComponent
      ], engineState);
  var editorState$3 = match$1 ? InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* CameraGroup */4, editorState$2) : editorState$2;
  var match$2 = GameObjectComponentEngineService$WonderEditor.hasArcballCameraControllerComponent(gameObject, engineState);
  var editorState$4 = match$2 ? InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* ArcballCameraController */3, editorState$3) : editorState$3;
  var match$3 = GameObjectComponentEngineService$WonderEditor.hasGeometryComponent(gameObject, engineState);
  var editorState$5 = match$3 ? InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* Geometry */2, editorState$4) : editorState$4;
  var match$4 = LightEngineService$WonderEditor.hasLightComponent(gameObject, engineState);
  var editorState$6 = match$4 ? InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* Light */5, editorState$5) : editorState$5;
  var match$5 = GameObjectComponentEngineService$WonderEditor.hasSourceInstanceComponent(gameObject, engineState);
  var editorState$7 = match$5 ? InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* SourceInstance */6, editorState$6) : editorState$6;
  var match$6 = GameObjectComponentEngineService$WonderEditor.hasScriptComponent(gameObject, engineState);
  if (match$6) {
    return InspectorEditorService$WonderEditor.addComponentTypeToMap(gameObject, /* Script */7, editorState$7);
  } else {
    return editorState$7;
  }
}

function buildAddSABSceneGameObjectChildrenToSceneFunc(scriptAPIJsObj) {
  return (function (sabSceneGameObject, engineState) {
      var addSABSceneGameObjectChildrenToScene = scriptAPIJsObj.addSABSceneGameObjectChildrenToScene;
      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
      var editorState$1 = ArrayService$WonderCommonlib.reduceOneParam((function (editorState, gameObject) {
              return _addGameObjectAllComponentTypeToMap(gameObject, engineState, editorState);
            }), editorState, HierarchyGameObjectEngineService$WonderEditor.getAllChildren(sabSceneGameObject, engineState));
      var engineState$1 = addSABSceneGameObjectChildrenToScene(sabSceneGameObject, engineState);
      StateEditorService$WonderEditor.setState(editorState$1);
      StateEngineService$WonderEditor.setState(engineState$1);
      Curry._1(UIStateService$WonderEditor.getDispatch(/* () */0), [
            AppStore$WonderEditor.UpdateAction,
            /* Update */[/* array */[/* SceneTree */6]]
          ]);
      return StateEngineService$WonderEditor.unsafeGetState(/* () */0);
    });
}

function _getActiveBasicCameraViews(gameObjectArr, engineState) {
  return Contract$WonderLog.ensureCheck((function (activeBasicCameraViews) {
                return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("only has zero or one active basic camera view", "has more"), (function (param) {
                              return Contract$WonderLog.Operators[/* <= */11](activeBasicCameraViews.length, 1);
                            }));
              }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0), gameObjectArr.map((function (gameObject) {
                      return GameObjectComponentEngineService$WonderEditor.getBasicCameraViewComponent(gameObject, engineState);
                    })).filter((function (basicCameraViewOpt) {
                    if (basicCameraViewOpt !== undefined) {
                      return BasicCameraViewEngineService$WonderEditor.isActiveBasicCameraView(basicCameraViewOpt, engineState);
                    } else {
                      return false;
                    }
                  })));
}

function _setActiveBasicCameraViewEditorData(gameObjectArr, engineState, editorState) {
  var match = ArrayService$WonderEditor.getFirst(_getActiveBasicCameraViews(gameObjectArr, engineState));
  if (match !== undefined) {
    return GameViewEditorService$WonderEditor.setActivedBasicCameraView(Caml_option.valFromOption(match), editorState);
  } else {
    return editorState;
  }
}

function buildSetSABSceneGameObjectToBeSceneFunc(scriptAPIJsObj) {
  return (function (sabSceneGameObject, engineState) {
      Contract$WonderLog.requireCheck((function (param) {
              return Contract$WonderLog.test(Log$WonderLog.buildAssertMessage("sabSceneGameObject shouldn\'t has basicCameraView component", "has"), (function (param) {
                            return Contract$WonderLog.assertFalse(GameObjectComponentEngineService$WonderEditor.hasBasicCameraViewComponent(sabSceneGameObject, engineState));
                          }));
            }), StateEditorService$WonderEditor.getStateIsDebug(/* () */0));
      var setSABSceneGameObjectToBeScene = scriptAPIJsObj.setSABSceneGameObjectToBeScene;
      var sabSceneGameObjectChildren = HierarchyGameObjectEngineService$WonderEditor.getAllChildren(sabSceneGameObject, engineState);
      var editorState = StateEditorService$WonderEditor.getState(/* () */0);
      var editorState$1 = ArrayService$WonderCommonlib.reduceOneParam((function (editorState, gameObject) {
              return _addGameObjectAllComponentTypeToMap(gameObject, engineState, editorState);
            }), editorState, ArrayService$WonderEditor.fastConcat(/* array */[sabSceneGameObject], sabSceneGameObjectChildren));
      var editorState$2 = _setActiveBasicCameraViewEditorData(sabSceneGameObjectChildren, engineState, GameViewEditorService$WonderEditor.removeActivedBasicCameraView(editorState$1));
      var editorState$3 = PickingEditorService$WonderEditor.clearSphereShape(editorState$2);
      var editorState$4 = SourceTextureCacheInspectorCanvasEditorService$WonderEditor.clearCache(editorState$3);
      var engineState$1 = GameObjectEngineService$WonderEditor.setGameObjectIsRoot(sabSceneGameObject, false, engineState);
      var engineState$2 = setSABSceneGameObjectToBeScene(sabSceneGameObject, engineState$1);
      StateEditorService$WonderEditor.setState(editorState$4);
      StateEngineService$WonderEditor.setState(engineState$2);
      Curry._1(UIStateService$WonderEditor.getDispatch(/* () */0), [
            AppStore$WonderEditor.UpdateAction,
            /* Update */[/* array */[
                /* SceneTree */6,
                /* Inspector */2
              ]]
          ]);
      return StateEngineService$WonderEditor.unsafeGetState(/* () */0);
    });
}

function buildDisposeSceneAllChildrenFunc(scriptAPIJsObj) {
  return (function (engineState) {
      var disposeSceneAllChildren = scriptAPIJsObj.disposeSceneAllChildren;
      var editorState = ArrayService$WonderCommonlib.reduceOneParam((function (editorState, gameObject) {
              return handleEditorData(gameObject, engineState, editorState);
            }), StateEditorService$WonderEditor.getState(/* () */0), HierarchyGameObjectEngineService$WonderEditor.getAllGameObjects(SceneEngineService$WonderEditor.getSceneGameObject(engineState), engineState));
      var editorState$1 = PickingEditorService$WonderEditor.clearSphereShape(editorState);
      var engineState$1 = disposeSceneAllChildren(engineState);
      var engineState$2 = JobEngineService$WonderEditor.execDisposeJob(engineState$1);
      StateEditorService$WonderEditor.setState(editorState$1);
      StateEngineService$WonderEditor.setState(engineState$2);
      dispatch(/* () */0);
      return StateEngineService$WonderEditor.unsafeGetState(/* () */0);
    });
}

var Editor = /* module */[
  /* _addGameObjectAllComponentTypeToMap */_addGameObjectAllComponentTypeToMap,
  /* buildAddSABSceneGameObjectChildrenToSceneFunc */buildAddSABSceneGameObjectChildrenToSceneFunc,
  /* _getActiveBasicCameraViews */_getActiveBasicCameraViews,
  /* _setActiveBasicCameraViewEditorData */_setActiveBasicCameraViewEditorData,
  /* buildSetSABSceneGameObjectToBeSceneFunc */buildSetSABSceneGameObjectToBeSceneFunc,
  /* buildDisposeSceneAllChildrenFunc */buildDisposeSceneAllChildrenFunc
];

var AssetBundle = /* module */[
  /* Path */Path,
  /* Load */Load,
  /* Cache */Cache,
  /* Editor */Editor
];

function _extend (destination,source){
                for (let property in source) {
                    destination[property] = source[property];
                }

                return destination;
    };

function _rewriteScriptAPIJsObj(scriptAPIJsObj) {
  return _extend(MutableHashMapService$WonderCommonlib.copy(scriptAPIJsObj), {
              disposeGameObject: buildDisposeGameObjectFunc(scriptAPIJsObj),
              getAssetBundlePath: getAssetBundlePath,
              loadSABAndSetToState: loadSABAndSetToState,
              loadAllDependencyRABAndSetToState: loadAllDependencyRABAndSetToState,
              loadWABAndSetToState: loadWABAndSetToState,
              loadAssetBundle: loadAssetBundle,
              initAssetBundleArrayBufferCache: initAssetBundleArrayBufferCache,
              isAssetBundleArrayBufferCached: isAssetBundleArrayBufferCached,
              getAssetBundleArrayBufferCache: getAssetBundleArrayBufferCache,
              cacheAssetBundleArrayBuffer: cacheAssetBundleArrayBuffer,
              addSABSceneGameObjectChildrenToScene: buildAddSABSceneGameObjectChildrenToSceneFunc(scriptAPIJsObj),
              setSABSceneGameObjectToBeScene: buildSetSABSceneGameObjectToBeSceneFunc(scriptAPIJsObj),
              disposeSceneAllChildren: buildDisposeSceneAllChildrenFunc(scriptAPIJsObj)
            });
}

function initJob(param, engineState) {
  var apiRecord = engineState[/* apiRecord */43];
  var newrecord = Caml_array.caml_array_dup(engineState);
  newrecord[/* apiRecord */43] = /* record */[
    /* scriptAPIJsObj */_rewriteScriptAPIJsObj(apiRecord[/* scriptAPIJsObj */0]),
    /* imguiAPIJsObj */apiRecord[/* imguiAPIJsObj */1]
  ];
  return newrecord;
}

export {
  DisposeGameObject ,
  AssetBundle ,
  _extend ,
  _rewriteScriptAPIJsObj ,
  initJob ,
  
}
/* Log-WonderLog Not a pure module */
