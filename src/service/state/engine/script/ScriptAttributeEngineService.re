open Wonderjs;

open StateDataMainType;

let createScriptAttribute = ScriptAttributeAPI.createScriptAttribute;

let addScriptAttributeField = ScriptAttributeAPI.addScriptAttributeField;

let removeScriptAttributeField = ScriptAttributeAPI.removeScriptAttributeField;

let getScriptAttributeEntries = ScriptAttributeAPI.getScriptAttributeEntries;

/* TODO move to engine */

/* let createScriptAttributeField = attributeFieldJsObj =>
   OperateScriptAttributeDataMainService._createScriptAttributeField(
     attributeFieldJsObj,
   ); */

let hasScriptAttributeField = (fieldName, attribute) =>
  attribute |> WonderCommonlib.ImmutableHashMapService.has(fieldName);

let replaceScriptAttributeField = (fieldName, attributeFieldJsObj, attribute) =>
  OperateScriptAttributeDataMainService.removeScriptAttributeField(
    fieldName,
    attribute,
  )
  |> OperateScriptAttributeDataMainService.addScriptAttributeField(
       fieldName,
       attributeFieldJsObj,
     );

let _unsafeGetScriptAttributeField =
    (fieldName, attribute): ScriptAttributeType.scriptAttributeField =>
  OperateScriptAttributeDataMainService.getScriptAttributeField(
    fieldName,
    attribute,
  )
  |> OptionService.unsafeGet;

let _addScriptAttributeField = (fieldName, attributeField, attribute) =>
  attribute
  |> WonderCommonlib.ImmutableHashMapService.set(fieldName, attributeField);

/* TODO rename Wonderjs->OperateScriptAttributeDataMainService->addScriptAttributeField to addScriptAttributeFieldJsObj */

let renameScriptAttributeField = (oldFieldName, newFieldName, attribute) => {
  let attributeField =
    _unsafeGetScriptAttributeField(oldFieldName, attribute);

  OperateScriptAttributeDataMainService.removeScriptAttributeField(
    oldFieldName,
    attribute,
  )
  |> _addScriptAttributeField(newFieldName, attributeField);
};

let unsafeGetScriptAttributeFieldType = (fieldName, attribute) =>
  _unsafeGetScriptAttributeField(fieldName, attribute).type_;

let unsafeGetScriptAttributeFieldDefaultValue = (fieldName, attribute) =>
  OperateScriptAttributeDataMainService.unsafeGetScriptAttributeFieldDefaultValue(
    fieldName,
    attribute,
  );