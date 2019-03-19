open LanguageType;

open EditorType;

let unsafeGetType = editorState =>
  editorState.languageType |> OptionService.unsafeGet;

let setType = (type_, editorState) => {
  ...editorState,
  languageType: Some(type_),
};

let convertToType = language =>
  switch (language) {
  | "ZH" => ZH
  | "EN" => EN
  | _ => EN
  };