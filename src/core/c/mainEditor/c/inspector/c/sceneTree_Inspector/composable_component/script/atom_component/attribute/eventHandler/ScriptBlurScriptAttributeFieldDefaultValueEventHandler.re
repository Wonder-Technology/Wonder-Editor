open MainEditorLightType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (
    Wonderjs.ScriptType.script,
    string,
    string,
    Wonderjs.ScriptAttributeType.scriptAttribute,
    Wonderjs.ScriptAttributeType.scriptAttributeValue,
  );
  type return = unit;

  let setUndoValueToCopiedEngineState =
      (
        (uiState, dispatchFunc),
        (),
        (script, attributeName, fieldName, attribute, defaultValue),
      ) =>
    StateEngineService.unsafeGetState()
    |> StateEngineService.deepCopyForRestore
    |> ScriptEngineService.setScriptAttributeFieldDefaultValueAndValue(
         script,
         attributeName,
         fieldName,
         defaultValue,
       );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);