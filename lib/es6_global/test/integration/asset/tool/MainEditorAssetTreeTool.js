

import * as List from "../../../../../../node_modules/bs-platform/lib/es6/list.js";
import * as Curry from "../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as Js_option from "../../../../../../node_modules/bs-platform/lib/es6/js_option.js";
import * as TestTool$WonderEditor from "../../../tool/TestTool.js";
import * as ArrayService$WonderEditor from "../../../../src/service/atom/ArrayService.js";
import * as FolderNodeUtils$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/composable_component/utils/FolderNodeUtils.js";
import * as NodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/NodeAssetService.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as StateEngineService$WonderEditor from "../../../../src/service/state/engine/state/StateEngineService.js";
import * as IdAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/IdAssetEditorService.js";
import * as RootTreeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/RootTreeAssetService.js";
import * as FolderNodeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/FolderNodeAssetService.js";
import * as TreeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/TreeAssetEditorService.js";
import * as GameObjectEngineService$WonderEditor from "../../../../src/service/state/engine/gameObject/GameObjectEngineService.js";
import * as IterateTreeAssetService$WonderEditor from "../../../../src/service/record/editor/asset/IterateTreeAssetService.js";
import * as NodeNameAssetLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/asset/NodeNameAssetLogicService.js";
import * as RootTreeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/RootTreeAssetEditorService.js";
import * as MainEditorAssetTreeNodeTool$WonderEditor from "./MainEditorAssetTreeNodeTool.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../../src/service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as OperateLightMaterialLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/material/OperateLightMaterialLogicService.js";
import * as AssetDragNodeToFolderEventHandler$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/bottom_components/composable_component/project/composable_component/asset/eventHandler/AssetDragNodeToFolderEventHandler.js";

function findNodeByName(targetNodeName, param) {
  var engineState = param[1];
  var predNodeFunc = function (node) {
    return NodeNameAssetLogicService$WonderEditor.isTargetNameNode(node, targetNodeName, engineState);
  };
  return IterateTreeAssetService$WonderEditor.findOne(TreeAssetEditorService$WonderEditor.unsafeGetTree(param[0]), predNodeFunc, predNodeFunc, predNodeFunc, predNodeFunc, /* () */0);
}

function findNodeIdByName(targetNodeName, param) {
  return Js_option.map(NodeAssetService$WonderEditor.getNodeId, findNodeByName(targetNodeName, /* tuple */[
                  param[0],
                  param[1]
                ]));
}

function findNodesByName(targetNodeName, param) {
  var engineState = param[1];
  var predNodeFunc = function (node) {
    return NodeNameAssetLogicService$WonderEditor.isTargetNameNode(node, targetNodeName, engineState);
  };
  return IterateTreeAssetService$WonderEditor.find(TreeAssetEditorService$WonderEditor.unsafeGetTree(param[0]), predNodeFunc, predNodeFunc, predNodeFunc, predNodeFunc, /* () */0);
}

function findNodeIdsByName(targetNodeName, param) {
  return Js_option.map((function (nodes) {
                return List.map(NodeAssetService$WonderEditor.getNodeId, nodes);
              }), findNodesByName(targetNodeName, /* tuple */[
                  param[0],
                  param[1]
                ]));
}

function getRootNodeId(editorState) {
  return NodeAssetService$WonderEditor.getNodeId(RootTreeAssetEditorService$WonderEditor.getRootNode(editorState));
}

function _buildRootNode(rootNodeId) {
  return FolderNodeAssetService$WonderEditor.buildNode(rootNodeId, RootTreeAssetService$WonderEditor.getAssetTreeRootName(/* () */0), undefined, /* () */0);
}

function buildEmptyAssetTree(param) {
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var editorState$1 = TreeAssetEditorService$WonderEditor.createTree(editorState);
  StateEditorService$WonderEditor.setState(editorState$1);
  return NodeAssetService$WonderEditor.getNodeId(RootTreeAssetEditorService$WonderEditor.getRootNode(editorState$1));
}

function buildOneTextureAssetTree(param) {
  var rootId = buildEmptyAssetTree(/* () */0);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
  var id1 = match[1];
  StateLogicService$WonderEditor.setState(MainEditorAssetTreeNodeTool$WonderEditor.insertTextureNode(id1, rootId, "texture1", /* tuple */[
            match[0],
            engineState
          ]));
  return /* record */[
          /* root */rootId,
          /* textureNodeIdArr : array */[id1]
        ];
}

