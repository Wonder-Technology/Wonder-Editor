open Sinon;

open NodeAssetType;

open Wonder_jest;

open Expect.Operators;

open Expect;

let prepareMaterialSphere = inspectorEngineState => {
  let (addedMaterialNodeId, newMaterialComponent) =
    MaterialInspectorCanvasTool.createNewMaterial();

  let (editorState, (inspectorEngineState, _)) =
    inspectorEngineState
    |> MaterialInspectorEngineUtils.createMaterialSphereIntoInspectorCanvas(
         MaterialDataAssetType.LightMaterial,
         newMaterialComponent,
         StateEditorService.getState(),
         StateEngineService.unsafeGetState(),
       );

  editorState |> StateEditorService.setState |> ignore;

  let materialSphereLightMaterial =
    inspectorEngineState
    |> InspectorEngineTool.getMaterialSphereLightMaterial(
         StateEditorService.getState(),
       );

  (
    inspectorEngineState,
    materialSphereLightMaterial,
    newMaterialComponent,
    addedMaterialNodeId,
  );
};

let prepareInspectorMaterialSphereAndImgCanvas =
    (~sandbox, ~inspectorCanvasWidth=300, ~inspectorCanvasHeight=300, ()) => {
  let (imgCanvasFakeBase64Str, (inspectorCanvasDom, imgCanvasDom)) =
    InspectorCanvasTool.prepareInspectorAndImgCanvas(
      ~sandbox,
      ~inspectorCanvasWidth,
      ~inspectorCanvasHeight,
      (),
    );

  let inspectorEngineState = StateInspectorEngineService.unsafeGetState();

  let (
    inspectorEngineState,
    materialSphereLightMaterial,
    newMaterialComponent,
    addedMaterialNodeId,
  ) =
    prepareMaterialSphere(inspectorEngineState);

  StateInspectorEngineService.setState(inspectorEngineState) |> ignore;

  (
    addedMaterialNodeId,
    newMaterialComponent,
    imgCanvasFakeBase64Str,
    (inspectorCanvasDom, imgCanvasDom),
  );
};

let changeShininess =
    (~material=GameObjectTool.getCurrentSceneTreeNodeMaterial(), ~value, ()) =>
  MainEditorLightMaterialForAsset.Method.changeShininess(material, value);

let changeColor = (material, color) =>
  MainEditorLightMaterialForAsset.Method.changeColor(material, color);

let closeColorPicker =
    (
      ~material,
      ~currentNodeId,
      ~color,
      ~dispatchFunc=_ => (),
      ~uiState=TestTool.buildEmptyAppState(),
      (),
    ) =>
  MainEditorLightMaterialForAsset.Method.closeColorPick(
    (uiState, dispatchFunc),
    (material, currentNodeId),
    color,
  );

let blurShininess =
    (
      ~dispatchFunc=_ => (),
      ~uiState=TestTool.buildEmptyAppState(),
      ~material=GameObjectTool.getCurrentSceneTreeNodeMaterial(),
      ~currentNodeId,
      ~value,
      (),
    ) =>
  MainEditorLightMaterialForAsset.Method.blurShininessEvent(
    (uiState, dispatchFunc),
    (material, currentNodeId),
    value,
  );

let dragAssetTextureToMap =
    (
      ~currentNodeId,
      ~textureNodeId,
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      ~material=GameObjectTool.getCurrentSceneTreeNodeMaterial(),
      (),
    ) =>
  MainEditorLightMaterialForAsset.Method.dragToSetLightMaterialTexture(
    (uiState, dispatchFunc),
    (material, currentNodeId),
    textureNodeId,
  );

let dragAssetTextureToMapNotCreateImgCanvasSnapshot =
    (
      ~textureNodeId,
      ~material,
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      (),
    ) =>
  MaterialDragTextureEventHandlerUtils.handleSelfLogic(
    (uiState, dispatchFunc),
    material,
    textureNodeId,
    LightMaterialDragTextureForAssetEventHandler.CustomEventHandler._handleSetMap,
  );

let removeTexture =
    (
      ~currentNodeId,
      ~material,
      ~dispatchFunc=TestTool.getDispatch(),
      ~uiState=TestTool.buildEmptyAppState(),
      (),
    ) =>
  LightMaterialRemoveTextureForAssetEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
    (uiState, dispatchFunc),
    currentNodeId,
    material,
  );

let judgeImgCanvasSnapshotIsStoreInImageDataMap =
    (addedMaterialNodeId, imgCanvasFakeBase64Str) => {
  let editorState = StateEditorService.getState();
  let {imageDataIndex} =
    editorState
    |> OperateTreeAssetEditorService.unsafeFindNodeById(addedMaterialNodeId)
    |> MaterialNodeAssetService.getNodeData;

  editorState
  |> ImageDataMapAssetEditorService.unsafeGetData(imageDataIndex)
  |> (
    ({base64}) =>
      base64 |> OptionService.unsafeGet |> expect == imgCanvasFakeBase64Str
  );
};