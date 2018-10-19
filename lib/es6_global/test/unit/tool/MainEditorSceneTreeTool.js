

import * as Curry from "../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_primitive from "../../../../../node_modules/bs-platform/lib/es6/js_primitive.js";
import * as TestTool$WonderEditor from "../../tool/TestTool.js";
import * as AssetUtils$WonderEditor from "../../../src/core/composable_component/mainEditor/composable_component/bottom_components/asset/utils/AssetUtils.js";
import * as BaseEventTool$WonderEditor from "../../tool/ui/BaseEventTool.js";
import * as DragEventUtils$WonderEditor from "../../../src/core/utils/event/DragEventUtils.js";
import * as SceneTreeUtils$WonderEditor from "../../../src/core/composable_component/mainEditor/composable_component/sceneTree/utils/SceneTreeUtils.js";
import * as DragEventBaseUtils$WonderEditor from "../../../src/core/utils/event/DragEventBaseUtils.js";
import * as StateEditorService$WonderEditor from "../../../src/service/state/editor/StateEditorService.js";
import * as MainEditorSceneTree$WonderEditor from "../../../src/core/composable_component/mainEditor/composable_component/sceneTree/ui/MainEditorSceneTree.js";
import * as SparseMapService$WonderCommonlib from "../../../../../node_modules/wonder-commonlib/lib/es6_global/src/SparseMapService.js";
import * as AssetWDBNodeMapEditorService$WonderEditor from "../../../src/service/state/editor/asset/AssetWDBNodeMapEditorService.js";

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

function dragAssetWDBToSceneTree(wdbNodeId, $staropt$star, $staropt$star$1, $staropt$star$2, $staropt$star$3, $staropt$star$4, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  var store = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var widget = $staropt$star$2 !== undefined ? $staropt$star$2 : AssetUtils$WonderEditor.getWidget(/* () */0);
  var dragImg = $staropt$star$3 !== undefined ? Js_primitive.valFromOption($staropt$star$3) : document.createElement("img");
  var $$event = $staropt$star$4 !== undefined ? Js_primitive.valFromOption($staropt$star$4) : BaseEventTool$WonderEditor.buildDragEvent();
  DragEventUtils$WonderEditor.handleDragStart(wdbNodeId, widget, dragImg, $$event);
  var param = SparseMapService$WonderCommonlib.unsafeGet(wdbNodeId, AssetWDBNodeMapEditorService$WonderEditor.getWDBNodeMap(StateEditorService$WonderEditor.getState(/* () */0)));
  Curry._3(MainEditorSceneTree$WonderEditor.Method[/* dragWDBIntoScene */3], /* tuple */[
        store,
        dispatchFunc
      ], /* () */0, param[/* wdbGameObject */4]);
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
  /* dragAssetWDBToSceneTree */dragAssetWDBToSceneTree,
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

var getDragedSceneGraphData = SceneTreeUtils$WonderEditor.getDragedSceneGraphData;

export {
  getDragedSceneGraphData ,
  getSimpleSceneTree ,
  getTwoLayerSceneTree ,
  getThreeLayerSceneTree ,
  Drag ,
  Select ,
  
}
/* TestTool-WonderEditor Not a pure module */
