

import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as ArrayService$WonderEditor from "../../../../src/service/atom/ArrayService.js";
import * as AssetTreeUtils$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/utils/AssetTreeUtils.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/StateEngineService.js";
import * as IndexAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/IndexAssetEditorService.js";
import * as TreeRootAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/TreeRootAssetEditorService.js";
import * as MainEditorAssetTreeNodeTool$WonderEditor from "./MainEditorAssetTreeNodeTool.js";
import * as OperateLightMaterialLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/OperateLightMaterialLogicService.js";
import * as AssetDragNodeToFolderEventHandler$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/eventHandler/AssetDragNodeToFolderEventHandler.js";

function _increaseIndex(editorState) {
  var editorState$1 = IndexAssetEditorService$WonderEditor.increaseIndex(editorState);
  var index = IndexAssetEditorService$WonderEditor.getIndex(editorState$1);
  return /* tuple */[
          index,
          editorState$1
        ];
}

function buildEmptyAssetTree() {
  var match = _increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
  var rootId = match[0];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var __x = TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
        /* nodeId */rootId,
        /* children : array */[],
        /* type_ : Folder */0,
        /* isShowChildren */true
      ], match[1]);
  StateEditorService$WonderEditor.setState(MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(rootId, undefined, __x, engineState));
  return rootId;
}

function buildOneTextureAssetTree() {
  var match = _increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
  var rootId = match[0];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match$1 = _increaseIndex(match[1]);
  var id1 = match$1[0];
  var __x = TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
        /* nodeId */rootId,
        /* children : array */[],
        /* type_ : Folder */0,
        /* isShowChildren */true
      ], match$1[1]);
  var __x$1 = MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(rootId, undefined, __x, engineState);
  StateEditorService$WonderEditor.setState(TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
            /* nodeId */rootId,
            /* children : array */[/* record */[
                /* nodeId */id1,
                /* children : array */[],
                /* type_ : Texture */1,
                /* isShowChildren */true
              ]],
            /* type_ : Folder */0,
            /* isShowChildren */true
          ], MainEditorAssetTreeNodeTool$WonderEditor.addTextureIntoNodeMap(id1, rootId, "texture1", MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(id1, rootId, __x$1, engineState))));
  return /* record */[
          /* root */rootId,
          /* textureNodeIdArr : array */[id1]
        ];
}

function buildTwoTextureAssetTree() {
  var match = _increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
  var rootId = match[0];
  StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match$1 = _increaseIndex(match[1]);
  var id1 = match$1[0];
  var match$2 = _increaseIndex(match$1[1]);
  var id2 = match$2[0];
  StateEditorService$WonderEditor.setState(TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
            /* nodeId */rootId,
            /* children : array */[
              /* record */[
                /* nodeId */id1,
                /* children : array */[],
                /* type_ : Texture */1,
                /* isShowChildren */true
              ],
              /* record */[
                /* nodeId */id2,
                /* children : array */[],
                /* type_ : Texture */1,
                /* isShowChildren */true
              ]
            ],
            /* type_ : Folder */0,
            /* isShowChildren */true
          ], MainEditorAssetTreeNodeTool$WonderEditor.addTextureIntoNodeMap(id2, rootId, "texture2", MainEditorAssetTreeNodeTool$WonderEditor.addTextureIntoNodeMap(id1, rootId, "texture1", TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                        /* nodeId */rootId,
                        /* children : array */[],
                        /* type_ : Folder */0,
                        /* isShowChildren */true
                      ], match$2[1])))));
  return /* record */[
          /* root */rootId,
          /* textureNodeIdArr : array */[
            id1,
            id2
          ]
        ];
}

function getFirstTextureNodeId(param) {
  return ArrayService$WonderEditor.unsafeGetFirst(param[/* textureNodeIdArr */1]);
}

function getSecondTextureNodeId(param) {
  return ArrayService$WonderEditor.unsafeGetNth(1, param[/* textureNodeIdArr */1]);
}

