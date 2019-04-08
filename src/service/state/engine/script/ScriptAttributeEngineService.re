open Wonderjs;

open StateDataMainType;

let createScriptAttribute = ScriptAttributeAPI.createScriptAttribute;

let addScriptAttributeFieldJsObj = ScriptAttributeAPI.addScriptAttributeFieldJsObj;

let removeScriptAttributeField = ScriptAttributeAPI.removeScriptAttributeField;

let getScriptAttributeEntries = ScriptAttributeAPI.getScriptAttributeEntries;

let hasScriptAttributeField = (fieldName, attribute) =>
  attribute |> WonderCommonlib.ImmutableHashMapService.has(fieldName);

let replaceScriptAttributeField = (fieldName, attributeFieldJsObj, attribute) =>
  OperateScriptAttributeDataMainService.removeScriptAttributeField(
    fieldName,
    attribute,
  )
  |> OperateScriptAttributeDataMainService.addScriptAttributeFieldJsObj(
       fieldName,
       attributeFieldJsObj,
     );

let unsafeGetScriptAttributeField =
    (fieldName, attribute): ScriptAttributeType.scriptAttributeField =>
  OperateScriptAttributeDataMainService.getScriptAttributeField(
    fieldName,
    attribute,
  )
  |> OptionService.unsafeGet;

let _addScriptAttributeField = (fieldName, attributeField, attribute) =>
  attribute
  |> WonderCommonlib.ImmutableHashMapService.set(fieldName, attributeField);

let renameScriptAttributeField = (oldFieldName, newFieldName, attribute) => {
  let attributeField = unsafeGetScriptAttributeField(oldFieldName, attribute);

  OperateScriptAttributeDataMainService.removeScriptAttributeField(
    oldFieldName,
    attribute,
  )
  |> _addScriptAttributeField(newFieldName, attributeField);
};

let unsafeGetScriptAttributeFieldType = (fieldName, attribute) =>
  unsafeGetScriptAttributeField(fieldName, attribute).type_;

let unsafeGetScriptAttributeFieldDefaultValue = (fieldName, attribute) =>
  OperateScriptAttributeDataMainService.unsafeGetScriptAttributeFieldDefaultValue(
    fieldName,
    attribute,
  );