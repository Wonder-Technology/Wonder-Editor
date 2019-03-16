open EditorType;

let unsafeGetType = editorState =>
  editorState.languageType |> OptionService.unsafeGet;

let setType = (type_, editorState) => {
  ...editorState,
  languageType: Some(type_),
};