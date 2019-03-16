

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
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord : record */[
            /* nodeIndex */init[/* nodeIndex */0],
            /* imageDataMapIndex */init[/* imageDataMapIndex */1],
            /* tree */init[/* tree */2],
            /* currentNodeId */init[/* currentNodeId */3],
            /* selectedFolderNodeIdInAssetTree */init[/* selectedFolderNodeIdInAssetTree */4],
            /* imageDataMap */init[/* imageDataMap */5],
            /* geometryData */init[/* geometryData */6],
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
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13],
          /* languageType */editorState[/* languageType */14]
        ];
}

function unsafeGetDefaultLightMaterialData(editorState) {
  return OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */2])[/* defaultLightMaterialData */1]);
}

function unsafeGetDefaultLightMaterial(editorState) {
  return OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */2])[/* defaultLightMaterialData */1])[0];
}

function unsafeGetDefaultMaterialDataByType(type_, editorState) {
  if (type_) {
    return OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */2])[/* defaultLightMaterialData */1]);
  } else {
    return OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */2])[/* defaultBasicMaterialData */0]);
  }
}

function setDefaultLightMaterialData(material, editorState) {
  var init = editorState[/* assetRecord */2];
  var init$1 = MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */2]);
  return /* record */[
          /* settingRecord */editorState[/* settingRecord */0],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */1],
          /* assetRecord : record */[
            /* nodeIndex */init[/* nodeIndex */0],
            /* imageDataMapIndex */init[/* imageDataMapIndex */1],
            /* tree */init[/* tree */2],
            /* currentNodeId */init[/* currentNodeId */3],
            /* selectedFolderNodeIdInAssetTree */init[/* selectedFolderNodeIdInAssetTree */4],
            /* imageDataMap */init[/* imageDataMap */5],
            /* geometryData */init[/* geometryData */6],
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
          /* pickingRecord */editorState[/* pickingRecord */10],
          /* currentDragSource */editorState[/* currentDragSource */11],
          /* currentSelectSource */editorState[/* currentSelectSource */12],
          /* loopId */editorState[/* loopId */13],
          /* languageType */editorState[/* languageType */14]
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
  unsafeGetDefaultMaterialDataByType ,
  setDefaultLightMaterialData ,
  getAllDefaultMaterialData ,
  
}
/* OptionService-WonderEditor Not a pure module */
