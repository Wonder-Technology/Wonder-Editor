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

    let unUsedScriptEventFunctionNodes =
      MainEditorScriptEventFunctionUtils.getUnUsedScriptEventFunctionNodes(
        script,
        (editorState, engineState),
      );

    unUsedScriptEventFunctionNodes |> Js.Array.length > 0 ?
      {
        let unUsedScriptEventFunctionNodeIds =
          unUsedScriptEventFunctionNodes
          |> Js.Array.map(node => NodeAssetService.getNodeId(~node));

        let (
          lastScriptEventFunctionNodeIdForAdd,
          unUsedScriptEventFunctionNodeIds,
        ) =
          unUsedScriptEventFunctionNodeIds |> ArrayService.removeFirst;

        let (name, attribute) =
          ScriptEventFunctionNodeAssetEditorService.getNameAndData(
            lastScriptEventFunctionNodeIdForAdd,
            editorState,
          );

        let engineState =
          ScriptEngineService.addScriptEventFunctionData(
            script,
            name,
            attribute,
            engineState,
          );

        engineState |> StateEngineService.setState |> ignore;
        editorState |> StateEditorService.setState |> ignore;
        sendFunc(
          lastScriptEventFunctionNodeIdForAdd,
          unUsedScriptEventFunctionNodeIds,
        );
      } :
      ConsoleUtils.warn(
        LanguageUtils.getMessageLanguageDataByType(
          "need-add-scriptEventFunction",
          languageType,
        ),
      )
      |> StateLogicService.getEditorState
      |> ignore;
  };
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);