function buildTwoTextureAssetTree(param) {
  var rootId = buildEmptyAssetTree(/* () */0);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
  var id1 = match[1];
  var match$1 = IdAssetEditorService$WonderEditor.generateNodeId(match[0]);
  var id2 = match$1[1];
  StateLogicService$WonderEditor.setState(MainEditorAssetTreeNodeTool$WonderEditor.insertTextureNode(id2, rootId, "texture2", MainEditorAssetTreeNodeTool$WonderEditor.insertTextureNode(id1, rootId, "texture1", /* tuple */[
                match$1[0],
                engineState
              ])));
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

function buildOneMaterialAssetTree(param) {
  var rootId = buildEmptyAssetTree(/* () */0);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
  var id1 = match[1];
  var match$1 = OperateLightMaterialLogicService$WonderEditor.createLightMaterialAndSetName("material1", engineState);
  StateLogicService$WonderEditor.setState(MainEditorAssetTreeNodeTool$WonderEditor.insertMaterialNode(id1, rootId, match$1[0], /* tuple */[
            match[0],
            match$1[1]
          ]));
  return /* record */[
          /* root */rootId,
          /* materialNodeIdArr : array */[id1]
        ];
}

function getRootNodeId$1(param) {
  return param[/* root */0];
}

function getFirstMaterialNodeId(param) {
  return ArrayService$WonderEditor.unsafeGetFirst(param[/* materialNodeIdArr */1]);
}

var Material = /* module */[
  /* buildOneMaterialAssetTree */buildOneMaterialAssetTree,
  /* getRootNodeId */getRootNodeId$1,
  /* getFirstMaterialNodeId */getFirstMaterialNodeId
];

function buildOneWDBAssetTree(param) {
  var rootId = buildEmptyAssetTree(/* () */0);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
  var id1 = match[1];
  var match$1 = GameObjectEngineService$WonderEditor.create(engineState);
  StateLogicService$WonderEditor.setState(MainEditorAssetTreeNodeTool$WonderEditor.insertWDBNode(id1, rootId, match$1[1], "gameObject1", /* tuple */[
            match[0],
            match$1[0]
          ]));
  return /* record */[
          /* root */rootId,
          /* wdbNodeIdArr : array */[id1]
        ];
}

function getRootNodeId$2(param) {
  return param[/* root */0];
}

function getFirstWDBNodeId(param) {
  return ArrayService$WonderEditor.unsafeGetFirst(param[/* wdbNodeIdArr */1]);
}

var WDB = /* module */[
  /* buildOneWDBAssetTree */buildOneWDBAssetTree,
  /* getRootNodeId */getRootNodeId$2,
  /* getFirstWDBNodeId */getFirstWDBNodeId
];

function buildOneFolderAssetTree(param) {
  var rootId = buildEmptyAssetTree(/* () */0);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
  var id1 = match[1];
  StateLogicService$WonderEditor.setState(MainEditorAssetTreeNodeTool$WonderEditor.insertFolderNode(id1, rootId, /* tuple */[
            match[0],
            engineState
          ]));
  return /* record */[
          /* root */rootId,
          /* folderNodeIdArr : array */[id1]
        ];
}

function buildTwoFolderAssetTree(param) {
  var rootId = buildEmptyAssetTree(/* () */0);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
  var id1 = match[1];
  var match$1 = IdAssetEditorService$WonderEditor.generateNodeId(match[0]);
  var id2 = match$1[1];
  StateLogicService$WonderEditor.setState(MainEditorAssetTreeNodeTool$WonderEditor.insertFolderNode(id2, rootId, MainEditorAssetTreeNodeTool$WonderEditor.insertFolderNode(id1, rootId, /* tuple */[
                match$1[0],
                engineState
              ])));
  return /* record */[
          /* root */rootId,
          /* folderNodeIdArr : array */[
            id1,
            id2
          ]
        ];
}

function getRootNodeId$3(param) {
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
  /* getRootNodeId */getRootNodeId$3,
  /* getFirstFolderNodeId */getFirstFolderNodeId,
  /* getSecondFolderNodeId */getSecondFolderNodeId
];

function buildFourFolderAssetTree(param) {
  var rootId = buildEmptyAssetTree(/* () */0);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
  var id1 = match[1];
  var match$1 = IdAssetEditorService$WonderEditor.generateNodeId(match[0]);
  var id2 = match$1[1];
  var match$2 = IdAssetEditorService$WonderEditor.generateNodeId(match$1[0]);
  var id3 = match$2[1];
  var match$3 = IdAssetEditorService$WonderEditor.generateNodeId(match$2[0]);
  var id4 = match$3[1];
  StateLogicService$WonderEditor.setState(MainEditorAssetTreeNodeTool$WonderEditor.insertFolderNode(id4, id2, MainEditorAssetTreeNodeTool$WonderEditor.insertFolderNode(id3, id2, MainEditorAssetTreeNodeTool$WonderEditor.insertFolderNode(id2, rootId, MainEditorAssetTreeNodeTool$WonderEditor.insertFolderNode(id1, rootId, /* tuple */[
                        match$3[0],
                        engineState
                      ])))));
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

function getRootNodeId$4(param) {
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
  /* getRootNodeId */getRootNodeId$4,
  /* getSecondLayerFirstFolderNodeId */getSecondLayerFirstFolderNodeId,
  /* getSecondLayerSecondFolderNodeId */getSecondLayerSecondFolderNodeId,
  /* getThirdLayerFirstFolderNodeId */getThirdLayerFirstFolderNodeId
];

var Folder = /* module */[
  /* TwoLayer */TwoLayer,
  /* ThreeLayer */ThreeLayer
];

function buildFolderAndTextureAndMaterialAssetTree(param) {
  var rootId = buildEmptyAssetTree(/* () */0);
  var editorState = StateEditorService$WonderEditor.getState(/* () */0);
  var engineState = StateEngineService$WonderEditor.unsafeGetState(/* () */0);
  var match = IdAssetEditorService$WonderEditor.generateNodeId(editorState);
  var id1 = match[1];
  var match$1 = IdAssetEditorService$WonderEditor.generateNodeId(match[0]);
  var id2 = match$1[1];
  var match$2 = IdAssetEditorService$WonderEditor.generateNodeId(match$1[0]);
  var id3 = match$2[1];
  var match$3 = IdAssetEditorService$WonderEditor.generateNodeId(match$2[0]);
  var id4 = match$3[1];
  var match$4 = IdAssetEditorService$WonderEditor.generateNodeId(match$3[0]);
  var id5 = match$4[1];
  var match$5 = IdAssetEditorService$WonderEditor.generateNodeId(match$4[0]);
  var match$6 = IdAssetEditorService$WonderEditor.generateNodeId(match$5[0]);
  var match$7 = OperateLightMaterialLogicService$WonderEditor.createLightMaterialAndSetName("material1", engineState);
  var match$8 = OperateLightMaterialLogicService$WonderEditor.createLightMaterialAndSetName("material2", match$7[1]);
  StateLogicService$WonderEditor.setState(MainEditorAssetTreeNodeTool$WonderEditor.insertFolderNode(id4, id2, MainEditorAssetTreeNodeTool$WonderEditor.insertFolderNode(id3, id2, MainEditorAssetTreeNodeTool$WonderEditor.insertTextureNode(id5, id2, "texture5", MainEditorAssetTreeNodeTool$WonderEditor.insertMaterialNode(match$6[1], id2, match$8[0], MainEditorAssetTreeNodeTool$WonderEditor.insertMaterialNode(match$5[1], id1, match$7[0], MainEditorAssetTreeNodeTool$WonderEditor.insertFolderNode(id2, rootId, MainEditorAssetTreeNodeTool$WonderEditor.insertFolderNode(id1, rootId, /* tuple */[
                                    match$6[0],
                                    match$8[1]
                                  ]))))))));
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

function getRootNodeId$5(param) {
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
  /* getRootNodeId */getRootNodeId$5,
  /* getSecondLayerFirstFolderNodeId */getSecondLayerFirstFolderNodeId$1,
  /* getSecondLayerSecondFolderNodeId */getSecondLayerSecondFolderNodeId$1,
  /* getThirdLayerFirstFolderNodeId */getThirdLayerFirstFolderNodeId$1,
  /* getThirdLayerFirstTextureNodeId */getThirdLayerFirstTextureNodeId
];

var All = /* module */[/* ThreeLayer */ThreeLayer$1];

var BuildAssetTree = /* module */[
  /* _buildRootNode */_buildRootNode,
  /* buildEmptyAssetTree */buildEmptyAssetTree,
  /* Texture */Texture,
  /* Material */Material,
  /* WDB */WDB,
  /* Folder */Folder,
  /* All */All
];

function selectNode(nodeId, $staropt$star, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  return FolderNodeUtils$WonderEditor.enterFolder(dispatchFunc, nodeId);
}

function selectFolderNode(nodeId, $staropt$star, param) {
  var dispatchFunc = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.getDispatch(/* () */0);
  return selectNode(nodeId, dispatchFunc, /* () */0);
}

var Select = /* module */[
  /* selectNode */selectNode,
  /* selectFolderNode */selectFolderNode
];

function dragAssetTreeNode(startNodeId, targetNodeId, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(AssetDragNodeToFolderEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
              uiState,
              dispatchFunc
            ], /* () */0, /* tuple */[
              targetNodeId,
              startNodeId
            ]);
}

function dragAssetChildrenNodeIntoAssetTreeNode(startNodeId, targetNodeId, $staropt$star, $staropt$star$1, param) {
  var uiState = $staropt$star !== undefined ? $staropt$star : TestTool$WonderEditor.buildEmptyAppState(/* () */0);
  var dispatchFunc = $staropt$star$1 !== undefined ? $staropt$star$1 : TestTool$WonderEditor.getDispatch(/* () */0);
  return Curry._3(AssetDragNodeToFolderEventHandler$WonderEditor.MakeEventHandler[/* pushUndoStackWithNoCopyEngineState */0], /* tuple */[
              uiState,
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

var findNodeParent = OperateTreeAssetEditorService$WonderEditor.findNodeParent;

var findNodeParentId = OperateTreeAssetEditorService$WonderEditor.findNodeParentId;

export {
  findNodeByName ,
  findNodeIdByName ,
  findNodesByName ,
  findNodeIdsByName ,
  findNodeParent ,
  findNodeParentId ,
  getRootNodeId ,
  BuildAssetTree ,
  Select ,
  Drag ,
  
}
/* TestTool-WonderEditor Not a pure module */
