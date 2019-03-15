open LanguageType;

open LanguageDataType;

let getLanguageType = language =>
  switch (language) {
  | "ZH" => ZH
  | "EN" => EN
  | _ => EN
  };

let _getLanguageDataByType = (languageDataArray, itemName, type_) => {
  let {language} =
    languageDataArray
    |> Js.Array.filter(({title}) => title === itemName)
    |> ArrayService.unsafeGetFirst;

  switch (type_) {
  | EN => language.en
  | ZH => language.zh
  };
};

let getHeaderLanguageDataByType = (itemName, type_) =>
  LanguageHeaderData.header_language_array
  ->(_getLanguageDataByType(itemName, type_));

let getControllerLanguageDataByType = (itemName, type_) =>
  LanguageControllerData.controller_language_array
  ->(_getLanguageDataByType(itemName, type_));

let getAssetLanguageDataByType = (itemName, type_) =>
  LanguageAssetData.asset_language_array
  ->(_getLanguageDataByType(itemName, type_));

let getSceneTreeLanguageDataByType = (itemName, type_) =>
  LanguageSceneTreeData.sceneTree_language_array
  ->(_getLanguageDataByType(itemName, type_));

let getInspectorLanguageDataByType = (itemName, type_) =>
  LanguageInspectorData.inspector_language_array
  ->(_getLanguageDataByType(itemName, type_));