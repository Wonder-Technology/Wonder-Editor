open Js.Promise;

let loadOneTexture =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~imgName="loadImg.png",
      ~imgSrc="newImgBase64",
      (),
    ) => {
  let uploadedTextureNodeId = MainEditorAssetIdTool.getNewAssetId();

  AssetHeaderFileLoadEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
    (uiState, dispatchFunc),
    WonderBsJszip.Zip.create,
    BaseEventTool.buildOneTextureFileEvent(~imgName, ~imgSrc, ()),
  )
  |> WonderBsMost.Most.drain
  |> then_(() => uploadedTextureNodeId |> resolve);
};

let loadOneWDB =
    (
      ~arrayBuffer,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~fileName="Wdb",
      (),
    ) => {
  let uploadedWDBNodeId = MainEditorAssetIdTool.getNewAssetId();

  AssetHeaderFileLoadEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
    (uiState, dispatchFunc),
    WonderBsJszip.Zip.create,
    BaseEventTool.buildWDBFileEvent(fileName, arrayBuffer),
  )
  |> WonderBsMost.Most.drain
  |> then_(() => uploadedWDBNodeId |> resolve);
};

let loadOneGLB =
    (
      ~arrayBuffer,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~fileName="Glb",
      (),
    ) => {
  let uploadedWDBNodeId = MainEditorAssetIdTool.getNewAssetId();

  AssetHeaderFileLoadEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
    (uiState, dispatchFunc),
    WonderBsJszip.Zip.create,
    BaseEventTool.buildGLBFileEvent(fileName, arrayBuffer),
  )
  |> WonderBsMost.Most.drain
  |> then_(() => uploadedWDBNodeId |> resolve);
};

let loadOneGLTFZip =
    (
      ~sandbox,
      /* ~arrayBuffer, */
      ~createJsZipFunc,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~fileName="GltfZip",
      (),
    ) => {
  /* let obj = HeaderTool.buildPublishFakeJsZipCreateFunc(sandbox^); */

  let uploadedWDBNodeId = MainEditorAssetIdTool.getNewAssetId();

  AssetHeaderFileLoadEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
    (uiState, dispatchFunc),
    createJsZipFunc,
    BaseEventTool.buildGLTFZipFileEvent(fileName),
  )
  |> WonderBsMost.Most.drain
  |> then_(() => uploadedWDBNodeId |> resolve);
};

let loadOneAssetBundleZip =
    (
      ~sandbox,
      ~createJsZipFunc,
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~fileName="AssetBundleZip",
      (),
    ) =>
  AssetHeaderFileLoadEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
    (uiState, dispatchFunc),
    createJsZipFunc,
    BaseEventTool.buildAssetBundleZipFileEvent(fileName),
  )
  |> WonderBsMost.Most.drain
  |> then_(() => () |> resolve);

let loadOneAssetBundle =
    (
      ~uiState=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~fileName="A.rab",
      ~assetBundle=Js.Typed_array.ArrayBuffer.make(10),
      (),
    ) => {
  let uploadedWDBNodeId = MainEditorAssetIdTool.getNewAssetId();

  AssetHeaderFileLoadEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
    (uiState, dispatchFunc),
    WonderBsJszip.Zip.create,
    BaseEventTool.buildAssetBundleFileEvent(fileName, assetBundle),
  )
  |> WonderBsMost.Most.drain
  |> then_(() => uploadedWDBNodeId |> resolve);
};