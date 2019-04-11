open NodeAssetType;

let _getTagretCanvasClipSize = () => (200., 200.);

let getClipTagretCanvasArea = targetCanvasDom => {
  let (targetWidth, targetHeight) = _getTagretCanvasClipSize();

  let targetCanvasWidth =
    CanvasType.convertCanvasToJsObj(targetCanvasDom)##width;
  let targetCanvasHeight =
    CanvasType.convertCanvasToJsObj(targetCanvasDom)##height;

  let offsetLeft = (targetCanvasWidth -. targetWidth) /. 2.;
  let offsetTop = (targetCanvasHeight -. targetHeight) /. 2.;

  (offsetLeft, offsetTop, targetWidth, targetHeight);
};

let getImgCanvasSnapshotArea = () => (0., 0., 50., 50.);

let drawImgCanvasSnapshot =
    (
      imgContext,
      targetCanvasDom,
      (clipStatr, clipEnd, clipWidth, clipHeight),
      (snapshotStart, snapshotEnd, snapshotWidth, snapshotHeight),
    ) =>
  imgContext##drawImage(
    targetCanvasDom,
    clipStatr,
    clipEnd,
    clipWidth,
    clipHeight,
    snapshotStart,
    snapshotEnd,
    snapshotWidth,
    snapshotHeight,
  );

let clipTargetCanvasToCreateImgCanvasSnapshot =
    (targetCanvasDom, imgCanvasDom, currentNodeId, editorState) => {
  editorState
  |> ImgContextImgCanvasEditorService.unsafeGetImgContext
  |> CanvasType.convertContextToJsObj
  |> drawImgCanvasSnapshot(
       _,
       targetCanvasDom,
       getClipTagretCanvasArea(targetCanvasDom),
       getImgCanvasSnapshotArea(),
     )
  |> ignore;

  let imgCanvasBase64: string =
    CanvasType.convertCanvasToJsObj(imgCanvasDom)##toDataURL();

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

/* let clipTargetCanvasToCreateImgCanvasSnapshotTest =
       (targetCanvasDom, imgCanvasDom, imageDataIndex, editorState) => {
     editorState
     |> ImgContextImgCanvasEditorService.unsafeGetImgContext
     |> CanvasType.convertContextToJsObj
     |> drawImgCanvasSnapshot(
          _,
          targetCanvasDom,
          getClipTagretCanvasArea(targetCanvasDom),
          getImgCanvasSnapshotArea(),
        )
     |> ignore;

     let imgCanvasBase64 =
       CanvasType.convertCanvasToJsObj(imgCanvasDom)##toDataURL();

     editorState
     |> ImageDataMapAssetEditorService.setData(
          imageDataIndex,
          editorState
          |> ImageDataMapAssetEditorService.unsafeGetData(imageDataIndex)
          |> (imageData => {...imageData, base64: imgCanvasBase64}),
        );
   }; */