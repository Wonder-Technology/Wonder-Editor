

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as TestTool$WonderEditor from "../../tool/TestTool.js";
import * as AssetUtils$WonderEditor from "../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/utils/AssetUtils.js";
import * as BaseEventTool$WonderEditor from "../../tool/ui/BaseEventTool.js";
import * as DragEventUtils$WonderEditor from "../../../src/core/utils/event/DragEventUtils.js";
import * as SceneTreeUtils$WonderEditor from "../../../src/core/composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/utils/SceneTreeUtils.js";
import * as DragEventBaseUtils$WonderEditor from "../../../src/core/utils/event/DragEventBaseUtils.js";
import * as SceneEngineService$WonderEditor from "../../../src/service/state/engine/SceneEngineService.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../src/service/state/engine/StateEngineService.js";
import * as MainEditorSceneTree$WonderEditor from "../../../src/core/composable_component/mainEditor/composable_component/left_components/composable_component/sceneTree/ui/MainEditorSceneTree.js";
import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as WDBNodeMapAssetEditorService$WonderEditor from "../../../src/service/state/editor/asset/WDBNodeMapAssetEditorService.js";

function getSimpleSceneTree() {
  return /* array */[/* record */[
            /* name */"root",
            /* uid */0,
            /* isShowChildren */true,
            /* children : array */[
              /* record */[
                /* name */"gameObject1",
                /* uid */1,
                /* isShowChildren */true,
                /* children : array */[]
              ],
              /* record */[
                /* name */"gameObject2",
                /* uid */2,
                /* isShowChildren */true,
                /* children : array */[]
              ],
              /* record */[
                /* name */"gameObject3",
                /* uid */3,
                /* isShowChildren */true,
                /* children : array */[]
              ]
            ]
          ]];
}

function getTwoLayerSceneTree() {
  return /* array */[/* record */[
            /* name */"root",
            /* uid */0,
            /* isShowChildren */true,
            /* children : array */[
              /* record */[
                /* name */"gameObject1",
                /* uid */1,
                /* isShowChildren */true,
                /* children : array */[]
              ],
              /* record */[
                /* name */"gameObject2",
                /* uid */2,
                /* isShowChildren */true,
                /* children : array */[]
              ],
              /* record */[
                /* name */"gameObject3",
                /* uid */3,
                /* isShowChildren */true,
                /* children : array */[
                  /* record */[
                    /* name */"gameObject4",
                    /* uid */4,
                    /* isShowChildren */true,
                    /* children : array */[]
                  ],
                  /* record */[
                    /* name */"gameObject5",
                    /* uid */5,
                    /* isShowChildren */true,
                    /* children : array */[]
                  ]
                ]
              ]
            ]
          ]];
}

function getThreeLayerSceneTree() {
  return /* array */[/* record */[
            /* name */"root",
            /* uid */0,
            /* isShowChildren */true,
            /* children : array */[
              /* record */[
                /* name */"gameObject1",
                /* uid */1,
                /* isShowChildren */true,
                /* children : array */[]
              ],
              /* record */[
                /* name */"gameObject2",
                /* uid */2,
                /* isShowChildren */true,
                /* children : array */[]
              ],
              /* record */[
                /* name */"gameObject3",
                /* uid */3,
                /* isShowChildren */true,
                /* children : array */[
                  /* record */[
                    /* name */"gameObject4",
                    /* uid */4,
                    /* isShowChildren */true,
                    /* children : array */[]
                  ],
                  /* record */[
                    /* name */"gameObject5",
                    /* uid */5,
                    /* isShowChildren */true,
                    /* children : array */[/* record */[
                        /* name */"gameObject6",
                        /* uid */6,
                        /* isShowChildren */true,
                        /* children : array */[]
                      ]]
                  ]
                ]
              ]
            ]
          ]];
}

function isTriggerDragCurrentSceneTreeNode(targetGameObject) {
  return DragEventBaseUtils$WonderEditor.isTriggerDragEnter(targetGameObject, SceneTreeUtils$WonderEditor.isWidget, SceneTreeUtils$WonderEditor.isGameObjectRelationError);
}

function dragWDBAssetToSceneTree(wdbNodeId, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, $staropt$star$5, $staropt$star$6, _) {
  var targetGameObject = $staropt$star !== undefined ? $staropt$star : SceneEngineService$WonderEditor.getSceneGameObject(StateEngineService$WonderEditor.unsafeGetState(/* () */0));
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  var store = $staropt$star$2 !== undefined ? $staropt$star$2 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var widget = $staropt$star$3 !== undefined ? $staropt$star$3 : AssetUtils$WonderEditor.getWidget(/* () */0);
  var effectEffectAllowd = $staropt$star$4 !== undefined ? $staropt$star$4 : "move";
  var dragImg = $staropt$star$5 !== undefined ? Js_primitive.valFromOption($staropt$star$5) : document.createElement("img");
  var $$event = $staropt$star$6 !== undefined ? Js_primitive.valFromOption($staropt$star$6) : BaseEventTool$WonderEditor.buildDragEvent();
  DragEventUtils$WonderEditor.handleDragStart(wdbNodeId, widget, dragImg, effectEffectAllowd, $$event);
  var param = SparseMapService$WonderCommonlib.unsafeGet(wdbNodeId, WDBNodeMapAssetEditorService$WonderEditor.getWDBNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
  Curry._3(MainEditorSceneTree$WonderEditor.Method[/* dragWDBIntoScene */3], /* tuple */[
        store,
        dispatchFunc
      ], /* () */0, /* tuple */[
        targetGameObject,
        param[/* wdbGameObject */3]
      ]);
  return DragEventUtils$WonderEditor.handleDrageEnd($$event);
}

function dragGameObjectIntoGameObject(sourceGameObject, targetGameObject, $staropt$star, $staropt$star$1, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildAppStateSceneGraphFromEngine(/* () */0);
  return Curry._3(MainEditorSceneTree$WonderEditor.Method[/* dragGameObjectIntoGameObject */2], /* tuple */[
              store,
              dispatchFunc
            ], /* () */0, /* tuple */[
              targetGameObject,
              sourceGameObject
            ]);
}

var Drag = /* module */[
  /* isTriggerDragCurrentSceneTreeNode */isTriggerDragCurrentSceneTreeNode,
  /* dragWDBAssetToSceneTree */dragWDBAssetToSceneTree,
  /* dragGameObjectIntoGameObject */dragGameObjectIntoGameObject
];

function selectGameObject($staropt$star, $staropt$star$1, gameObject, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  return MainEditorSceneTree$WonderEditor.Method[/* onSelect */0](/* tuple */[
              store,
              dispatchFunc
            ], gameObject);
}

var Select = /* module */[/* selectGameObject */selectGameObject];

export {
  getSimpleSceneTree ,
  getTwoLayerSceneTree ,
  getThreeLayerSceneTree ,
  Drag ,
  Select ,
  
}
/* TestTool-WonderEditor Not a pure module */
