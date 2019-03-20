open LanguageType;

open LanguageDataType;

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

let getHeaderVersionUpgradeContentLanguageDataByType = (newVersion, type_) =>
  switch (type_) {
  | EN => {j|Upgrade to $newVersion Version, We are here to serve you~ Thanks for your trust~|j}
  | ZH => {j|升级到$newVersion版本，我们为您服务～感谢您的信任和支持～|j}
  };

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

let getMessageLanguageDataByType = (itemName, type_) =>
  LanguageMessageData.message_language_array
  ->(_getLanguageDataByType(itemName, type_));