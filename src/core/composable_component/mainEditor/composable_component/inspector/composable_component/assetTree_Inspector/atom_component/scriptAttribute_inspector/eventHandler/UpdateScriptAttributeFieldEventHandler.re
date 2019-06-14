open Wonderjs;

open ScriptAttributeType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (NodeAssetType.nodeId, string, scriptAttributeFieldJsObj);
  type return = unit;

  let _isOnlyFieldDefaultValueChange =
      (
        (
          {type_, defaultValue}: Wonderjs.ScriptAttributeType.scriptAttributeField
        ) as oldAttributeField,
        newAttributeFieldJsObj,
      ) => {
    let newType =
      ScriptAttributeTypeService.getTypeFromJsObj(newAttributeFieldJsObj);

    let newDefaultValue = newAttributeFieldJsObj##defaultValue;

    type_
    |> ScriptAttributeTypeService.convertFieldTypeToJsObjStr === newType
    && defaultValue !== newDefaultValue;
  };

  let handleSelfLogic =
      (
        (uiState, dispatchFunc),
        (),
        (nodeId, fieldName, newAttributeFieldJsObj),
      ) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let (editorState, engineState) =
      Console.tryCatch(
        () => {
          let (attributeName, attribute) =
            ScriptAttributeNodeAssetEditorService.getNameAndAttribute(nodeId)
            |> StateLogicService.getEditorState;

          let isOnlyFieldDefaultValueChange =
            _isOnlyFieldDefaultValueChange(
              ScriptAttributeEngineService.unsafeGetScriptAttributeField(
                fieldName,
                attribute,
              ),
              newAttributeFieldJsObj,
            );

          let newAttribute =
            ScriptAttributeEngineService.replaceScriptAttributeField(
              fieldName,
              newAttributeFieldJsObj,
              attribute,
            );

          let editorState =
            ScriptAttributeInspectorUtils.updateScriptAttributeNode(
              nodeId,
              attributeName,
              newAttribute,
              editorState,
            );

          isOnlyFieldDefaultValueChange ?
            (editorState, engineState) :
            {
              let engineState =
                ScriptEngineService.updateAttributeInAllScriptComponents(
                  attributeName,
                  newAttribute,
                  engineState,
                );

              (editorState, engineState);
            };
        },
        e => {
          let message = e##message;

          ConsoleUtils.error(
            LogUtils.buildErrorMessage(
              ~description={j|$message|j},
              ~reason="",
              ~solution={j||j},
              ~params={j||j},
            ),
          )
          |> StateLogicService.getEditorState;

          (editorState, engineState);
        },
      );

    (editorState, engineState) |> StateLogicService.setState;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);