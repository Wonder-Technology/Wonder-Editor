module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (
    LanguageType.languageType,
    Wonderjs.ScriptAttributeType.scriptAttribute => unit,
  );
  type dataTuple = (NodeAssetType.nodeId, string, string);
  type return = unit;

  let handleSelfLogic =
      (
        (uiState, dispatchFunc),
        (languageType, sendFunc),
        (nodeId, oldFieldName, newFieldName),
      ) =>
    oldFieldName === newFieldName ?
      () :
      {
        let (attributeName, attribute) =
          ScriptAttributeNodeAssetEditorService.getNameAndAttribute(nodeId)
          |> StateLogicService.getEditorState;

        ScriptAttributeEngineService.hasScriptAttributeField(
          newFieldName,
          attribute,
        ) ?
          {
            ConsoleUtils.warn(
              LanguageUtils.getMessageLanguageDataByType(
                "asset-rename-scriptAttribute-field",
                languageType,
              ),
            )
            |> StateLogicService.getEditorState;

            sendFunc(attribute);
          } :
          {
            let newAttribute =
              ScriptAttributeEngineService.renameScriptAttributeField(
                oldFieldName,
                newFieldName,
                attribute,
              );

            ScriptAttributeInspectorUtils.updateScriptAttributeNode(
              nodeId,
              attributeName,
              newAttribute,
            )
            |> StateLogicService.getAndSetEditorState;

            ScriptEngineService.updateAttributeInAllScriptComponents(
              attributeName,
              newAttribute,
            )
            |> StateLogicService.getAndSetEngineState;

            sendFunc(newAttribute);
          };
      };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);