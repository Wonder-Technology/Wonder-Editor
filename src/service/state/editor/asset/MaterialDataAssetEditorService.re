open EditorType;

open MaterialDataAssetType;

let getMaterialData = editorState =>
  editorState.assetRecord |> MaterialDataAssetService.getMaterialData;

let unsafeGetDefaultBasicMaterialData = editorState =>
  getMaterialData(editorState).defaultBasicMaterialData
  |> OptionService.unsafeGet;

let unsafeGetDefaultBasicMaterial = editorState => {
  let (material, _) = unsafeGetDefaultBasicMaterialData(editorState);

  material;
};

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

let unsafeGetDefaultMaterialDataByType = (type_, editorState) =>
  switch (type_) {
  | BasicMaterial => unsafeGetDefaultBasicMaterialData(editorState)
  | LightMaterial => unsafeGetDefaultLightMaterialData(editorState)
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