module CustomEventHandler = {
  include EmptyEventHandler.EmptyEventHandler;
  type prepareTuple = unit;
  type dataTuple = (NodeAssetType.nodeId, string, string);
  type return = unit;

  let _buildFunctionWithJsObjStr = jsObjStr => {j|
    (function() {
      return $jsObjStr
    }())
  |j};

  let _convertEventFunctionJsObjStrToData = jsObjStr =>
    jsObjStr
    |> _buildFunctionWithJsObjStr
    |> SerializeService.deserializeFunction
    |> ScriptEventFunctionEngineService.createScriptEventFunctionData;

  let handleSelfLogic =
      ((uiState, dispatchFunc), (), (nodeId, name, eventFunctionJsObjStr)) =>
    Console.tryCatch(
      () => {
        let newEventFunctionData =
          _convertEventFunctionJsObjStrToData(eventFunctionJsObjStr);

        ScriptEventFunctionNodeAssetEditorService.setNodeData(
          nodeId,
          ScriptEventFunctionNodeAssetService.buildNodeData(
            ~name,
            ~eventFunctionData=newEventFunctionData,
          ),
        )
        |> StateLogicService.getAndSetEditorState;

        ScriptEngineService.updateEventFunctionInAllScriptComponents(
          name,
          newEventFunctionData,
        )
        |> StateLogicService.getAndSetEngineState;
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
      },
    );
};

module MakeEventHandler = EventHandler.MakeEventHandler(CustomEventHandler);