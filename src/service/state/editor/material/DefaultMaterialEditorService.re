open EditorType;

let unsafeGetDefaultBasicMaterial = ({materialRecord}) =>
  materialRecord.defaultBasicMaterial |> OptionService.unsafeGet;

let setDefaultBasicMaterial = (material, editorState) => {
  ...editorState,
  materialRecord: {
    ...editorState.materialRecord,
    defaultBasicMaterial: Some(material),
  },
};

let unsafeGetDefaultLightMaterial = ({materialRecord}) =>
  materialRecord.defaultLightMaterial |> OptionService.unsafeGet;

let setDefaultLightMaterial = (material, editorState) => {
  ...editorState,
  materialRecord: {
    ...editorState.materialRecord,
    defaultLightMaterial: Some(material),
  },
};