open Js.Promise;

let testImportPackage =
    (~testFunc, ~execBeforeImportFunc=wpkArrayBuffer => (), ()) => {
  let wpkArrayBuffer = ExportPackageTool.exportWPK();

  execBeforeImportFunc(wpkArrayBuffer);

  HeaderImportPackageUtils._import(wpkArrayBuffer |> Obj.magic)
  |> WonderBsMost.Most.drain
  |> then_(_ => testFunc());
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