open Js.Promise;

let loadOneTexture =
    (
      ~dispatchFunc=TestTool.getDispatch(),
      ~imgName="loadImg.png",
      ~imgSrc="newImgBase64",
      (),
    ) => {
  let uploadedTextureNodeId = MainEditorAssetIdTool.getNewAssetId();

  AssetHeaderUtils.fileLoad(
    dispatchFunc,
    BaseEventTool.buildOneTextureFileEvent(~imgName, ~imgSrc, ()),
  )
  |> then_(() => uploadedTextureNodeId |> resolve);
};

let loadOneWDB =
    (~arrayBuffer, ~dispatchFunc=TestTool.getDispatch(), ~fileName="Wdb", ()) => {
  let uploadedWDBNodeId = MainEditorAssetIdTool.getNewAssetId();

  AssetHeaderUtils.fileLoad(
    dispatchFunc,
    BaseEventTool.buildWDBFileEvent(fileName, arrayBuffer),
  )
  |> then_(() => uploadedWDBNodeId |> resolve);
};