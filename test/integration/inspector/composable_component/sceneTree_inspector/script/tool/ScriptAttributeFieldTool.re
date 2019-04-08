let unsafeGetScriptAttributeFieldDefaultValue =
    (script, scriptAttributeName, fieldName, engineState) =>
  ScriptEngineService.unsafeGetScriptAttributeFieldDefaultValue(
    script,
    scriptAttributeName,
    fieldName,
    engineState,
  );

let getScriptAttributeFieldType =
    (script, scriptAttributeName, fieldName, engineState) =>
  ScriptEngineService.unsafeGetScriptAttribute(
    script,
    scriptAttributeName,
    engineState,
  )
  |> ScriptAttributeEngineService.unsafeGetScriptAttributeFieldType(fieldName);

let buildFloatValue = value =>
  value |> Wonderjs.ScriptAttributeType.floatToScriptAttributeValue;