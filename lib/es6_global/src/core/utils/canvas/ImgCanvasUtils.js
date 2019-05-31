

import * as CanvasType$WonderEditor from "../../external/type/CanvasType.js";
import * as WDBNodeAssetService$WonderEditor from "../../../service/record/editor/asset/WDBNodeAssetService.js";
import * as MaterialNodeAssetService$WonderEditor from "../../../service/record/editor/asset/MaterialNodeAssetService.js";
import * as OperateTreeAssetEditorService$WonderEditor from "../../../service/state/editor/asset/OperateTreeAssetEditorService.js";
import * as ImageDataMapAssetEditorService$WonderEditor from "../../../service/state/editor/asset/ImageDataMapAssetEditorService.js";
import * as ImgContextImgCanvasEditorService$WonderEditor from "../../../service/state/editor/imgCanvas/ImgContextImgCanvasEditorService.js";

function _getTagretCanvasClipSize(param) {
  return /* tuple */[
          200,
          200
        ];
}

function calcTargetCanvasClipArea(targetCanvasDom) {
  var targetCanvasWidth = targetCanvasDom.width;
  var targetCanvasHeight = targetCanvasDom.height;
  var offsetLeft = (targetCanvasWidth - 200) / 2;
  var offsetTop = (targetCanvasHeight - 200) / 2;
  return /* tuple */[
          offsetLeft,
          offsetTop,
          200,
          200
        ];
}

function getImgCanvasSnapshotArea(param) {
  return /* tuple */[
          0,
          0,
          50,
          50
        ];
}

function _drawImgCanvasSnapshot(canvasContext, targetCanvasDom, param, param$1) {
  return CanvasType$WonderEditor.drawImage(canvasContext, targetCanvasDom, param[0], param[1], param[2], param[3], param$1[0], param$1[1], param$1[2], param$1[3]);
}

function _clipTargetCanvasSnapshot(targetCanvasDom, imgCanvasDom, editorState) {
  var __x = ImgContextImgCanvasEditorService$WonderEditor.unsafeGetImgContext(editorState);
  var __x$1 = CanvasType$WonderEditor.clearRect(__x, imgCanvasDom);
  _drawImgCanvasSnapshot(__x$1, targetCanvasDom, calcTargetCanvasClipArea(targetCanvasDom), /* tuple */[
        0,
        0,
        50,
        50
      ]);
  return CanvasType$WonderEditor.toDataURL(imgCanvasDom);
}

function _setSnapShotToImageDataMap(imgCanvasBase64, imageDataIndex, editorState) {
  var imageData = ImageDataMapAssetEditorService$WonderEditor.unsafeGetData(imageDataIndex, editorState);
  return ImageDataMapAssetEditorService$WonderEditor.setData(imageDataIndex, /* record */[
              /* base64 */imgCanvasBase64,
              /* uint8Array */undefined,
              /* blobObjectURL */undefined,
              /* name */imageData[/* name */3],
              /* mimeType */imageData[/* mimeType */4]
            ], editorState);
}

function _setSnapShotToImageDataMapByMaterialNodeId(imgCanvasBase64, currentNodeId, editorState) {
  var match = MaterialNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(currentNodeId, editorState));
  return _setSnapShotToImageDataMap(imgCanvasBase64, match[/* imageDataIndex */2], editorState);
}

function _setSnapShotToImageDataMapByWDBNodeId(imgCanvasBase64, currentNodeId, editorState) {
  var match = WDBNodeAssetService$WonderEditor.getNodeData(OperateTreeAssetEditorService$WonderEditor.unsafeFindNodeById(currentNodeId, editorState));
  return _setSnapShotToImageDataMap(imgCanvasBase64, match[/* imageDataIndex */2], editorState);
}

function clipTargetCanvasSnapshotAndSetToImageDataMapByMaterialNodeId(targetCanvasDom, imgCanvasDom, currentNodeId, editorState) {
  return _setSnapShotToImageDataMapByMaterialNodeId(_clipTargetCanvasSnapshot(targetCanvasDom, imgCanvasDom, editorState), currentNodeId, editorState);
}

function clipTargetCanvasSnapshotAndSetToImageDataMapByMaterialNode(targetCanvasDom, imgCanvasDom, currentNode, editorState) {
  var match = MaterialNodeAssetService$WonderEditor.getNodeData(currentNode);
  return _setSnapShotToImageDataMap(_clipTargetCanvasSnapshot(targetCanvasDom, imgCanvasDom, editorState), match[/* imageDataIndex */2], editorState);
}

function clipTargetCanvasSnapshotAndSetToImageDataMapByWDBNodeId(targetCanvasDom, imgCanvasDom, currentNodeId, editorState) {
  return _setSnapShotToImageDataMapByWDBNodeId(_clipTargetCanvasSnapshot(targetCanvasDom, imgCanvasDom, editorState), currentNodeId, editorState);
}

export {
  _getTagretCanvasClipSize ,
  calcTargetCanvasClipArea ,
  getImgCanvasSnapshotArea ,
  _drawImgCanvasSnapshot ,
  _clipTargetCanvasSnapshot ,
  _setSnapShotToImageDataMap ,
  _setSnapShotToImageDataMapByMaterialNodeId ,
  _setSnapShotToImageDataMapByWDBNodeId ,
  clipTargetCanvasSnapshotAndSetToImageDataMapByMaterialNodeId ,
  clipTargetCanvasSnapshotAndSetToImageDataMapByMaterialNode ,
  clipTargetCanvasSnapshotAndSetToImageDataMapByWDBNodeId ,
  
}
/* WDBNodeAssetService-WonderEditor Not a pure module */
