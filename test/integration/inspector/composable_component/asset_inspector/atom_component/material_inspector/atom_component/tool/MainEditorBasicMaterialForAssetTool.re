open Sinon;

open NodeAssetType;

open Wonder_jest;

open Expect.Operators;

open Expect;

let changeColor = (material, color) =>
  MainEditorBasicMaterialForAsset.Method.changeColor(material, color);

let closeColorPicker =
    (
      ~material,
      ~currentNodeId,
      ~color,
      ~dispatchFunc=_ => (),
      ~uiState=TestTool.buildEmptyAppState(),
      (),
    ) =>
  MainEditorBasicMaterialForAsset.Method.closeColorPick(
    (uiState, dispatchFunc),
    (material, currentNodeId),
    color,
  );

let judgeImgCanvasSnapshotIsStoreInImageDataMap =
    (addedMaterialNodeId, imgCanvasFakeBase64Str) => {
  let editorState = StateEditorService.getState();
  let {snapshotImageDataIndex} =
    editorState
    |> OperateTreeAssetEditorService.unsafeFindNodeById(addedMaterialNodeId)
    |> MaterialNodeAssetService.getNodeData;

  editorState
  |> BasicSourceTextureImageDataMapAssetEditorService.unsafeGetData(snapshotImageDataIndex)
  |> (
    ({base64}) =>
      base64 |> OptionService.unsafeGet |> expect == imgCanvasFakeBase64Str
  );
};