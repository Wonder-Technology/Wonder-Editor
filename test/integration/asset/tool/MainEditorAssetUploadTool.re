open Js.Promise;

let loadOneTexture =
    (
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~imgName="loadImg.png",
      ~imgSrc="newImgBase64",
      (),
    ) => {
  let uploadedTextureNodeId = MainEditorAssetIdTool.getNewAssetId();

  AssetHeaderFileLoadEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
    (store, dispatchFunc),
    WonderBsJszip.Zip.create,
    BaseEventTool.buildOneTextureFileEvent(~imgName, ~imgSrc, ()),
  )
  |> then_(() => uploadedTextureNodeId |> resolve);
};

let loadOneWDB =
    (
      ~arrayBuffer,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~fileName="Wdb",
      (),
    ) => {
  let uploadedWDBNodeId = MainEditorAssetIdTool.getNewAssetId();

  AssetHeaderFileLoadEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
    (store, dispatchFunc),
    WonderBsJszip.Zip.create,
    BaseEventTool.buildWDBFileEvent(fileName, arrayBuffer),
  )
  |> then_(() => uploadedWDBNodeId |> resolve);
};

let loadOneGLB =
    (
      ~arrayBuffer,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~fileName="Glb",
      (),
    ) => {
  let uploadedWDBNodeId = MainEditorAssetIdTool.getNewAssetId();

  AssetHeaderFileLoadEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
    (store, dispatchFunc),
    WonderBsJszip.Zip.create,
    BaseEventTool.buildGLBFileEvent(fileName, arrayBuffer),
  )
  |> then_(() => uploadedWDBNodeId |> resolve);
};

let loadOneGLTFZip =
    (
      ~sandbox,
      /* ~arrayBuffer, */
      ~createJsZipFunc,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~fileName="GltfZip",
      (),
    ) => {
  /* let obj = HeaderTool.buildPublishFakeJsZipCreateFunc(sandbox^); */

  let uploadedWDBNodeId = MainEditorAssetIdTool.getNewAssetId();

  AssetHeaderFileLoadEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
    (store, dispatchFunc),
    /* WonderBsJszip.Zip.create, */
    /* () => obj, */
    createJsZipFunc,
    BaseEventTool.buildGLTFZipFileEvent(fileName),
  )
  |> then_(() => uploadedWDBNodeId |> resolve);
};