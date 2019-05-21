open NodeAssetType;

let _getTagretCanvasClipSize = () => (200., 200.);

let calcTargetCanvasClipArea = targetCanvasDom => {
  let (targetWidth, targetHeight) = _getTagretCanvasClipSize();

  let targetCanvasWidth =
    CanvasType.convertDomEleToCanvas(targetCanvasDom)##width;
  let targetCanvasHeight =
    CanvasType.convertDomEleToCanvas(targetCanvasDom)##height;

  let offsetLeft = (targetCanvasWidth -. targetWidth) /. 2.;
  let offsetTop = (targetCanvasHeight -. targetHeight) /. 2.;

  (offsetLeft, offsetTop, targetWidth, targetHeight);
};

let getImgCanvasSnapshotArea = () => (0., 0., 50., 50.);

let _drawImgCanvasSnapshot =
    (
      canvasContext,
      targetCanvasDom,
      (clipBegin, clipEnd, clipWidth, clipHeight),
      (snapshotBegin, snapshotEnd, snapshotWidth, snapshotHeight),
    ) =>
  CanvasType.drawImage(
    canvasContext,
    targetCanvasDom,
    clipBegin,
    clipEnd,
    clipWidth,
    clipHeight,
    snapshotBegin,
    snapshotEnd,
    snapshotWidth,
    snapshotHeight,
  );

let _clipTargetCanvasSnapshot = (targetCanvasDom, imgCanvasDom, editorState) => {
  editorState
  |> ImgContextImgCanvasEditorService.unsafeGetImgContext
  |> _drawImgCanvasSnapshot(
       _,
       targetCanvasDom,
       calcTargetCanvasClipArea(targetCanvasDom),
       getImgCanvasSnapshotArea(),
     )
  |> ignore;

  CanvasType.toDataURL(imgCanvasDom);
};

let _setSnapShotToImageDataMap =
    (imgCanvasBase64, imageDataIndex, editorState) =>
  editorState
  |> ImageDataMapAssetEditorService.setData(
       imageDataIndex,
       editorState
       |> ImageDataMapAssetEditorService.unsafeGetData(imageDataIndex)
       |> (
         imageData => {
           ...imageData,
           base64: Some(imgCanvasBase64),
           uint8Array: None,
           blobObjectURL: None,
         }
       ),
     );

let _setSnapShotToImageDataMapByMaterialNodeId =
    (imgCanvasBase64, currentNodeId, editorState) => {
  let {imageDataIndex}: materialNodeData =
    editorState
    |> OperateTreeAssetEditorService.unsafeFindNodeById(currentNodeId)
    |> MaterialNodeAssetService.getNodeData;

  _setSnapShotToImageDataMap(imgCanvasBase64, imageDataIndex, editorState);
};

let _setSnapShotToImageDataMapByWDBNodeId =
    (imgCanvasBase64, currentNodeId, editorState) => {
  let {imageDataIndex}: wdbNodeData =
    editorState
    |> OperateTreeAssetEditorService.unsafeFindNodeById(currentNodeId)
    |> WDBNodeAssetService.getNodeData;

  _setSnapShotToImageDataMap(imgCanvasBase64, imageDataIndex, editorState);
};

let clipTargetCanvasSnapshotAndSetToImageDataMapByMaterialNodeId =
    (targetCanvasDom, imgCanvasDom, currentNodeId, editorState) =>
  editorState
  |> _clipTargetCanvasSnapshot(targetCanvasDom, imgCanvasDom)
  |> _setSnapShotToImageDataMapByMaterialNodeId(_, currentNodeId, editorState);

let clipTargetCanvasSnapshotAndSetToImageDataMapByMaterialNode =
    (targetCanvasDom, imgCanvasDom, currentNode, editorState) => {
  let {imageDataIndex} = MaterialNodeAssetService.getNodeData(currentNode);

  editorState
  |> _clipTargetCanvasSnapshot(targetCanvasDom, imgCanvasDom)
  |> _setSnapShotToImageDataMap(_, imageDataIndex, editorState);
};

let clipTargetCanvasSnapshotAndSetToImageDataMapByWDBNodeId =
    (targetCanvasDom, imgCanvasDom, currentNodeId, editorState) =>
  editorState
  |> _clipTargetCanvasSnapshot(targetCanvasDom, imgCanvasDom)
  |> _setSnapShotToImageDataMapByWDBNodeId(_, currentNodeId, editorState);