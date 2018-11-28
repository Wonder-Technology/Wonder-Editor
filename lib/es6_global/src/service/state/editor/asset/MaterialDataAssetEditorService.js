

import * as Curry from "../../../../../../../node_modules/bs-platform/lib/es6/curry.js";
import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";
import * as MaterialDataAssetService$WonderEditor from "../../../record/editor/asset/MaterialDataAssetService.js";

function getMaterialData(editorState) {
  return MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */2]);
}

function unsafeGetDefaultBasicMaterialData(editorState) {
  return OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */2])[/* defaultBasicMaterialData */0]);
}

function unsafeGetDefaultBasicMaterial(editorState) {
  return OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */2])[/* defaultBasicMaterialData */0])[0];
}

function setDefaultBasicMaterialData(material, editorState) {
  var init = editorState[/* assetRecord */2];
  var init$1 = MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */2]);
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord : record */[
            /* assetTreeRoot */init[/* assetTreeRoot */0],
            /* index */init[/* index */1],
            /* imageIndex */init[/* imageIndex */2],
            /* removedAssetIdArray */init[/* removedAssetIdArray */3],
            /* currentNodeData */init[/* currentNodeData */4],
            /* currentNodeParentId */init[/* currentNodeParentId */5],
            /* textureNodeMap */init[/* textureNodeMap */6],
            /* folderNodeMap */init[/* folderNodeMap */7],
            /* wdbNodeMap */init[/* wdbNodeMap */8],
            /* materialNodeMap */init[/* materialNodeMap */9],
            /* materialNodeIdMap */init[/* materialNodeIdMap */10],
            /* imageNodeMap */init[/* imageNodeMap */11],
            /* geometryData */init[/* geometryData */12],
            /* materialData : record */[
              /* defaultBasicMaterialData *//* tuple */[
                material,
                /* BasicMaterial */0
              ],
              /* defaultLightMaterialData */init$1[/* defaultLightMaterialData */1]
            ]
          ],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* currentDragSource */editorState[/* currentDragSource */10],
          /* currentSelectSource */editorState[/* currentSelectSource */11],
          /* loopId */editorState[/* loopId */12]
        ];
}

function unsafeGetDefaultLightMaterialData(editorState) {
  return OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */2])[/* defaultLightMaterialData */1]);
}

function unsafeGetDefaultLightMaterial(editorState) {
  return OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */2])[/* defaultLightMaterialData */1])[0];
}

function unsafeGetMaterialDataByType(type_, editorState) {
  var unsafeGetMaterialDataFunc = type_ ? unsafeGetDefaultLightMaterialData : unsafeGetDefaultBasicMaterialData;
  return Curry._1(unsafeGetMaterialDataFunc, editorState);
}

function setDefaultLightMaterialData(material, editorState) {
  var init = editorState[/* assetRecord */2];
  var init$1 = MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */2]);
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneRecord */editorState[/* sceneRecord */1],
          /* assetRecord : record */[
            /* assetTreeRoot */init[/* assetTreeRoot */0],
            /* index */init[/* index */1],
            /* imageIndex */init[/* imageIndex */2],
            /* removedAssetIdArray */init[/* removedAssetIdArray */3],
            /* currentNodeData */init[/* currentNodeData */4],
            /* currentNodeParentId */init[/* currentNodeParentId */5],
            /* textureNodeMap */init[/* textureNodeMap */6],
            /* folderNodeMap */init[/* folderNodeMap */7],
            /* wdbNodeMap */init[/* wdbNodeMap */8],
            /* materialNodeMap */init[/* materialNodeMap */9],
            /* materialNodeIdMap */init[/* materialNodeIdMap */10],
            /* imageNodeMap */init[/* imageNodeMap */11],
            /* geometryData */init[/* geometryData */12],
            /* materialData : record */[
              /* defaultBasicMaterialData */init$1[/* defaultBasicMaterialData */0],
              /* defaultLightMaterialData *//* tuple */[
                material,
                /* LightMaterial */1
              ]
            ]
          ],
          /* sceneViewRecord */editorState[/* sceneViewRecord */3],
          /* gameViewRecord */editorState[/* gameViewRecord */4],
          /* eventRecord */editorState[/* eventRecord */5],
          /* imguiRecord */editorState[/* imguiRecord */6],
          /* inspectorRecord */editorState[/* inspectorRecord */7],
          /* consoleRecord */editorState[/* consoleRecord */8],
          /* transformRecord */editorState[/* transformRecord */9],
          /* currentDragSource */editorState[/* currentDragSource */10],
          /* currentSelectSource */editorState[/* currentSelectSource */11],
          /* loopId */editorState[/* loopId */12]
        ];
}

function getAllDefaultMaterialData(editorState) {
  return /* array */[
          OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */2])[/* defaultBasicMaterialData */0]),
          OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */2])[/* defaultLightMaterialData */1])
        ];
}

export {
  getMaterialData ,
  unsafeGetDefaultBasicMaterialData ,
  unsafeGetDefaultBasicMaterial ,
  setDefaultBasicMaterialData ,
  unsafeGetDefaultLightMaterialData ,
  unsafeGetDefaultLightMaterial ,
  unsafeGetMaterialDataByType ,
  setDefaultLightMaterialData ,
  getAllDefaultMaterialData ,
  
}
/* OptionService-WonderEditor Not a pure module */
