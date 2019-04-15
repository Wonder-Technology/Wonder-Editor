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

let _setSnapShotToImageDataMapByNode =
    (imgCanvasBase64, currentNode, editorState) => {
  let {imageDataIndex} = currentNode |> MaterialNodeAssetService.getNodeData;

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
};

let _setSnapShotToImageDataMapByNodeId =
    (imgCanvasBase64, currentNodeId, editorState) =>
  _setSnapShotToImageDataMapByNode(
    imgCanvasBase64,
    editorState
    |> OperateTreeAssetEditorService.unsafeFindNodeById(currentNodeId),
    editorState,
  );

let clipTargetCanvasSnapshotAndSetToImageDataMapByNodeId =
    (targetCanvasDom, imgCanvasDom, currentNodeId, editorState) =>
  editorState
  |> _clipTargetCanvasSnapshot(targetCanvasDom, imgCanvasDom)
  |> _setSnapShotToImageDataMapByNodeId(_, currentNodeId, editorState);

let clipTargetCanvasSnapshotAndSetToImageDataMapByNode =
    (targetCanvasDom, imgCanvasDom, currentNode, editorState) =>
  editorState
  |> _clipTargetCanvasSnapshot(targetCanvasDom, imgCanvasDom)
  |> _setSnapShotToImageDataMapByNode(_, currentNode, editorState);