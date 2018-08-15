

import * as TextureUtils$WonderEditor from "../../../../src/core/utils/engine/TextureUtils.js";
import * as BaseEventTool$WonderEditor from "../../../tool/ui/BaseEventTool.js";
import * as StateLogicService$WonderEditor from "../../../../src/service/stateTuple/logic/StateLogicService.js";
import * as AssetTreeEventTool$WonderEditor from "./AssetTreeEventTool.js";
import * as AssetTreeNodeUtils$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/asset/utils/AssetTreeNodeUtils.js";
import * as BuildComponentTool$WonderEditor from "../../../tool/BuildComponentTool.js";
import * as StateEditorService$WonderEditor from "../../../../src/service/state/editor/StateEditorService.js";
import * as AssetNodeEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetNodeEditorService.js";
import * as AssetIndexEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetIndexEditorService.js";
import * as AssetTreeRootEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetTreeRootEditorService.js";
import * as MainEditorAssetHeaderUtils$WonderEditor from "../../../../src/core/composable_component/mainEditor/composable_component/asset/composable_component/utils/MainEditorAssetHeaderUtils.js";
import * as AssetJsonNodeMapEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetJsonNodeMapEditorService.js";
import * as BasicSourceTextureEngineService$WonderEditor from "../../../../src/service/state/engine/BasicSourceTextureEngineService.js";
import * as AssetImageBase64MapEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetImageBase64MapEditorService.js";
import * as AssetTextureNodeMapEditorService$WonderEditor from "../../../../src/service/state/editor/asset/AssetTextureNodeMapEditorService.js";

var buildFakeFileReader = (
     function (){
       window.FileReader = function(){
         this.result = null;
         this.onload = null;
         this.readAsDataURL = function(file) {
            this.result = file.file;
            this.onload();
         };
         this.readAsText = function(file) {
            this.result = file.file;
            this.onload();
         };
       }
     }
);

var buildFakeImage = (
     function (){
       window.Image = function(){
         this.src = null;
         this.onload = null;
         this.complete = true;
       }
     }
);

function _buildJsonResult() {
  return /* record */[
          /* name */"json.json",
          /* jsonResult */"json result"
        ];
}

function _buildImageObj(src) {
  return {
          src: src,
          getAttribute: (function () {
              return src;
            })
        };
}

function addJsonIntoNodeMap(index, editorState) {
  return AssetJsonNodeMapEditorService$WonderEditor.setResult(index, /* record */[
              /* name */"json.json",
              /* jsonResult */"json result"
            ], editorState);
}

function addTextureIntoNodeMap(index, textureName, editorState) {
  var match = TextureUtils$WonderEditor.createAndInitTexture(textureName, StateLogicService$WonderEditor.getEditEngineState(/* () */0), StateLogicService$WonderEditor.getRunEngineState(/* () */0));
  var texture = match[0];
  var imageSrc = textureName + "img";
  StateLogicService$WonderEditor.setEditEngineState(BasicSourceTextureEngineService$WonderEditor.setSource(_buildImageObj(imageSrc), texture, match[1]));
  StateLogicService$WonderEditor.setRunEngineState(BasicSourceTextureEngineService$WonderEditor.setSource(_buildImageObj(imageSrc), texture, match[2]));
  return AssetTextureNodeMapEditorService$WonderEditor.setResult(index, AssetNodeEditorService$WonderEditor.buildTextureNodeResult(texture), AssetImageBase64MapEditorService$WonderEditor.setResult(texture, imageSrc, editorState));
}

function _increaseIndex(editorState) {
  var editorState$1 = AssetIndexEditorService$WonderEditor.increaseIndex(editorState);
  var index = AssetIndexEditorService$WonderEditor.getIndex(editorState$1);
  return /* tuple */[
          index,
          editorState$1
        ];
}

function buildTwoLayerAssetTreeRoot() {
  var match = _increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
  var rootId = match[0];
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
  StateEditorService$WonderEditor.setState(addTextureIntoNodeMap(id5, "texture5", addJsonIntoNodeMap(id4, addTextureIntoNodeMap(id3, "texture3", AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(id2, AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(id1, AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(rootId, AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                    /* id */rootId,
                                    /* children : array */[
                                      /* record */[
                                        /* id */id1,
                                        /* children : array */[],
                                        /* type_ : Folder */0
                                      ],
                                      /* record */[
                                        /* id */id2,
                                        /* children : array */[],
                                        /* type_ : Folder */0
                                      ],
                                      /* record */[
                                        /* id */id3,
                                        /* children : array */[],
                                        /* type_ : Texture */2
                                      ],
                                      /* record */[
                                        /* id */id4,
                                        /* children : array */[],
                                        /* type_ : Json */1
                                      ],
                                      /* record */[
                                        /* id */id5,
                                        /* children : array */[],
                                        /* type_ : Texture */2
                                      ]
                                    ],
                                    /* type_ : Folder */0
                                  ], match$5[1]))))))));
  return /* record */[
          /* root */0,
          /* firstLayer : record */[
            /* length */4,
            /* folderDomIndexArr : array */[
              1,
              2
            ],
            /* jsonDomIndexArr : array */[4],
            /* textureData : record */[
              /* domIndexArr : array */[
                3,
                5
              ],
              /* lastIndex */1
            ]
          ],
          /* treeNodeIdData : record */[
            /* folderNodeIdArr : array */[
              rootId,
              id1,
              id2
            ],
            /* jsonNodeIdArr : array */[id4],
            /* textureNodeIdArr : array */[
              id3,
              id5
            ]
          ]
        ];
}