var Texture = /* module */[
  /* buildOneTextureAssetTree */buildOneTextureAssetTree,
  /* buildTwoTextureAssetTree */buildTwoTextureAssetTree,
  /* getFirstTextureNodeId */getFirstTextureNodeId,
  /* getSecondTextureNodeId */getSecondTextureNodeId
];

function buildOneMaterialAssetTree() {
  var match = _increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
  var rootId = match[0];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match$1 = _increaseIndex(match[1]);
  var id1 = match$1[0];
  var match$2 = OperateLightMaterialLogicService$WonderEditor.createLightMaterialAndSetName("material1", engineState);
  var __x = TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
        /* nodeId */rootId,
        /* children : array */[],
        /* type_ : Folder */0,
        /* isShowChildren */true
      ], match$1[1]);
  StateEditorService$WonderEditor.setState(TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
            /* nodeId */rootId,
            /* children : array */[/* record */[
                /* nodeId */id1,
                /* children : array */[],
                /* type_ : Material */3,
                /* isShowChildren */true
              ]],
            /* type_ : Folder */0,
            /* isShowChildren */true
          ], MainEditorAssetTreeNodeTool$WonderEditor.addMaterialIntoNodeMap(id1, rootId, match$2[0], MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(rootId, undefined, __x, match$2[1]))));
  return /* record */[
          /* root */rootId,
          /* materialNodeIdArr : array */[id1]
        ];
}

function getRootNodeId(param) {
  return param[/* root */0];
}

function getFirstMaterialNodeId(param) {
  return ArrayService$WonderEditor.unsafeGetFirst(param[/* materialNodeIdArr */1]);
}

var Material = /* module */[
  /* buildOneMaterialAssetTree */buildOneMaterialAssetTree,
  /* getRootNodeId */getRootNodeId,
  /* getFirstMaterialNodeId */getFirstMaterialNodeId
];

function buildOneFolderAssetTree() {
  var match = _increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
  var rootId = match[0];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match$1 = _increaseIndex(match[1]);
  var id1 = match$1[0];
  var __x = TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
        /* nodeId */rootId,
        /* children : array */[],
        /* type_ : Folder */0,
        /* isShowChildren */true
      ], match$1[1]);
  var __x$1 = MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(rootId, undefined, __x, engineState);
  StateEditorService$WonderEditor.setState(TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
            /* nodeId */rootId,
            /* children : array */[/* record */[
                /* nodeId */id1,
                /* children : array */[],
                /* type_ : Folder */0,
                /* isShowChildren */true
              ]],
            /* type_ : Folder */0,
            /* isShowChildren */true
          ], MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(id1, rootId, __x$1, engineState)));
  return /* record */[
          /* root */rootId,
          /* folderNodeIdArr : array */[id1]
        ];
}

function buildTwoFolderAssetTree() {
  var match = _increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
  var rootId = match[0];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match$1 = _increaseIndex(match[1]);
  var id1 = match$1[0];
  var match$2 = _increaseIndex(match$1[1]);
  var id2 = match$2[0];
  var __x = TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
        /* nodeId */rootId,
        /* children : array */[],
        /* type_ : Folder */0,
        /* isShowChildren */true
      ], match$2[1]);
  var __x$1 = MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(rootId, undefined, __x, engineState);
  var __x$2 = MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(id1, rootId, __x$1, engineState);
  StateEditorService$WonderEditor.setState(TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
            /* nodeId */rootId,
            /* children : array */[
              /* record */[
                /* nodeId */id1,
                /* children : array */[],
                /* type_ : Folder */0,
                /* isShowChildren */true
              ],
              /* record */[
                /* nodeId */id2,
                /* children : array */[],
                /* type_ : Folder */0,
                /* isShowChildren */true
              ]
            ],
            /* type_ : Folder */0,
            /* isShowChildren */true
          ], MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(id2, rootId, __x$2, engineState)));
  return /* record */[
          /* root */rootId,
          /* folderNodeIdArr : array */[
            id1,
            id2
          ]
        ];
}

