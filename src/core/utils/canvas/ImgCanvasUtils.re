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

let drawImgCanvasSnapshot =
    (
      imgContext: CanvasType.context,
      targetCanvasDom,
      (clipBegin, clipEnd, clipWidth, clipHeight),
      (snapshotBegin, snapshotEnd, snapshotWidth, snapshotHeight),
    ) => {
  let drawImage = imgContext##drawImage;

  drawImage(
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
};

let _ClipTargetCanvasSnapshot = (targetCanvasDom, imgCanvasDom, editorState) => {
  editorState
  |> ImgContextImgCanvasEditorService.unsafeGetImgContext
  |> drawImgCanvasSnapshot(
       _,
       targetCanvasDom,
       calcTargetCanvasClipArea(targetCanvasDom),
       getImgCanvasSnapshotArea(),
     )
  |> ignore;

  let toDataURL = CanvasType.convertDomEleToCanvas(imgCanvasDom)##toDataURL;

  toDataURL();
};

let _setSnapShotToImageDataMap = (imgCanvasBase64, currentNodeId, editorState) => {
  let {imageDataIndex} =
    editorState
    |> OperateTreeAssetEditorService.unsafeFindNodeById(currentNodeId)
    |> MaterialNodeAssetService.getNodeData;

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

let clipTargetCanvasSnapshotAndSetToImageDataMap =
    (targetCanvasDom, imgCanvasDom, currentNodeId, editorState) =>
  editorState
  |> _ClipTargetCanvasSnapshot(targetCanvasDom, imgCanvasDom)
  |> _setSnapShotToImageDataMap(_, currentNodeId, editorState);