function buildThreeLayerAssetTreeRoot() {
  var match = _increaseIndex(StateEditorService$WonderEditor.getState(/* () */0));
  var rootId = match[0];
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
  StateEditorService$WonderEditor.setState(addJsonIntoNodeMap(id6, addTextureIntoNodeMap(id5, "texture5", AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(id4, AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(id3, AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(id2, AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(id1, AssetTreeNodeUtils$WonderEditor.addFolderIntoNodeMap(rootId, AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(/* record */[
                                        /* id */rootId,
                                        /* children : array */[
                                          /* record */[
                                            /* id */id1,
                                            /* children : array */[],
                                            /* type_ : Folder */0
                                          ],
                                          /* record */[
                                            /* id */id2,
                                            /* children : array */[
                                              /* record */[
                                                /* id */id3,
                                                /* children : array */[],
                                                /* type_ : Folder */0
                                              ],
                                              /* record */[
                                                /* id */id4,
                                                /* children : array */[],
                                                /* type_ : Folder */0
                                              ],
                                              /* record */[
                                                /* id */id5,
                                                /* children : array */[],
                                                /* type_ : Texture */2
                                              ],
                                              /* record */[
                                                /* id */id6,
                                                /* children : array */[],
                                                /* type_ : Json */1
                                              ]
                                            ],
                                            /* type_ : Folder */0
                                          ]
                                        ],
                                        /* type_ : Folder */0
                                      ], match$6[1])))))))));
  return /* record */[
          /* root */0,
          /* firstLayer : record */[
            /* length */1,
            /* folderDomIndexArr : array */[
              1,
              2
            ],
            /* jsonDomIndexArr : array */[],
            /* textureData : record */[
              /* domIndexArr : array */[],
              /* lastIndex */0
            ]
          ],
          /* secondLayer : record */[
            /* layerRoot */2,
            /* length */3,
            /* folderDomIndexArr : array */[
              1,
              2
            ],
            /* jsonDomIndexArr : array */[4],
            /* textureData : record */[
              /* domIndexArr : array */[3],
              /* lastIndex */0
            ]
          ],
          /* treeNodeIdData : record */[
            /* folderNodeIdArr : array */[
              rootId,
              id1,
              id2,
              id3,
              id4
            ],
            /* jsonNodeIdArr : array */[id6],
            /* textureNodeIdArr : array */[id5]
          ]
        ];
}

function initAssetTree() {
  return StateLogicService$WonderEditor.getAndSetEditorState((function (editorState) {
                var match = AssetTreeNodeUtils$WonderEditor.initRootAssetTree(editorState);
                return AssetTreeRootEditorService$WonderEditor.setAssetTreeRoot(match[0], match[1]);
              }));
}

function clickAssetChildrenNodeToSetCurrentNode(index) {
  var component = BuildComponentTool$WonderEditor.buildAssetComponent(/* () */0);
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                return AssetTreeEventTool$WonderEditor.clickAssetTreeChildrenNode(index, param);
              }));
}

function clickAssetTreeNodeToSetCurrentNode(component, index) {
  return BaseEventTool$WonderEditor.triggerComponentEvent(component, (function (param) {
                return AssetTreeEventTool$WonderEditor.clickAssetTreeNode(index, param);
              }));
}

var fileLoad = MainEditorAssetHeaderUtils$WonderEditor.fileLoad;

export {
  buildFakeFileReader ,
  buildFakeImage ,
  _buildJsonResult ,
  _buildImageObj ,
  addJsonIntoNodeMap ,
  addTextureIntoNodeMap ,
  _increaseIndex ,
  buildTwoLayerAssetTreeRoot ,
  buildThreeLayerAssetTreeRoot ,
  initAssetTree ,
  clickAssetChildrenNodeToSetCurrentNode ,
  clickAssetTreeNodeToSetCurrentNode ,
  fileLoad ,
  
}
/* buildFakeFileReader Not a pure module */
