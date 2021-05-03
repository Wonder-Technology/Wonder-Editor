

import * as OptionService$WonderEditor from "../../../primitive/OptionService.js";
import * as MaterialDataAssetService$WonderEditor from "../../../record/editor/asset/MaterialDataAssetService.js";

function getMaterialData(editorState) {
  return MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */5]);
}

function unsafeGetDefaultBasicMaterialData(editorState) {
  return OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */5])[/* defaultBasicMaterialData */0]);
}

function unsafeGetDefaultBasicMaterial(editorState) {
  return OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */5])[/* defaultBasicMaterialData */0])[0];
}

function setDefaultBasicMaterialData(material, editorState) {
  var init = editorState[/* assetRecord */5];
  var init$1 = MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */5]);
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
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
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord */editorState[/* transformRecord */12],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

function unsafeGetDefaultLightMaterialData(editorState) {
  return OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */5])[/* defaultLightMaterialData */1]);
}

function unsafeGetDefaultLightMaterial(editorState) {
  return OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */5])[/* defaultLightMaterialData */1])[0];
}

function unsafeGetDefaultMaterialDataByType(type_, editorState) {
  if (type_) {
    return OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */5])[/* defaultLightMaterialData */1]);
  } else {
    return OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */5])[/* defaultBasicMaterialData */0]);
  }
}

function setDefaultLightMaterialData(material, editorState) {
  var init = editorState[/* assetRecord */5];
  var init$1 = MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */5]);
  return /* record */[
          /* inspectorCanvasRecord */editorState[/* inspectorCanvasRecord */0],
          /* imgCanvasRecord */editorState[/* imgCanvasRecord */1],
          /* uiRecord */editorState[/* uiRecord */2],
          /* settingRecord */editorState[/* settingRecord */3],
          /* sceneTreeRecord */editorState[/* sceneTreeRecord */4],
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
          /* sceneViewRecord */editorState[/* sceneViewRecord */6],
          /* gameViewRecord */editorState[/* gameViewRecord */7],
          /* eventRecord */editorState[/* eventRecord */8],
          /* imguiRecord */editorState[/* imguiRecord */9],
          /* inspectorRecord */editorState[/* inspectorRecord */10],
          /* consoleRecord */editorState[/* consoleRecord */11],
          /* transformRecord */editorState[/* transformRecord */12],
          /* pickingRecord */editorState[/* pickingRecord */13],
          /* currentDragSource */editorState[/* currentDragSource */14],
          /* currentSelectSource */editorState[/* currentSelectSource */15],
          /* loopId */editorState[/* loopId */16],
          /* languageType */editorState[/* languageType */17]
        ];
}

function getAllDefaultMaterialData(editorState) {
  return /* array */[
          OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */5])[/* defaultBasicMaterialData */0]),
          OptionService$WonderEditor.unsafeGet(MaterialDataAssetService$WonderEditor.getMaterialData(editorState[/* assetRecord */5])[/* defaultLightMaterialData */1])
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
