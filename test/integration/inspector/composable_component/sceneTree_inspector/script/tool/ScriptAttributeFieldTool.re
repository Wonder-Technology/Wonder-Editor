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

let buildIntValue = value =>
  value |> Wonderjs.ScriptAttributeType.intToScriptAttributeValue;

let getScriptAttributeFieldCount = (script, attributeName, engineState) =>
  ScriptToolEngine.getScriptAttributeEntries(
    script,
    attributeName,
    engineState,
  )
  |> Js.Array.length;