function getRootNodeId$1(param) {
  return param[/* root */0];
}

function getFirstFolderNodeId(param) {
  return ArrayService$WonderEditor.unsafeGetFirst(param[/* folderNodeIdArr */1]);
}

function getSecondFolderNodeId(param) {
  return ArrayService$WonderEditor.unsafeGetNth(1, param[/* folderNodeIdArr */1]);
}

var TwoLayer = /* module */[
  /* buildOneFolderAssetTree */buildOneFolderAssetTree,
  /* buildTwoFolderAssetTree */buildTwoFolderAssetTree,
  /* getRootNodeId */getRootNodeId$1,
  /* getFirstFolderNodeId */getFirstFolderNodeId,
  /* getSecondFolderNodeId */getSecondFolderNodeId
];

function buildFourFolderAssetTree() {
  var match = _increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
  var rootId = match[0];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match$1 = _increaseIndex(match[1]);
  var id1 = match$1[0];
  var match$2 = _increaseIndex(match$1[1]);
  var id2 = match$2[0];
  var match$3 = _increaseIndex(match$2[1]);
  var id3 = match$3[0];
  var match$4 = _increaseIndex(match$3[1]);
  var id4 = match$4[0];
  var __x = TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
        /* nodeId */rootId,
        /* children : array */[],
        /* type_ : Folder */0,
        /* isShowChildren */true
      ], match$4[1]);
  var __x$1 = MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(rootId, undefined, __x, engineState);
  var __x$2 = MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(id1, rootId, __x$1, engineState);
  var __x$3 = TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
        /* nodeId */rootId,
        /* children : array */[
          /* record */[
            /* nodeId */id1,
            /* children : array */[],
            /* type_ : Folder */0,
            /* isShowChildren */true
          ],
          /* record */[
            /* nodeId */id2,
            /* children : array */[],
            /* type_ : Folder */0,
            /* isShowChildren */true
          ]
        ],
        /* type_ : Folder */0,
        /* isShowChildren */true
      ], MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(id2, rootId, __x$2, engineState));
  var __x$4 = MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(id3, id2, __x$3, engineState);
  StateEditorService$WonderEditor.setState(TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
            /* nodeId */rootId,
            /* children : array */[
              /* record */[
                /* nodeId */id1,
                /* children : array */[],
                /* type_ : Folder */0,
                /* isShowChildren */true
              ],
              /* record */[
                /* nodeId */id2,
                /* children : array */[
                  /* record */[
                    /* nodeId */id3,
                    /* children : array */[],
                    /* type_ : Folder */0,
                    /* isShowChildren */true
                  ],
                  /* record */[
                    /* nodeId */id4,
                    /* children : array */[],
                    /* type_ : Folder */0,
                    /* isShowChildren */true
                  ]
                ],
                /* type_ : Folder */0,
                /* isShowChildren */true
              ]
            ],
            /* type_ : Folder */0,
            /* isShowChildren */true
          ], MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(id4, id2, __x$4, engineState)));
  return /* record */[
          /* root */rootId,
          /* secondLayer : record */[/* folderNodeIdArr : array */[
              id1,
              id2
            ]],
          /* thirdLayer : record */[/* folderNodeIdArr : array */[
              id3,
              id4
            ]]
        ];
}

function getRootNodeId$2(param) {
  return param[/* root */0];
}

function getSecondLayerFirstFolderNodeId(param) {
  return ArrayService$WonderEditor.unsafeGetNth(0, param[/* secondLayer */1][/* folderNodeIdArr */0]);
}

function getSecondLayerSecondFolderNodeId(param) {
  return ArrayService$WonderEditor.unsafeGetNth(1, param[/* secondLayer */1][/* folderNodeIdArr */0]);
}

function getThirdLayerFirstFolderNodeId(param) {
  return ArrayService$WonderEditor.unsafeGetNth(0, param[/* thirdLayer */2][/* folderNodeIdArr */0]);
}

