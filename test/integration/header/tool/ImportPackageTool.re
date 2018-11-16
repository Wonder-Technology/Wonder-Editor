open Js.Promise;

let testImportPackageWithoutExport =
    (
      ~testFunc,
      ~wpkArrayBuffer,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~fileName="Wpk",
      (),
    ) =>
  HeaderImportPackageEventHandler.MakeEventHandler.pushUndoStackWithNoCopyEngineState(
    (store, dispatchFunc),
    (_ => (), Obj.magic(-1)),
    BaseEventTool.buildPackageFileEvent(fileName, wpkArrayBuffer),
  )
  |> then_(_ => testFunc());

let testImportPackage =
    (
      ~testFunc,
      ~store=TestTool.buildEmptyAppState(),
      ~dispatchFunc=TestTool.getDispatch(),
      ~execBeforeImportFunc=wpkArrayBuffer => (),
      ~fileName="Wpk",
      (),
    ) => {
  let wpkArrayBuffer = ExportPackageTool.exportWPK();

  execBeforeImportFunc(wpkArrayBuffer);

  testImportPackageWithoutExport(
    ~testFunc,
    ~wpkArrayBuffer,
    ~store,
    ~dispatchFunc,
    ~fileName,
    (),
  );
};

let getImportedMaterialAssetResults = () =>
  MaterialNodeMapAssetEditorService.getResults
  |> StateLogicService.getEditorState;

let getFirstImportedMaterialAssetData = () => {
  let (materialNodeId, {materialComponent}: AssetNodeType.materialResultType) =
    getImportedMaterialAssetResults() |> ArrayService.unsafeGetFirst;

  (materialNodeId, materialComponent);
};

let getImporteMaterialAssetMaterialComponents = () =>
  MaterialNodeMapAssetEditorService.getValidValues
  |> StateLogicService.getEditorState
  |> Js.Array.map(({materialComponent}: AssetNodeType.materialResultType) =>
       materialComponent
     );

let getImporteMaterialAssetBasicMaterialComponents = () =>
  MaterialNodeMapAssetEditorService.getValidValues
  |> StateLogicService.getEditorState
  |> Js.Array.filter(({type_}: AssetNodeType.materialResultType) =>
       type_ === AssetMaterialDataType.BasicMaterial
     )
  |> Js.Array.map(({materialComponent}: AssetNodeType.materialResultType) =>
       materialComponent
     );

let getImporteMaterialAssetLightMaterialComponents = () =>
  MaterialNodeMapAssetEditorService.getValidValues
  |> StateLogicService.getEditorState
  |> Js.Array.filter(({type_}: AssetNodeType.materialResultType) =>
       type_ === AssetMaterialDataType.LightMaterial
     )
  |> Js.Array.map(({materialComponent}: AssetNodeType.materialResultType) =>
       materialComponent
     );

let getImportedTextureAssetTextureComponents = () =>
  TextureNodeMapAssetEditorService.getValidValues
  |> StateLogicService.getEditorState
  |> Js.Array.map(({textureComponent}: AssetNodeType.textureResultType) =>
       textureComponent
     );

let getImportedWDBAssetData = () =>
  StateEditorService.getState()
  |> WDBNodeMapAssetEditorService.getWDBNodeMap
  |> SparseMapService.getValidDataArr;

let getFirstImportedWDBAssetData = () =>
  getImportedWDBAssetData() |> ArrayService.unsafeGetFirst;

let disposeAssets = () => {
  HeaderImportPackageUtils._disposeAssets();

  JobEngineService.execDisposeJob |> StateLogicService.getAndSetEngineState;
};