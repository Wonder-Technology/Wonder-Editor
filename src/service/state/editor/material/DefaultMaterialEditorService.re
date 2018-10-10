open EditorType;

open MaterialType;

let unsafeGetDefaultBasicMaterialData = ({materialRecord}) =>
  materialRecord.defaultBasicMaterialData |> OptionService.unsafeGet;

let setDefaultBasicMaterialData = (material, editorState) => {
  ...editorState,
  materialRecord: {
    ...editorState.materialRecord,
    defaultBasicMaterialData: Some((material, BasicMaterial)),
  },
};

let unsafeGetDefaultLightMaterialData = ({materialRecord}) =>
  materialRecord.defaultLightMaterialData |> OptionService.unsafeGet;

let unsafeGetDefaultLightMaterial = editorState => {
  let (material, _) = unsafeGetDefaultLightMaterialData(editorState);

  material;
};

let setDefaultLightMaterialData = (material, editorState) => {
  ...editorState,
  materialRecord: {
    ...editorState.materialRecord,
    defaultLightMaterialData: Some((material, LightMaterial)),
  },
};

let getAllDefaultMaterialData = editorState => [|
  unsafeGetDefaultBasicMaterialData(editorState),
  unsafeGetDefaultLightMaterialData(editorState),
|];