var ThreeLayer = /* module */[
  /* buildFourFolderAssetTree */buildFourFolderAssetTree,
  /* getRootNodeId */getRootNodeId$2,
  /* getSecondLayerFirstFolderNodeId */getSecondLayerFirstFolderNodeId,
  /* getSecondLayerSecondFolderNodeId */getSecondLayerSecondFolderNodeId,
  /* getThirdLayerFirstFolderNodeId */getThirdLayerFirstFolderNodeId
];

var Folder = /* module */[
  /* TwoLayer */TwoLayer,
  /* ThreeLayer */ThreeLayer
];

function buildFolderAndTextureAndMaterialAssetTree() {
  var match = _increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
  var rootId = match[0];
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match$1 = _increaseIndex(match[1]);
  var id1 = match$1[0];
  var match$2 = _increaseIndex(match$1[1]);
  var id2 = match$2[0];
  var match$3 = _increaseIndex(match$2[1]);
  var id3 = match$3[0];
  var match$4 = _increaseIndex(match$3[1]);
  var id4 = match$4[0];
  var match$5 = _increaseIndex(match$4[1]);
  var id5 = match$5[0];
  var match$6 = _increaseIndex(match$5[1]);
  var id6 = match$6[0];
  var match$7 = _increaseIndex(match$6[1]);
  var id7 = match$7[0];
  var match$8 = OperateLightMaterialLogicService$WonderEditor.createLightMaterialAndSetName("material1", engineState);
  var match$9 = OperateLightMaterialLogicService$WonderEditor.createLightMaterialAndSetName("material2", match$8[1]);
  var engineState$1 = match$9[1];
  var __x = TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
        /* nodeId */rootId,
        /* children : array */[],
        /* type_ : Folder */0,
        /* isShowChildren */true
      ], match$7[1]);
  var __x$1 = MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(rootId, undefined, __x, engineState$1);
  var __x$2 = MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(id1, rootId, __x$1, engineState$1);
  var __x$3 = TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
        /* nodeId */rootId,
        /* children : array */[
          /* record */[
            /* nodeId */id1,
            /* children : array */[],
            /* type_ : Folder */0,
            /* isShowChildren */true
          ],
          /* record */[
            /* nodeId */id2,
            /* children : array */[],
            /* type_ : Folder */0,
            /* isShowChildren */true
          ]
        ],
        /* type_ : Folder */0,
        /* isShowChildren */true
      ], MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(id2, rootId, __x$2, engineState$1));
  var __x$4 = MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(id3, id2, __x$3, engineState$1);
  StateEditorService$WonderEditor.setState(TreeRootAssetEditorService$WonderEditor.setAssetTreeRoot(/* record */[
            /* nodeId */rootId,
            /* children : array */[
              /* record */[
                /* nodeId */id1,
                /* children : array */[/* record */[
                    /* nodeId */id6,
                    /* children : array */[],
                    /* type_ : Material */3,
                    /* isShowChildren */true
                  ]],
                /* type_ : Folder */0,
                /* isShowChildren */true
              ],
              /* record */[
                /* nodeId */id2,
                /* children : array */[
                  /* record */[
                    /* nodeId */id3,
                    /* children : array */[],
                    /* type_ : Folder */0,
                    /* isShowChildren */true
                  ],
                  /* record */[
                    /* nodeId */id4,
                    /* children : array */[],
                    /* type_ : Folder */0,
                    /* isShowChildren */true
                  ],
                  /* record */[
                    /* nodeId */id5,
                    /* children : array */[],
                    /* type_ : Texture */1,
                    /* isShowChildren */true
                  ],
                  /* record */[
                    /* nodeId */id7,
                    /* children : array */[],
                    /* type_ : Material */3,
                    /* isShowChildren */true
                  ]
                ],
                /* type_ : Folder */0,
                /* isShowChildren */true
              ]
            ],
            /* type_ : Folder */0,
            /* isShowChildren */true
          ], MainEditorAssetTreeNodeTool$WonderEditor.addMaterialIntoNodeMap(id7, id2, match$9[0], MainEditorAssetTreeNodeTool$WonderEditor.addMaterialIntoNodeMap(id6, id1, match$8[0], MainEditorAssetTreeNodeTool$WonderEditor.addTextureIntoNodeMap(id5, id2, "texture5", MainEditorAssetTreeNodeTool$WonderEditor.addFolderIntoNodeMapWithNoNameName(id4, id2, __x$4, engineState$1))))));
  return /* record */[
          /* root */rootId,
          /* secondLayer : record */[
            /* textureNodeIdArr : array */[],
            /* folderNodeIdArr : array */[
              id1,
              id2
            ]
          ],
          /* thirdLayer : record */[
            /* textureNodeIdArr : array */[id5],
            /* folderNodeIdArr : array */[
              id3,
              id4
            ]
          ]
        ];
}

