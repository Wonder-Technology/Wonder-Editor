open MainEditorLightType;

module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = (
    LanguageType.languageType,
    (NodeAssetType.nodeId, array(NodeAssetType.nodeId)) => unit,
  );
  type dataTuple = Wonderjs.ScriptType.script;
  type return = unit;

  let handleSelfLogic =
      ((uiState, dispatchFunc), (languageType, sendFunc), script) => {
    let editorState = StateEditorService.getState();
    let engineState = StateEngineService.unsafeGetState();

    let unUsedScriptAttributeNodes =
      MainEditorScriptAttributeUtils.getUnUsedScriptAttributeNodes(
        script,
        (editorState, engineState),
      );

    unUsedScriptAttributeNodes |> Js.Array.length > 0 ?
      {
        let unUsedScriptAttributeNodeIds =
          unUsedScriptAttributeNodes
          |> Js.Array.map(node => NodeAssetService.getNodeId(~node));

        let (lastScriptAttributeNodeIdForAdd, unUsedScriptAttributeNodeIds) =
          unUsedScriptAttributeNodeIds |> ArrayService.removeFirst;

        let (name, attribute) =
          ScriptAttributeNodeAssetEditorService.getNameAndAttribute(
            lastScriptAttributeNodeIdForAdd,
            editorState,
          );

        let engineState =
          ScriptEngineService.addScriptAttribute(
            script,
            name,
            attribute,
            engineState,
          );

        engineState |> StateEngineService.setState |> ignore;
        editorState |> StateEditorService.setState |> ignore;
        sendFunc(
          lastScriptAttributeNodeIdForAdd,
          unUsedScriptAttributeNodeIds,
        );
      } :
      ConsoleUtils.warn(
        LanguageUtils.getMessageLanguageDataByType(
          "need-add-scriptAttribute",
          languageType,
        ),
      )
      |> StateLogicService.getEditorState
      |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);