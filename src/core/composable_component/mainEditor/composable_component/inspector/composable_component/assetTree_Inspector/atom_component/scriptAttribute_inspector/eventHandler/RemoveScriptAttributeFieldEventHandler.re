module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = Wonderjs.ScriptAttributeType.scriptAttribute => unit;
  type dataTuple = (NodeAssetType.nodeId, string);
  type return = unit;

  let handleSelfLogic =
      ((uiState, dispatchFunc), sendFunc, (nodeId, fieldName)) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let (attributeName, attribute) =
      ScriptAttributeNodeAssetEditorService.getNameAndAttribute(
        nodeId,
        editorState,
      );

    let newAttribute =
      ScriptAttributeEngineService.removeScriptAttributeField(
        fieldName,
        attribute,
      );

    let editorState =
      editorState
      |> ScriptAttributeInspectorUtils.updateScriptAttributeNode(
           nodeId,
           attributeName,
           newAttribute,
         );

    let engineState =
      ScriptEngineService.updateAttributeInAllScriptComponents(
        attributeName,
        newAttribute,
        engineState,
      );

    sendFunc(newAttribute);

    (editorState, engineState) |> StateLogicService.setState;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);