function getRootNodeId$3(param) {
  return param[/* root */0];
}

function getSecondLayerFirstFolderNodeId$1(param) {
  return ArrayService$WonderEditor.unsafeGetNth(0, param[/* secondLayer */1][/* folderNodeIdArr */1]);
}

function getSecondLayerSecondFolderNodeId$1(param) {
  return ArrayService$WonderEditor.unsafeGetNth(1, param[/* secondLayer */1][/* folderNodeIdArr */1]);
}

function getThirdLayerFirstFolderNodeId$1(param) {
  return ArrayService$WonderEditor.unsafeGetNth(0, param[/* thirdLayer */2][/* folderNodeIdArr */1]);
}

function getThirdLayerFirstTextureNodeId(param) {
  return ArrayService$WonderEditor.unsafeGetNth(0, param[/* thirdLayer */2][/* textureNodeIdArr */0]);
}

var ThreeLayer$1 = /* module */[
  /* buildFolderAndTextureAndMaterialAssetTree */buildFolderAndTextureAndMaterialAssetTree,
  /* getRootNodeId */getRootNodeId$3,
  /* getSecondLayerFirstFolderNodeId */getSecondLayerFirstFolderNodeId$1,
  /* getSecondLayerSecondFolderNodeId */getSecondLayerSecondFolderNodeId$1,
  /* getThirdLayerFirstFolderNodeId */getThirdLayerFirstFolderNodeId$1,
  /* getThirdLayerFirstTextureNodeId */getThirdLayerFirstTextureNodeId
];

var All = /* module */[/* ThreeLayer */ThreeLayer$1];

var BuildAssetTree = /* module */[
  /* buildEmptyAssetTree */buildEmptyAssetTree,
  /* Texture */Texture,
  /* Material */Material,
  /* Folder */Folder,
  /* All */All
];

function selectNode(nodeType, nodeId, $staropt$star, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  return AssetTreeUtils$WonderEditor.enterFolder(dispatchFunc, nodeType, nodeId);
}

function selectFolderNode(nodeId, $staropt$star, _) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  return selectNode(/* Folder */0, nodeId, dispatchFunc, /* () */0);
}

var Select = /* module */[
  /* selectNode */selectNode,
  /* selectFolderNode */selectFolderNode
];

function dragAssetTreeNode(startNodeId, targetNodeId, $staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(AssetDragNodeToFolderEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
              store,
              dispatchFunc
            ], /* () */0, /* tuple */[
              targetNodeId,
              startNodeId
            ]);
}

function dragAssetChildrenNodeIntoAssetTreeNode(startNodeId, targetNodeId, $staropt$star, $staropt$star$1, _) {
  var store = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(AssetDragNodeToFolderEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
              store,
              dispatchFunc
            ], /* () */0, /* tuple */[
              targetNodeId,
              startNodeId
            ]);
}

var Drag = /* module */[
  /* dragAssetTreeNode */dragAssetTreeNode,
  /* dragAssetChildrenNodeIntoAssetTreeNode */dragAssetChildrenNodeIntoAssetTreeNode
];

export {
  _increaseIndex ,
  BuildAssetTree ,
  Select ,
  Drag ,
  
}
/* TestTool-WonderEditor Not a pure module */
