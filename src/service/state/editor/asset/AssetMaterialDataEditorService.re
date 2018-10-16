open EditorType;

open AssetMaterialDataType;

let getMaterialData = editorState =>
  editorState.assetRecord |> MaterialDataAssetService.getMaterialData;

let unsafeGetDefaultBasicMaterialData = editorState =>
  getMaterialData(editorState).defaultBasicMaterialData
  |> OptionService.unsafeGet;

let setDefaultBasicMaterialData = (material, editorState) => {
  ...editorState,
  assetRecord: {
    ...editorState.assetRecord,
    materialData: {
      ...getMaterialData(editorState),
      defaultBasicMaterialData: Some((material, BasicMaterial)),
    },
  },
};

let unsafeGetDefaultLightMaterialData = editorState =>
  getMaterialData(editorState).defaultLightMaterialData
  |> OptionService.unsafeGet;

let unsafeGetDefaultLightMaterial = editorState => {
  let (material, _) = unsafeGetDefaultLightMaterialData(editorState);

  material;
};

let setDefaultLightMaterialData = (material, editorState) => {
  ...editorState,
  assetRecord: {
    ...editorState.assetRecord,
    materialData: {
      ...getMaterialData(editorState),
      defaultLightMaterialData: Some((material, LightMaterial)),
    },
  },
};

let getAllDefaultMaterialData = editorState => [|
  unsafeGetDefaultBasicMaterialData(editorState),
  unsafeGetDefaultLightMaterialData(editorState),
|];